import Role from "../models/RoleModel.js";

export const getRole = async (req, res) =>{
    try {
        const resp = await Role.findAll({
            attributes:['id', 'name']
        })
        res.status(200).json(resp)
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

export const createRole = async (req, res) =>{
    const {name} = req.body
    try {
        await Role.create({
            name:name
        });
        res.status(201).json({msg:'Role Registrado exitosamente'})
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
}

export const updateRole = (req, res) =>{
    
}