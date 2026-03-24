import "dotenv/config"
import app from "./src/app.js";
import {connectDB} from "./src/lib/db.js";

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`);
})