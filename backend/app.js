import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const app = express();

//imort route 
import userRoute from "./Routes/user.model.js"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().then(() => {
    console.log("connect to DB")
}).catch((err) => {
    console.log(err);
})

async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/ecom")
}

app.use("/api",userRoute)


//error handler for wrong address
app.all("*", (req, res, next) => {
    next(new ExpressError(401, "Page not found"));
})

// err handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Some thing went wrong" } = err;
    // res.status(statusCode).send(message);
    console.log(message)
    res.json({ message });

    // console.log(message);
})


app.listen(process.env.PORT, () => {
    console.log(`server listing to ${process.env.PORT} `)
    
})