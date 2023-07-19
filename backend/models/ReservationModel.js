import { Sequelize } from "sequelize";
//importamos la conexion a la DB
import db from "../config/Database.js";
import Users from "./UsersModel.js";

const {DataTypes} = Sequelize;

const Reservation = db.define('reservation',{
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})
Users.hasMany(Reservation)
Reservation.belongsTo(Users, { foreignKey:'userId'})


export default Reservation;