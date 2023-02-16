import * as fs from 'fs/promises';
import { URL } from 'url';
import { getContentTypeFrom } from '../scripts/contentTypeUtil.js';
const BASE = 'http://localhost/';

/**
*  define a controller to retrieve static resources
*/
export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, BASE).pathname;   // on ne considère que le "pathname" de l'URL de la requête
  }

  get response() {
    return this.#response;
  }
  get request() {
    return this.#request;
  }
  get url() {
    return this.#url;
  }

  async handleRequest() {


    if (this.url == "/") {
      await this.buildResponse('./public/index.html');
    }
    else if (this.url == '/pfc') {
      await this.buildResponse('./public/pfc.html');
    } else if (this.url == '/about') {
      await this.buildResponse('./public/about.html');
    } else {
      await this.buildResponse(`./public${this.url}`);
    }
    this.response.end();
  }


  async buildResponse(param) {
    try {
      // check if resource is available
      await fs.access(param);
      // read the requested resource content
      const data = await fs.readFile(param);
      // send resource content
      this.response.setHeader("Content-Type", getContentTypeFrom(this.url));
      this.response.statusCode = 200;
      this.response.write(data);
    }
    catch (err) { // resource is not available 
      this.response.statusCode = 404;
      this.response.write('erreur');
    }
  }

}

