import { URL } from 'url';

import firstResponseBuilder from '../builder/HTMLResponseBuilder/firstResponseBuilder.js';
import HTMLResponseBuilder from '../builder/HTMLResponseBuilder/HTMLResponseBuilder.js';
import notFoundResponseBuilder from '../builder/HTMLResponseBuilder/notFoundResponse.js';
import secondResponseBuilder from '../builder/HTMLResponseBuilder/secondResponseBuilder.js';
import RandomResponseBuilder from '../builder/JSONResponseBuilder/randomResponseBuilder.js';
import thirdResponseBuilder from '../builder/JSONResponseBuilder/thirdResponseBuilder.js';

export default class RequestController {

    #request;
    #response;
    #url;

    constructor(request, response) {
        this.#request = request,
        this.#response = response;
        this.#url = new URL(request.url, `http://${request.headers.host}`);
    }

    get response() {
        return this.#response;
    }


    buildResponse()  {
        if (this.#url.pathname == '/') {
            let builder = new HTMLResponseBuilder(this.#request,this.#response);
            builder.buildResponse();
            this.#response.write(`<p><strong>no path defined</strong></p>`);
        }
        else if (this.#url.pathname.startsWith('/first') ){
            let builder = new firstResponseBuilder(this.#request,this.#response);
            builder.buildResponse();
        }

        else if (this.#url.pathname.startsWith('/second') ){
            let builder = new secondResponseBuilder(this.#request,this.#response);
            builder.buildResponse();
        }

        else if (this.#url.pathname.startsWith('/json') ){
            let builder = new thirdResponseBuilder(this.#request,this.#response);
            builder.buildResponse();
        }

        else if (this.#url.pathname.startsWith('/random') ){
            let builder = new RandomResponseBuilder(this.#request,this.#response);
            builder.buildResponse();
        }

        else {
            let builder = new notFoundResponseBuilder(this.#request,this.#response);
            builder.buildResponse();        
        }

        this.response.end();
    }

}