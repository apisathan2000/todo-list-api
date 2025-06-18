import express from 'express'; 
import { getAllTasks } from '../controllers/taskController.js';


const router = express.Router(); 



router.get('/tasks' , getAllTasks);



export default router;