"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
function dbErrorHandler(res, err) {
    console.log("Error: " + err);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        code: 'ERR-01',
        message: 'Erro genérico da aplicação. Contacte administrador.'
    });
}
exports.dbErrorHandler = dbErrorHandler;
