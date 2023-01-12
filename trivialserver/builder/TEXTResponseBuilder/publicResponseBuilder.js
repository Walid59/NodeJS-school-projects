import TEXTResponseBuilder from './TEXTResponseBuilder.js';
import { accessSync, readFileSync } from 'fs';

export default class PublicResponseBuilder extends TEXTResponseBuilder{

    
    buildResponse(){
        super.buildResponse();
        const path =  "."+this._url.pathname;
        try{        
            accessSync(path);
            this._response.write(readFileSync(path));
        }catch(err){
            console.error("file not found, path : ",path);
            this._response.statusCode = 404;
        }
    }
}
