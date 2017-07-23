"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
describe('Testes Unitários do Controller', function () {
    describe('Método Create', function () {
        it('Deve criar um novo usuário', function () {
            var novoUsuario = {
                id: 1,
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
    /*
    describe('Método Update', () => {
        it('Deve atualizar um usuário', () => {
 
        });
    });
 
     describe('Método Get Users', () => {
         it('Deve retornar uma lista de todos os usuários', () => {
 
         });
    });
 
     describe('Método Delete', () => {
        it('Deve excluir um usuário', () => {
 
        });
    });
    */
});
