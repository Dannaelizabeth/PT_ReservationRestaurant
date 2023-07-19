import Reservation from "../models/ReservationModel.js";
import Users from "../models/UsersModel.js";

export const getReservation = async (req, res) =>{
try {
    const resp = await Reservation.findAll({
        attributes:['id','date','type','numberOfPeople','description','status'],
        include:[{
            model:Users,
            attributes:['id','name','lastName','typeIdentification','Identification','email']
        }]
    })
    res.status(200).json(resp)
    
} catch (error) {
    res.status(500).json({ message: 'Error al obtener las reservaciones', error });
}
}

export const createReservation = async (req, res) =>{
    const { date, type, numberOfPeople, description } = req.body;
    const userId = req.params.userId
    try {
        const reservation = await Reservation.create({
          date,
          type,
          numberOfPeople,
          description,
          userId,
        });
    
        res.status(201).json(reservation);
      } catch (error) {
        res.status(500).json({ message: 'Error al crear la reserva', error });
      }
}

export const updateReservation = async (req, res) =>{
  const  {id } = req.params;
  const { date, type, numberOfPeople, description, status } = req.body;

  try {
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Actualiza los datos de la reserva
    await Reservation.update({
      date :date,
    type : type,
    numberOfPeople : numberOfPeople,
    description : description,
    status : status,

    },{
      where:{
        id:reservation.id
      }
    })
    res.status(200).json({ msg: "Reserva actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar la reserva", error });
  }
}