import {app} from './app.js';
import 'dotenv/config';
import taskRouter from './routes/taskRoutes.js'
import { notFound } from './middleware/notFound.js';

app.use('/api/v1', taskRouter);
app.use(notFound);

const start = async function () { 
    try {
        // Load environment variables
        const PORT = process.env.PORT || 3000;

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

start();