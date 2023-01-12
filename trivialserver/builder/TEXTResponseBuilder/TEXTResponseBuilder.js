import ResponseBuilder from '../responseBuilder.js';

export default class TEXTResponseBuilder extends ResponseBuilder{
    buildResponse(){
        super.buildResponse();
        this._response.setHeader( 'Content-Type' , 'text/plain');
    }

}