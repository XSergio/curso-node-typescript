import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';

import User from './service';
import { onSucess } from '../../api/responses/sucessHandler';
import { onError } from '../../api/responses/errorHandler';
import { dbErrorHandler } from '../../config/dbErrorHandler'

class UserController {

private UserService: User;

    constructor() {
        this.UserService = new User();
    }

    getAll(req: Request, res: Response) {
        this.UserService
            .getAll()
            .then(_.partial(onSucess, res))
            .catch(_.partial(onError, res, 'Erro ao carregar todos os usuários'))
    }

    createUser(req: Request, res: Response) {
        this.UserService
            .create(req.body)
            .then(_.partial(onSucess, res))
            .catch(_.partial(dbErrorHandler, res))
            .catch(_.partial(onError, res, 'Erro ao criar novo usuário'))
    }

    getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        this.UserService.getById(userId)
            .then(_.partial(onSucess, res))
            .catch(_.partial(onError, res, 'Erro ao carregar o usuário'))
    }

    getByEmail(req: Request, res: Response) {
        const userEmail = req.body.email;
        this.UserService.getByEmail(userEmail)
            .then(_.partial(onSucess, res))
            .catch(_.partial(onError, res, 'Error ao carregar o usuário'))
    }

    updateUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        this.UserService.update(userId, req.body)
            .then(_.partial(onSucess, res))
            .catch(_.partial(onError, res, 'Falha ao atualizar usuário'))
    }

    destroyUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        this.UserService.destroy(userId)
            .then(_.partial(onSucess, res))
            .catch(_.partial(onError, res, 'Falha ao excluir usuário'))
    }
};

export default UserController;