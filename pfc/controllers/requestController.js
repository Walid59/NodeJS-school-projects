import * as fs from 'fs/promises';
import { URL } from 'url';
import { getContentTypeFrom }  from '../scripts/contentTypeUtil.js';
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
    this.#url = new URL(this.request.url,BASE).pathname;   // on ne considère que le "pathname" de l'URL de la requête
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
    this.response.setHeader("Content-Type" , getContentTypeFrom(this.url) );
    await this.buildResponse();
    this.response.end();
  }


  async buildResponse()  {
    //this.response.write('<h1>Pierre, Feuilles, Ciseaux!</h1>');
    //this.response.write('<ul> <li> <a href="http://localhost:8080/pfc"> Acces au jeu! </a> </li> <li> <a href="http://localhost:8080/about"> Numero de version et les auteurs du jeu... </li> </a> </ul>');

    try {
        // check if resource is available
        await fs.access(`.${this.url}`);
        // read the requested resource content
        const data = await fs.readFile(`.${this.url}`);
        // send resource content
        this.response.statusCode = 200;
        this.response.write(data);
      }
      catch(err) { // resource is not available 
        this.response.statusCode = 404;
        this.response.write('erreur');
    }
  }


}

