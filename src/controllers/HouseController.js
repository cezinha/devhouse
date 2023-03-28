// methods index, show, update, store, destroy
/*
index: list sessions
show: show unique session
store: create session
update: edit session
destroy: remove session
*/
import * as yup from 'yup';
import House from '../models/House';
import User from '../models/User';

class HouseController {
  async index(req, res) {
    const { status } = req.query;

    const houses = await House.find({ status });
    return res.json(houses);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      description: yup.string().required(),
      price: yup.number().required(),
      location: yup.string().required(),
      status: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.json(house);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      description: yup.string().required(),
      price: yup.number().required(),
      location: yup.string().required(),
      status: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { house_id } = req.params;
    const { user_id } = req.headers;

    if (!user_id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await House.updateOne({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.status(200).json({ updated: true });
  }

  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    if (!user_id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await House.findByIdAndDelete(house_id);

    return res.status(200).json({ deleted: true });
  }
}

export default new HouseController();
