import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../Utils/index.util';
import { errorCommonMessage } from '../../Messages/index.message';


function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    return res.status(err.statusCode || 500).send({ path: err.path, message: err.message || errorCommonMessage.server });
};



export default errorHandler;