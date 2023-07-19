import Users from "../models/UsersModel.js";
import argon2  from "argon2";
import Role from "../models/RoleModel.js";

export const getUsers = async (req, res) =>{
    try {
        const resp = await Users.findAll({
            //SOLO PARA MOSTRAR CIERTOS ATRIBUTOS
            attributes:['id', 'name', 'lastName','typeIdentification','Identification', 'email'],
            include:[{
                model:Role,
                attributes:['id','name']
            }]

        });
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json({msg:error.message});   
    }

}

export const createUsers = async(req, res) =>{
const {
    name,lastName,typeIdentification,Identification,email,password,confPassword,roleId
}= req.body

 //VERIFICACION DE LAS CONTRASE;AS
 const defaultRoleId = 1;
if (roleId === 2) {
    if (password !== confPassword) return res.status(400).json({msg:"No coincide las contraseñas"})
    const hashPassword = await argon2.hash(password);
    try {
       const user= await Users.create({ 
            name:name,
            lastName:lastName,
            typeIdentification:typeIdentification,
            Identification:Identification,
            email:email,
            password:hashPassword ,
            roleId:roleId || defaultRoleId
        })
        res.status(201).json({ id: user.id, msg: "Usuario creado exitosamente" });

    } catch (error) {
       res.status(400).json({msg: error.message });
    }
   
} else {
    try {
        const user = await Users.create({
          name: name,
          lastName: lastName,
          typeIdentification: typeIdentification,
          Identification: Identification,
          email: email,
          password: null, // O cualquier otro valor predeterminado para el campo de contraseña
          roleId: roleId || defaultRoleId
        });
  
        res.status(201).json({ id: user.id, msg: "Usuario creado exitosamente" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    
}

}

export const updateUsers = async(req, res) =>{
    
}