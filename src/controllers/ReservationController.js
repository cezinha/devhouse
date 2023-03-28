import Reservation from '../models/Reservation';
import House from '../models/House';
import User from '../models/User';

class ReservationController {
  async index(req, res) {
    const { user_id } = req.headers;

    const reservations = Reservation.find({ user: user_id }).populate('house');

    return res.json(reservations);
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = House.findById(house_id);
    if (!house) {
      return res.status(400).json({ message: 'House not found' });
    }
    if (!house.status) {
      return res.status(400).json({ message: 'Request not available' });
    }

    const user = User.findById(user_id);
    if (String(user._id) === String(house.user)) {
      return res.status(401).json({ message: 'Reservation not permitted' });
    }

    const reservation = await Reservation.create({
      user: user_id,
      house: house_id,
      date,
    });

    await reservation.populate('house').populate('user').execPopulate();

    return res.json(reservation);
  }

  async destroy(req, res) {
    const { reserve_id } = req.body;

    await Reservation.findByIdAndDelete({ _id: reserve_id });

    return res.status(200).json({ deleted: true });
  }
}

export default new ReservationController();
