import ResponseBuilder from '../responseBuilder.js';

export default class firstResponseBuilder extends ResponseBuilder{
    buildResponse(){
        super.buildResponse();
        this._response.setHeader( 'Content-Type' , 'text/html');
    }
}