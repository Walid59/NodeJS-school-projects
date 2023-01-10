import JSONResponseBuilder from './JSONResponseBuilder.js';

export default class RandomResponseBuilder extends JSONResponseBuilder {

    getRandomIntInclusive(min, max) { //from developer.mozilla.org
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    buildResponse(){
        super.buildResponse();
        const value = this.getRandomIntInclusive(0,100);
        this._response.write(JSON.stringify({ randomValue: value}))
    }
}