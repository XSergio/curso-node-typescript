import { testDouble, expect } from './config/helpers';
import User from '../../server/modules/User/service';

describe('Testes Unitários do Controller', () => {
   
    describe('Método Create', () => {
       it('Deve criar um novo usuário', () => {
            const novoUsuario = {
                id: 1,
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