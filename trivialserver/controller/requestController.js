import { URL } from 'url';

import firstResponseBuilder from '../builder/HTMLResponseBuilder/firstResponseBuilder.js';
import HTMLResponseBuilder from '../builder/HTMLResponseBuilder/HTMLResponseBuilder.js';
import notFoundResponseBuilder from '../builder/HTMLResponseBuilder/notFoundResponse.js';
import secondResponseBuilder from '../builder/HTMLResponseBuilder/secondResponseBuilder.js';
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
            builder = new HTMLResponseBuilder(this.#response);
            builder.buildResponse();
        }
        else if (this.#url.pathname.startsWith('/first') ){
            builder = new firstResponseBuilder(this.#response);
            builder.buildResponse();
        }

        else if (this.#url.pathname.startsWith('/second') ){
            builder = new secondResponseBuilder(this.#response);
            builder.buildResponse();
        }

        else if (this.#url.pathname.startsWith('/json') ){
            builder = new thirdResponseBuilder(this.#response);
            builder.buildResponse();
        }

        else {
            builder = new notFoundResponseBuilder(this.#response);
            builder.buildResponse();        
        }

        this.response.end();
    }

}