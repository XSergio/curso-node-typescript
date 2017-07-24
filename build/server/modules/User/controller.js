"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var service_1 = require("./service");
var sucessHandler_1 = require("../../api/responses/sucessHandler");
var errorHandler_1 = require("../../api/responses/errorHandler");
var dbErrorHandler_1 = require("../../config/dbErrorHandler");
var UserController = (function () {
    function UserController() {
        this.UserService = new service_1.default();
    }
    UserController.prototype.getAll = function (req, res) {
        this.UserService
            .getAll()
            .then(_.partial(sucessHandler_1.onSucess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao carregar todos os usuários'));
    };
    UserController.prototype.createUser = function (req, res) {
        this.UserService
            .create(req.body)
            .then(_.partial(sucessHandler_1.onSucess, res))
            .catch(_.partial(dbErrorHandler_1.dbErrorHandler, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao criar novo usuário'));
    };
    UserController.prototype.getById = function (req, res) {
        var userId = parseInt(req.params.id);
        this.UserService.getById(userId)
            .then(_.partial(sucessHandler_1.onSucess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro ao carregar o usuário'));
    };
    UserController.prototype.getByEmail = function (req, res) {
        var userEmail = req.body.email;
        this.UserService.getByEmail(userEmail)
            .then(_.partial(sucessHandler_1.onSucess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Error ao carregar o usuário'));
    };
    UserController.prototype.updateUser = function (req, res) {
        var userId = parseInt(req.params.id);
        this.UserService.update(userId, req.body)
            .then(_.partial(sucessHandler_1.onSucess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Falha ao atualizar usuário'));
    };
    UserController.prototype.destroyUser = function (req, res) {
        var userId = parseInt(req.params.id);
        this.UserService.destroy(userId)
            .then(_.partial(sucessHandler_1.onSucess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Falha ao excluir usuário'));
    };
    return UserController;
}());
;
exports.default = UserController;
