import ResponseBuilder from '../responseBuilder.js';

export default class JSONResponseBuilder extends ResponseBuilder{
    buildResponse(){
        super.buildResponse();
        this._response.setHeader( 'Content-Type' , 'application/json');

    }

}