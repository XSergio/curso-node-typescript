"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var HTTPStatus = require("http-status");
describe('Teste de Integração', function () {
    'user strict'; //Quando compilado execute no modo estrito pois vamos usar variáveis let, const
    var config = require('../../server/config/env/config')();
    var model = require('../../server/models');
    var id;
    var userTest = {
        id: 100,
        name: 'Usuário de Teste',
        email: 'teste@email.com',
        password: '123456'
    };
    var userDefault = {
        id: 1,
        name: 'Usuário Default',
        email: 'default@email.com',
        password: '123456'
    };
    beforeEach(function (done) {
        model.User.destroy({
            where: {}
        })
            .then(function () {
            return model.User.create(userDefault);
        })
            .then(function (user) {
            model.User.create(userTest)
                .then(function () {
                done();
            });
        });
    });
    describe('GET /api/users/all', function () {
        it('Deve retornar um array com todos os usuários', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                helpers_1.expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', function () {
        it('Deve retornar um array com um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + userDefault.id)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.name).to.be.equal(userDefault.name);
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'id', 'name', 'email', 'password'
                ]);
                id = res.body.payload.id;
                done(error);
            });
        });
    });
    describe('POST /api/users/create', function () {
        it('Deve criar um novo usuário', function (done) {
            var user = {
                id: 2,
                name: 'Teste 2',
                email: 'teste2@email.com',
                password: 'teste2'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.be.equal(user.id);
                helpers_1.expect(res.body.payload.name).to.be.equal(user.name);
                helpers_1.expect(res.body.payload.email).to.be.equal(user.email);
                helpers_1.expect(res.body.payload.password).to.be.equal(user.password);
                done(error);
            });
        });
    });
    describe('PUT /api/users/:id/update', function () {
        it('Deve atualizar um usuário', function (done) {
            var user = {
                id: id,
                name: 'TesteUpdate',
                email: 'default@email.com',
                password: 'default'
            };
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + id + "/update")
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.be.equal(id);
                helpers_1.expect(res.body.payload.name).to.be.equal(user.name);
                helpers_1.expect(res.body.payload.email).to.be.equal(user.email);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id/destroy', function () {
        it('Deve excluir um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/users/" + userTest.id + "/destroy")
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.be.equal(userTest.id);
                done(error);
            });
        });
    });
});
