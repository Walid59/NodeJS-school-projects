import HTMLResponseBuilder from './HTMLResponseBuilder.js';

export default class notFoundResponse extends HTMLResponseBuilder {
    buildResponse(){
        super.buildResponse();
        this._response.statusCode = 404;
        const path = this._request.url;
        this._response.write(`<p>404 : path <strong> ${path}</strong> not found</p>`);
    }
}
