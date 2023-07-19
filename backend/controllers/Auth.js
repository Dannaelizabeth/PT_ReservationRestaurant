import Users from "../models/UsersModel.js";
import argon2  from "argon2";


//Inicio de Sesion

export const Login = async (req, res) =>{
    let email= req.body.email
    const user = await Users.findOne({
        where:{
            email:email
        }
    });

    if(!user) return res.status(404).json({msg:"Usuario no Registrado"});

    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg:"Las contrase;as no coninciden"});

    req.session.userId = user.id;
    const id = user.id;
    const name = user.name;
    const lastName = user.lastName;
    const typeIdentification= user.typeIdentification;
    const Identification = user.Identification;
    const vemail = user.email;
    const roleId = user.roleId;
    res.status(200).json({id,name, lastName, typeIdentification,Identification, vemail, roleId }) 
}

export const Auth = async(req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg:"Inicie Session"})
    }

    const user = await Users.findOne ({
        attributes:['id', 'name', 'lastName','typeIdentification','Identification','email', 'roleId'],
        where:{
            id: req.session.userId

        }
    });
    if(!user) return res.status(404).json({msg:'no se encontro el usuario'})
    res.status(200).json(user)
}

//Cierre de session

export const logOut = (req,res ) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg:"No se puede cerrar la sesion"})
        res.status(200).json({mesg:"Session cerrada exitosamente"})
    })
} 