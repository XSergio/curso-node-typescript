import * as jwt from 'jwt-simple';
import { app, request, expect } from './config/helpers';
import * as HTTPStatus from 'http-status';

describe('Teste de Integração', () => {

    'user strict' //Quando compilado execute no modo estrito pois vamos usar variáveis let, const

    const config = require('../../server/config/env/config')();
    const model = require('../../server/models');

    let id;
    let token;

    const userTest = {
        id: 100,
        name: 'Usuário de Teste',
        email: 'teste@email.com',
        password: '123456'
    };

    const userDefault = {
        id: 1,
        name: 'Sergio',
        email: 'sergio@email.com',
        password: '123'
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
                    token = jwt.encode({id: user.id}, config.secret);
                    done();
                })
        })
    });

    describe('POST /token', () => {
        it('Deve receber um JWT', done => {
            const credentials = {
                email: userDefault.email,
                password: userDefault.password
            };
            request(app)
                .post('/token')
                .send(credentials)
                .end((error, res)=> {
                    expect(res.status).to.be.equal(HTTPStatus.OK);
                    expect(res.body.token).to.be.equal(`${token}`);
                    done(error);
                })
        });
        
        it('Não deve gerar Token', done => {
                const credentials = {
                    email: 'emailqualquer@email.com',
                    password: 'nãoexiste'
                };
                request(app)
                    .post('/token')
                    .send(credentials)
                    .end((error, res) => {
                        expect(res.status).to.be.equal(HTTPStatus.UNAUTHORIZED);
                        expect(res.body).to.be.empty;
                        done(error);
                    })
        });
    });

    describe('GET /api/users/all', () => {
        it('Deve retornar um array com todos os usuários', done => {
            request(app)
                .get('/api/users/all')
                .set('Content-Type','application/json')
                .set('Authorization', `JWT ${token}`)
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
                .set('Content-Type','application/json')
                .set('Authorization', `JWT ${token}`)
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
                .set('Content-Type','application/json')
                .set('Authorization', `JWT ${token}`)
                .send(user)
                .end((error, res)=> {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.be.equal(user.id);
                    expect(res.body.payload.name).to.be.equal(user.name);
                    expect(res.body.payload.email).to.be.equal(user.email);
                    done(error);
            });
        });
    });
    describe('PUT /api/users/:id/update', () => {
        it('Deve atualizar um usuário', done => {
            const user = {
                name: 'TesteUpdate',
                email: 'default@email.com',
                password: '123456'
            }
            request(app)
                .put(`/api/users/${id}/update`)
                .set('Content-Type','application/json')
                .set('Authorization', `JWT ${token}`)
                .send(user)
                .end((error, res)=> {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload[0]).to.be.equal(1);
                    done(error);
            });
        });
    });
    describe('DELETE /api/users/:id/destroy', () => {
        it('Deve excluir um usuário', done => {
            request(app)
                .delete(`/api/users/${userTest.id}/destroy`)
                .set('Content-Type','application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res)=> {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.equal(1);
                    done(error);
            });
        });
    });
});