import { Sequelize } from "sequelize";
//importamos la conexion a la DB
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Role = db.define('role',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    
});

export default Role;