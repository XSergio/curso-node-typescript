import { testDouble, expect } from './config/helpers';
import User from '../../server/modules/User/service';


describe('Testes Unitários do Controller', () => {
    describe('Método Create', () => {
       it('Deve criar um novo usuário', () => {
            const novoUsuario = {
                //id: 1,
                name: 'Novo Usuário',
                email: 'novo@email.com',
                password: '123456'
            };

            const user = new User();
            return user.create(novoUsuario)
                    .then(data => {
                        expect(data.dataValues).to.have.all.keys(
                            ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
                        )
                    })
       });
   });

   describe('Método Update', () => {
       it('Deve atualizar um usuário', () => {
            const usuarioAtualizado = {
               name: 'Nome Atualizado',
               email: 'atualizado@email.com'
            }

            const user = new User();
            return user.update(1, usuarioAtualizado).then(data => {
                expect(data[0]).to.be.equal(1);
            })
        
       });
   });

    describe('Método Get Users', () => {
        it('Deve retornar uma lista de todos os usuários', () => {
            const user = new User();
            return user.getAll().then(data => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.all.keys(
                    ['email','id','name','password']
                )
            })
        });
   });
   
   describe('Método GetById', () => {
       it('Retornar um usuário pelo id', () => {
           const user = new User();
           return user.getById(1).then(data => {
               expect(data).to.have.all.keys(
               ['email','id','name','password'])
           })
       })
   });

   describe('Método GetByEmail', () => {
       const email = 'novo@email.com';
       it('Retornar um usuário pelo email', () => {
           const user = new User();
           return user.getByEmail(email).then(data => {expect(data).to.have.all.keys(
               ['email','id','name','password']
            )
           })
       })
   });

    describe('Método Delete', () => {
       it('Deve excluir um usuário', () => {
           const user = new User();
           return user.destroy(1).then(data =>{
               expect(data).to.be.equal(1);
           })

       });
   });

});