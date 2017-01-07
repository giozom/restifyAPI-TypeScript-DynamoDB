import * as restify from 'restify';
import routeController from '../controllers/routeController'

function Route(api:restify.Server) {
  let routeCtrl = new routeController();
  api.get('/api/movie', routeCtrl.get);
  api.get('/api/movie/:id', routeCtrl.get);
  api.post('api/movie', routeCtrl.post);
  api.put('api/movie/:id', routeCtrl.put);
  api.del('api/movie/:id', routeCtrl.delete);
}

module.exports.routes = Route;
