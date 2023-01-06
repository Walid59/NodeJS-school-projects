import JSONResponseBuilder from './JSONResponseBuilder.js';

export default class thirdResponseBuilder extends JSONResponseBuilder {
    buildResponse(){
        super.buildResponse();
        const value = this._url.searchParams.get('value') || 'unknown';
        const color = this._url.searchParams.get('color') || 'unknown';
        const date = Date.now();
        this._response.write(`<p>{"value":"${value}","color":"${color}","date":"${date}"}</p>`);
    }
}
