export default class ResponseBuilder{

    constructor(request,response) {
        this._request = request;
        this._response = response;
        this._url = new URL(request.url, `http://${request.headers.host}`);
    }
    
    buildResponse(){
        this._response.statusCode = 200;
    }
} 