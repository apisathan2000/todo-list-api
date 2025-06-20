import express from 'express'; 

import { createUser , loginUser , deleteUser } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';



const router = express.Router();


router.post('/register' , verifyToken,  createUser);




export default router;