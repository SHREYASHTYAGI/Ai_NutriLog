require('dotenv').config();
const app=require('./src/app');
const dns=require('dns');
dns.setServers(["1.1.1.1"],["8.8.8.8"])
const connectDB=require('./src/db/db');
connectDB();
app.listen(3000,()=>{
    console.log("Server is Live❗")
})
