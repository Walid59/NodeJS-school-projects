import ResponseBuilder from '../responseBuilder.js';

export default class HTMLResponseBuilder extends ResponseBuilder{
    buildResponse(){
        super.buildResponse();
        let ret = false;
        this._response.setHeader( 'Content-Type' , 'text/html');
    }

    finishResponse(){
        const date = new Date();
        this._response.write(`<footer>${date}</footer>`);
    }
}