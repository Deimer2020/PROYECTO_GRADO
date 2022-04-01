const express= require("express");
const bodyParser= require("body-parser")
const conexion= require("./conexion")
const app= express();
const user= require("./router/user-router")
const rol= require("./router/rol-router")

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));



app.use("/api", user)
app.use("/api", rol)


conexion.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(3003, () => console.log('Escuchando en el puerto 3003'));
