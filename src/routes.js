import { Router } from 'express';
import multer from 'multer';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';
import configUpload from './config/upload';
import ReservationController from './controllers/ReservationController';

const routes = new Router();
const upload = multer(configUpload);

routes.get('/sessions', SessionController.store);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/houses/:house_id', HouseController.update);
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard/', DashboardController.index);
routes.get('/dashboard/:user_id', DashboardController.show);

routes.post('/houses/:house_id/reservation', ReservationController.store);
routes.get('/reservations', ReservationController.index);
routes.delete('/reservations/cancel', ReservationController.destroy);

export default routes;
