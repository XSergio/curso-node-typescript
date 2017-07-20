import { app, request, expect } from './config/helpers';

describe('Teste de Integração', () => {
    describe('GET /', () => {
        it('Deve retornar a mensagem Teste', done => {
            request(app)
                .get('/')
                .end((error, res)=> {
                    expect(res.status).to.equal(200);
                    expect(res.text).to.be.eql('Teste');
                    done(error);
                });
        });
    });

    describe('GET /api/users/all', () => {
        it('Deve retornar um json com todos os usuários', done => {
            request(app)
                .get('/api/users/all')
                .end((error, res)=> {
                    expect(res.status).to.equal(200);
                });
        });
    });
    describe('GET /api/users/:id', () => {
        it('Deve retornar um json com um usuário', done => {
            request(app)
                .get(`/api/users/${1}`)
                .end((error, res)=> {
                    expect(res.status).to.equal(200);
            });
        });
    });
    describe('POST /api/users/new', () => {
        it('Deve criar um novo usuário', done => {
            const user = {
                nome: 'Teste'
            }
            request(app)
                .post('/api/users/new')
                .send(user)
                .end((error, res)=> {
                    expect(res.status).to.equal(200);
            });
        });
    });
    describe('PUT /api/users/:id/edit', () => {
        it('Deve atualizar um usuário', done => {
            const user = {
                nome: 'TesteUpdate'
            }
            request(app)
                .put(`/api/users/${1}/edit`)
                .send(user)
                .end((error, res)=> {
                    expect(res.status).to.equal(200);
            });
        });
    });
    describe('DELETE /api/users/:id/delete', () => {
        it('Deve excluir um usuário', done => {
            request(app)
                .delete(`/api/users/${1}`)
                .end((error, res)=> {
                    expect(res.status).to.equal(200);
            });
        });
    });
});