import express from "express";
import routes from "./routes/routes";

const port = 8000;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log('App is running');
})
