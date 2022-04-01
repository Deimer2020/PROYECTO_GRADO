const rol = require("../models/rol-models")


const getRol = async (req, res) => {
    const datos = await rol.find()
    if (datos) {
        return res.status(200).json({
            success: true,
            data: datos,

        })
    } else {
        return res.status(203).json({
            success: false,
            data: "no encontrado"

        })
    }

}

const createRol = async (req, res) => {
    const datos = req.body;
    if (datos.name) {

        const role = new rol(datos)
        const resp = await role.save()
        if (resp._id) {
            return res.status(200).json({
                success: true,
                data: resp,
            });
        } else {
            return res.status(203).json({
                success: false,
                data: "not role  created ",
            });
        }
    } else {
        return res.status(203).json({
            success: false,
            data: "name rol is required",
        });

    }
}
module.exports = {

    getRol, createRol
}