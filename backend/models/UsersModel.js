import { Sequelize } from "sequelize";
//importamos la conexion a la DB
import db from "../config/Database.js";
import Role from "./RoleModel.js";

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 50]
        }
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 50]
        }
    },
    typeIdentification:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 50]
        }
    },
    Identification:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 50]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            isEmail:true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
       
    },

    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})
// Relación entre User y Role
Role.hasMany(Users)
Users.belongsTo(Role, { foreignKey: 'roleId' });

export default Users;