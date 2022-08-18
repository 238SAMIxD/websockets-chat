import express from "express";
import open from "open";

const PORT = 1234;

const app = express();
const server = app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
    // open(`http://localhost:${PORT}`);
});

app.use(express.static("public"));

