import { UserInterface } from '../Interfaces/index.interface';


declare global {
    namespace Express {
        interface Request {
            user?: UserInterface,
        }
    }
}