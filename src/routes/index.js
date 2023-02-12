import { Router } from 'express';
import routeEmployeed from './employeed.routes.js';

const router = Router();

router.use('/api/employees', routeEmployeed);

export default router;
