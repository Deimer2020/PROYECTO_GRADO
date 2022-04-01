const user = require("../models/user-model")
const rol = require("../models/rol-models")

const getUser = async (req, res) => {
    const datos = await user.find({rol:{$ne: "6203353427709a23aa488b62"}});
    if (datos.length > 0) {
        let datauser = await Promise.all(
            datos.map(async (user) => {

                if (user.rol) {
                    const role = await rol.findOne({ _id: user.rol })
                    return { ...user._doc, rolName: role.name };
                } else {
                    return { ...user._doc };
                }

            })


        );

        return res.status(200).json({
            success: true,
            data: datauser 


        });

    } else {
        return res.status(203).json({
            success: false,
            data: "usuario no  encontrado"


        })

    }
}

const createUser = async (req, res) => {
    const datos = req.body;
    if (datos) {
        if (datos.rol) {

            try {

                const role = await rol.findOne({ _id: datos.rol });
                if (role._id) {
                    const users = new user(datos)
                    const resp = users.save();
                    const dataUser = { ...resp._doc, rolname: role.name }


                    if (resp_id) {
                        return res.status(200).json({
                            success: true,
                            data: dataUser,
                        });

                    }

                    else {
                        return res.status(203).json({
                            success: false,
                            data: "User no created",
                        });
                    }

                }
                else {
                    return res.status(203).json({
                        success: false,
                        data: "Rol not found",
                    });
                }

            } catch (error) {
                return res.status(203).json({
                    success: false,
                    data: "Rol not found",
                });
            }

        } else {
            return res.status(203).json({
                success: false,
                data: "rol is required",
            });

        }
    } else {
        return res.status(203).json({
            success: false,
            data: "Complete los campos",
        });
    }
}
const login = async (req, res) => {
    const datos = req.body;
    if (datos.email && datos.password) {
        const users = await user.findOne({
            email: datos.email,
            password: datos.password,
        });
        if (users) {
            if (users.status == 1) {
                const rol = await obtenerRol(users.rol);
                if (rol) {

                    return res.status(200).json({
                        success: true,
                        data: { ...users._doc, roleName: rol.slug },
                    });
                } else {
                    return res.status(203).json({
                        success: false,
                        data: "rol incorrect",
                    });
                }
            } else {
                return res.status(200).json({
                    success: false,
                    data: "cuenta desactivada",
                });
            }
        } else {
            return res.status(200).json({
                success: false,
                data: "email or password incorrect",
            });
        }
    } else {
        return res.status(203).json({
            success: false,
            data: "email and password has required",
        });
    }
};
const obtenerRol = async (idrol) => {
    const role = await rol.findOne({ _id: idrol });
    if (role) {
      return role;
    }
    return null;
  };
  
  const updateUser = async (req, res) => {

    const idusers= req.params.iduser;
    const userUpdate = req.body;
    let usuario = await user.findOne({ _id:idusers })

    if (usuario) {
        usuario.username = userUpdate.username ? userUpdate.username : usuario.username;
        usuario.email = userUpdate.email ? userUpdate.email :usuario.email;
        usuario.name = userUpdate.name ? userUpdate.name : usuario.name;
        usuario.last_name = userUpdate.last_name ? userUpdate.last_name : usuario.last_name;
        usuario.rol= userUpdate.rol? userUpdate.rol : usuario.rol;
        await usuario.save();

        return res.status(200).json({
            success: true,
            data: usuario,
        });
    } else {
        return res.status(203).json({
            success: false,
            data: "users not found",
        });
    }
}
const assigRol = async (res, req) => {
    const datosRol = req.body;
    const idUser = req.params.iduser;

    if (idUser && datosRol.rol) {
        const users = await user.findOne({ _id: idUser })
        if (users) {

            const role = await rol.findOne({ _id: datosRol.rol })

            if (role) {

                users.rol = datosRol.rol;
                const resp = await user.save();
                return res.status(200).json({
                    success: true,
                    data: { ...users._doc, rolname: role.name },
                });
            } else {
                return res.status(203).json({
                    success: false,
                    data: "role not found",
                });
            }
        } else {
            return res.status(203).json({
                success: false,
                data: "user not found",
            });
        }
    } else {
        return res.status(203).json({
            success: false,
            data: "rol is required",
        });
    }


}
const deleteUser = async (req, res) => {
    const idUser = req.params.iduser;
    if (idUser) {
        const resp = await user.findByIdAndDelete({ _id: idUser })
        if (resp) {
            res.status(200).json({
                success: true,
                message: resp._id + "is deleted",
            });
        } else {
            res.status(203).json({
                success: false,
                message: "users no deleted",
            });
        }
    } else {
        res.status(203).json({
            success: false,
            message: "users no exist",
        });
    }
};
module.exports = {
    getUser,
    createUser,
    assigRol,
    deleteUser,
    login,
    updateUser
}