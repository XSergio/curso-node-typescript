import { app, request, expect } from './config/helpers';
import * as HTTPStatus from 'http-status';

describe('Teste de Integração', () => {

    'user strict' //Quando compilado execute no modo estrito pois vamos usar variáveis let, const

    const config = require('../../server/config/env/config')();
    const model = require('../../server/models');

    let id;

    const userTest = {
        id: 100,
        name: 'Usuário de Teste',
        email: 'teste@email.com',
        password: '123456'
    };

    const userDefault = {
        id: 1,
        name: 'Usuário Default',
        email: 'default@email.com',
        password: '123456'
    };

    beforeEach((done) => {
        model.User.destroy({
            where: {}
        })
        .then(() => {
            return model.User.create(userDefault);
        })
        .then(user => {
            model.User.create(userTest)
                .then(() => {
                    done();
                })
        })
    });

    describe('GET /api/users/all', () => {
        it('Deve retornar um array com todos os usuários', done => {
            request(app)
                .get('/api/users/all')
                .end((error, res)=> {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                    expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                    done(error);
                });
        });
    });

    describe('GET /api/users/:id', () => {
        it('Deve retornar um array com um usuário', done => {
            request(app)
                .get(`/api/users/${userDefault.id}`)
                .end((error, res)=> {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.name).to.be.equal(userDefault.name);
                    expect(res.body.payload).to.have.all.keys([
                        'id', 'name', 'email', 'password'
                    ])
                    id = res.body.payload.id;
                    done(error);
            });
        });
    });
    describe('POST /api/users/create', () => {
        it('Deve criar um novo usuário', done => {
            const user = {
                id: 2,
                name: 'Teste 2',
                email: 'teste2@email.com',
                password: 'teste2'
            }
            request(app)
                .post('/api/users/create')
                .send(user)
                .end((error, res)=> {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.be.equal(user.id);
                    expect(res.body.payload.name).to.be.equal(user.name);
                    expect(res.body.payload.email).to.be.equal(user.email);
                    expect(res.body.payload.password).to.be.equal(user.password);
                    done(error);
            });
        });
    });
    describe('PUT /api/users/:id/update', () => {
        it('Deve atualizar um usuário', done => {
            const user = {
                id: id,
                name: 'TesteUpdate',
                email: 'default@email.com',
                password: 'default'
            }
            request(app)
                .put(`/api/users/${id}/update`)
                .send(user)
                .end((error, res)=> {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.be.equal(id);
                    expect(res.body.payload.name).to.be.equal(user.name);
                    expect(res.body.payload.email).to.be.equal(user.email);
                    done(error);
            });
        });
    });
    describe('DELETE /api/users/:id/destroy', () => {
        it('Deve excluir um usuário', done => {
            request(app)
                .delete(`/api/users/${userTest.id}/destroy`)
                .end((error, res)=> {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.be.equal(userTest.id);
                    done(error);
            });
        });
    });
});