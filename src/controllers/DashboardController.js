import House from '../models/House';
import User from '../models/User';

class DashboardController {
  async index(req, res) {
    const houses = await House.find({});

    return res.json(houses);
  }

  async show(req, res) {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const house = await House.find({ user: user_id });

    return res.json(house);
  }
}

export default new DashboardController();
