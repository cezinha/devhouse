// methods index, show, update, store, destroy
/*
index: list sessions
show: show unique session
store: create session
update: edit session
destroy: remove session
*/
import House from "../models/House";

class HouseController {
  store(req, res) {
    const { filename } = req.file;
    const { description, price, location, status } = req.params;
    const { user_id } = req.headers;
    const house = new House({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.json(house);
  }
}

export default new HouseController();
