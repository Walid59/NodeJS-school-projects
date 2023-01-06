export default class ResponseBuilder{

    constructor(response) {
        this._response = response;
        this._url = new URL(request.url, `http://${request.headers.host}`);
    }
    
    buildResponse(){
        this._response.statusCode = 200;
        this._response.setHeader( 'Content-Type' , 'text/html');
    }
} 