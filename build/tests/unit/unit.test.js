"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
describe('Testes Unitários do Controller', function () {
    describe('Método Create', function () {
        it('Deve criar um novo usuário', function () {
            var novoUsuario = {
                //id: 1,
                name: 'Novo Usuário',
                email: 'novo@email.com',
                password: '123456'
            };
            var user = new service_1.default();
            return user.create(novoUsuario)
                .then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys(['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']);
            });
        });
    });
    describe('Método Update', function () {
        it('Deve atualizar um usuário', function () {
            var usuarioAtualizado = {
                name: 'Nome Atualizado',
                email: 'atualizado@email.com'
            };
            var user = new service_1.default();
            return user.update(1, usuarioAtualizado).then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Método Get Users', function () {
        it('Deve retornar uma lista de todos os usuários', function () {
            var user = new service_1.default();
            return user.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
                helpers_1.expect(data[0]).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método GetById', function () {
        it('Retornar um usuário pelo id', function () {
            var user = new service_1.default();
            return user.getById(1).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método GetByEmail', function () {
        var email = 'novo@email.com';
        it('Retornar um usuário pelo email', function () {
            var user = new service_1.default();
            return user.getByEmail(email).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método Delete', function () {
        it('Deve excluir um usuário', function () {
            var user = new service_1.default();
            return user.destroy(1).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
