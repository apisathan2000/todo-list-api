import express from 'express'; 

import { createUser , loginUser , deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';



const router = express.Router();


router.post('/register' , verifyToken,  createUser);




export default router;