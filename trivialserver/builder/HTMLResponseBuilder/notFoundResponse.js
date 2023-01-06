import HTMLResponseBuilder from './HTMLResponseBuilder.js';

export default class notFoundResponse extends HTMLResponseBuilder {
    buildResponse(){
        super.buildResponse();
        this._response.write(`<p><strong>wrong path...</strong></p>`);
    }
}
