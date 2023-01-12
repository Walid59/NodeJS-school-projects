import HTMLResponseBuilder from './HTMLResponseBuilder.js';

export default class secondResponseBuilder extends HTMLResponseBuilder {
    buildResponse(){
        super.buildResponse();
        const nameValue = this._url.searchParams.get('name') || 'unknown';
        this._response.write(`<p>Welcome to second page, <strong>${nameValue}</strong></p>`);
        this._response.write('<link href="./public/style/style.css" rel="stylesheet" type="text/css"></link>'); //"faute de frappe" volontaire pour forcer une erreur 404
        this._response.write('<img src="./public/img/timoleon_oceanie.jp" alt="timoleon bien sur"></img>');
        super.finishResponse();
    }
}
