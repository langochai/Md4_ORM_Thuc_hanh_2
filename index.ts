import { AppDataSource } from "./src/data-source";

import { PhoneBook } from "./src/entity/PhoneBook";

import multer from "multer";

const upload = multer();

import express from "express";

import bodyParser from "body-parser";

const PORT = 8000;

AppDataSource.initialize().then(() => {
    console.log("connected to db");
});

const app = express();

app.set("view engine", "ejs");

app.set("views", "./src/views");

app.use(bodyParser.json());

app.use(express.json());

const PhoneBookRepo = AppDataSource.getRepository(PhoneBook);

app.get("/", (req, res) => {
    res.redirect("/phone/create");
});

app.get("/phone/create", (req, res) => {
    res.render("create");
});

app.post("/phone/create", upload.none(), async (req, res) => {
    const phoneData = {
        name: req.body.name,

        address: req.body.address,

        email: req.body.email,

        phone: req.body.phone,
    };

    await PhoneBookRepo.save(phoneData);

    res.render("success");
});

app.get("/phone/list", async (req, res) => {
    const phoneBooks = await PhoneBookRepo.find();

    res.render("list", { phoneBooks: phoneBooks });
});

app.listen(PORT, () => {
    console.log("App running with port: " + PORT);
});
