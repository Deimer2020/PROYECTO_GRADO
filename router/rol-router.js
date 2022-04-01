const express= require("express")
const rol= require("../controller/rol-ctrl")
const router= express.Router()

router.get("/rol", rol.getRol)
router.post("/rol", rol.createRol)

module.exports=router