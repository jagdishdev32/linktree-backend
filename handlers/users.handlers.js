const User = require("../modals/user.modal");
const { hashPassword } = require("./common.handlers");
const { verifyToken } = require("./token.handlers");

module.exports = {
  getUsers: async () => {
    const users = await User.find();

    return users;
  },
  getUser: async (id) => {
    const user = await User.findById(id);

    return user;
  },
  getUserByUsername: async (username) => {
    const user = await User.find({ username: username });
    return user;
  },
  createUser: async (username, password, myLinkTree) => {
    try {
      const hashedPassword = await hashPassword(password);
      const user = await User.insertMany([
        { username: username, password: hashedPassword, myLinkTree },
      ]);
      return user;
    } catch (error) {
      return { message: error.message };
    }
  },
  updateUserLinkTree: async (id, myLinkTree) => {
    try {
      const updated = await User.findByIdAndUpdate(id, {
        $set: { myLinkTree: myLinkTree },
      });
      // const hashedPassword = await hashPassword(password);
      // const user = await User.findByIdAndUpdate(id,
      //   {... , ...args},
      // ]);
      // return user;
      return updated;
      // return { ...args };
    } catch (error) {
      return { message: error.message };
    }
  },
  checkUserLoggedIn: async (req, res, next) => {
    const ACCESS_TOKEN = req.headers.authorization;

    try {
      if (ACCESS_TOKEN) {
        const verify = await verifyToken(ACCESS_TOKEN);
        if (verify) {
          req.user_id = verify.user_id;
          req.username = verify.username;
          return next();
        }
      }

      return res.status(401).json({ message: "unauthorized" });
    } catch (error) {
      return { message: error.message };
    }
  },
  deleteAllUsers: async () => {
    try {
      await User.remove({});
      return { message: "deleted All users" };
    } catch (error) {
      throw error;
    }
  },
};