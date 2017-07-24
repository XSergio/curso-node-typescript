import { Response } from 'express';
import * as HTTPStatus from 'http-status';

export function dbErrorHandler(res: Response, err: any) {
    console.log(`Error: ${err}`);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        code: 'ERR-01',
        message: 'Erro genérico da aplicação. Contacte administrador.'
    })
}