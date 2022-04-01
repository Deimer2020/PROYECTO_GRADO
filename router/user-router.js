const express= require("express")
const user= require("../controller/user-ctrl")
const router= express.Router()

router.get("/user",user.getUser)
router.post("/user", user.createUser)
router.post("/login", user.login)
router.post("/rolToUser/:iduser", user.assigRol)
router.delete("/user/:iduser", user.deleteUser)
router.put("/user/:iduser" , user.updateUser)
module.exports=router