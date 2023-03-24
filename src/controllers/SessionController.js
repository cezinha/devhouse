// methods index, show, update, store, destroy
/*
index: list sessions
show: show unique session
store: create session
update: edit session
destroy: remove session
*/
import User from "../models/User";

class SessionController {
  store(req, res) {
    const email = req.body;

    let user = User.findOne({ email });

    if (!user) {
      user = User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
