import HTMLResponseBuilder from './HTMLResponseBuilder.js';

export default class firstResponseBuilder extends HTMLResponseBuilder {
    buildResponse(){
        super.buildResponse();
        const nameValue = this._url.searchParams.get('name') || 'unknown';
        this._response.write(`<p>Welcome to first page, <strong> ${nameValue}</strong></p>`);
    }
}
