import { Router } from 'express';
import {
  createEmployeed,
  deleteEmployeed,
  getEmployee,
  getEmployeed,
  updateEmployeed,
} from '../controllers/employeed.controller.js';

const router = Router();

router.get('/', getEmployeed);
router.get('/:id', getEmployee);
router.post('/', createEmployeed);
router.patch('/:id', updateEmployeed);
router.delete('/:id', deleteEmployeed);

export default router;
