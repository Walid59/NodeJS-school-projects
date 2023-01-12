import HTMLResponseBuilder from './HTMLResponseBuilder.js';

export default class firstResponseBuilder extends HTMLResponseBuilder {
    buildResponse(){
        super.buildResponse();
        const nameValue = this._url.searchParams.get('name') || 'unknown';
        this._response.write(`<p>Welcome to first page, <strong> ${nameValue}</strong></p>`);
        this._response.write('<link href="./public/style/style.css" rel="stylesheet" type="text/css"></link>');
        this._response.write('<img src="./public/img/timoleon_oceanie.jpg" alt="timoleon bien sur"></img>');
        super.finishResponse();
    }
}
