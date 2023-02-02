/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("socket.io");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "?df2f":
/*!*****************************!*\
  !*** fs/promises (ignored) ***!
  \*****************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://pfc/fs/promises_(ignored)?");

/***/ }),

/***/ "?82ea":
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://pfc/http_(ignored)?");

/***/ }),

/***/ "./controllers/ioController.js":
/*!*************************************!*\
  !*** ./controllers/ioController.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ IOController)\n/* harmony export */ });\n// fichier ./controllers/ioController.js (serveur)\r\nclass IOController {\r\n    #io;\r\n    #intervalID;\r\n    static #clients = new Map();\r\n\r\n    constructor(io) {\r\n        this.#io = io;\r\n    }\r\n\r\n    registerSocket(socket) {\r\n        console.log(`new connection with id ${socket.id}`);\r\n        this.setupListeners(socket);\r\n        this.setupInterval(socket);\r\n    }\r\n\r\n    setupListeners(socket) {\r\n        socket.on( 'disconnect' , () => this.leave(socket) );\r\n    }\r\n\r\n    leave(socket) {\r\n        console.log(`disconnection from ${socket.id}`);\r\n        clearInterval(IOController.#clients.delete(socket));\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://pfc/./controllers/ioController.js?");

/***/ }),

/***/ "./controllers/requestController.js":
/*!******************************************!*\
  !*** ./controllers/requestController.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RequestController)\n/* harmony export */ });\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs/promises */ \"?df2f\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var _scripts_contentTypeUtil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scripts/contentTypeUtil.js */ \"./scripts/contentTypeUtil.js\");\n\r\n\r\n\r\nconst BASE = 'http://localhost/';\r\n\r\n/**\r\n*  define a controller to retrieve static resources\r\n*/\r\nclass RequestController {\r\n\r\n  #request;\r\n  #response;\r\n  #url;\r\n\r\n  constructor(request, response) {\r\n    this.#request = request,\r\n    this.#response = response;\r\n    this.#url = new url__WEBPACK_IMPORTED_MODULE_1__.URL(this.request.url,BASE).pathname;   // on ne considère que le \"pathname\" de l'URL de la requête\r\n  }\r\n\r\n  get response() {\r\n    return this.#response;\r\n  }\r\n  get request() {\r\n    return this.#request;\r\n  }\r\n  get url() {\r\n    return this.#url;\r\n  }\r\n\r\n  async handleRequest() {\r\n    this.response.setHeader(\"Content-Type\" , (0,_scripts_contentTypeUtil_js__WEBPACK_IMPORTED_MODULE_2__.getContentTypeFrom)(this.url) );\r\n    await this.buildResponse();\r\n    this.response.end();\r\n  }\r\n\r\n\r\n  async buildResponse()  {\r\n    //this.response.write('<h1>Pierre, Feuilles, Ciseaux!</h1>');\r\n    //this.response.write('<ul> <li> <a href=\"http://localhost:8080/pfc\"> Acces au jeu! </a> </li> <li> <a href=\"http://localhost:8080/about\"> Numero de version et les auteurs du jeu... </li> </a> </ul>');\r\n\r\n    try {\r\n        // check if resource is available\r\n        await fs_promises__WEBPACK_IMPORTED_MODULE_0__.access(`.${this.url}`);\r\n        // read the requested resource content\r\n        const data = await fs_promises__WEBPACK_IMPORTED_MODULE_0__.readFile(`.${this.url}`);\r\n        // send resource content\r\n        this.response.statusCode = 200;\r\n        this.response.write(data);\r\n      }\r\n      catch(err) { // resource is not available \r\n        this.response.statusCode = 404;\r\n        this.response.write('erreur');\r\n    }\r\n  }\r\n\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack://pfc/./controllers/requestController.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"?82ea\");\n/* harmony import */ var _controllers_requestController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/requestController.js */ \"./controllers/requestController.js\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var _controllers_ioController_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controllers/ioController.js */ \"./controllers/ioController.js\");\n// fichier main.js\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst server = http__WEBPACK_IMPORTED_MODULE_0__.createServer(\r\n\t(request, response) => new _controllers_requestController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](request, response).handleRequest()\r\n);\r\n\r\n \r\nconst io = new socket_io__WEBPACK_IMPORTED_MODULE_2__.Server(server);\r\nconst ioController = new _controllers_ioController_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](io);\r\n  \r\nserver.listen(8080);\n\n//# sourceURL=webpack://pfc/./main.js?");

/***/ }),

/***/ "./scripts/contentTypeUtil.js":
/*!************************************!*\
  !*** ./scripts/contentTypeUtil.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getContentTypeFrom\": () => (/* binding */ getContentTypeFrom)\n/* harmony export */ });\n/**\r\n  return a content-type deduced from <path> final extension\r\n  @param path the path where to look for final extension\r\n*/\r\nconst getContentTypeFrom = path => {\r\n  const lastPointPosition = path.lastIndexOf('.');\r\n  const extension = path.substring(lastPointPosition);\r\n  return  contentTypes.get(extension) || '';\r\n}\r\n\r\n// the map that associates extenstion to content-type\r\nconst contentTypes = new Map().set('.css', 'text/css')\r\n                              .set('.html', 'text/html')\r\n                              .set('.jpg',\"image/jpeg\")\r\n                              .set('.jpeg',\"image/jpeg\")\r\n                              .set('.txt',\"plain/text\")\r\n                              .set('.png',\"image/png\")\r\n                              .set('.js', 'application/javascript')\r\n                              .set('.json', 'application/json');\r\n\n\n//# sourceURL=webpack://pfc/./scripts/contentTypeUtil.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;