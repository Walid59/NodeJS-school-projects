import ResponseBuilder from '../responseBuilder.js';

export default class firstResponseBuilder extends ResponseBuilder{
    constructor(){
    }
    buildResponse(){
        super.buildResponse();
        this._response.statusCode = 200;
        this._response.setHeader( 'Content-Type' , 'text/html');
    }
}