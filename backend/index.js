import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

dotenv.config();

 connectDB()
     .then(() => {
       const PORT = process.env.PORT || 4000;
         app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
     })
     .catch((err) => {
         console.log("MONGO DB connection failed: ", err);
     })
     
