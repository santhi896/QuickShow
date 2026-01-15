


import express from "express";
import { addShow, getNowPlayingMovies, getShow, getShows, getShowById } from "../controllers/showControllers.js";

const showRouter = express.Router();

showRouter.get('/now-playing', getNowPlayingMovies);

showRouter.get('/all', getShows);
showRouter.get('/', getShows);

showRouter.get('/movie/:movieId', getShow);
showRouter.get('/show/:id', getShowById);
// showRouter.get('/:id', getShowById);


showRouter.post('/add', addShow);

export default showRouter;
