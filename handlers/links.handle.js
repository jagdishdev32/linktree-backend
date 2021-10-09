const User = require("../modals/user.modal");

module.exports = {
  createLink: async (user_id, title, url = "", toggle = false) => {
    try {
      const newLink = User.findByIdAndUpdate(user_id, {
        $addToSet: { links: { title, url, toggle } },
      });
      return newLink;
    } catch (error) {
      throw error;
    }
  },
  updateLink: async (user_id, link_id, title, url, toggle) => {
    try {
      const oldLink = await User.findOneAndUpdate(
        { _id: user_id, "links._id": link_id },
        {
          $set: {
            "links.$.title": title,
            "links.$.url": url,
            "links.$.toggle": toggle,
          },
        }
      );

      return oldLink;
    } catch (error) {
      throw error;
    }
  },
  updateToggle: async (user_id, link_id, toggle = false) => {
    try {
      const oldLink = await User.findOneAndUpdate(
        { _id: user_id, "links._id": link_id },
        {
          $set: {
            "links.$.toggle": toggle,
          },
        }
      );
      return oldLink;
    } catch (error) {
      throw error;
    }
  },
  increaseLinkClicks: async (link_id, clicks = 1) => {
    try {
      // Searching for link
      const oldLink = await User.findOne({
        links: { $elemMatch: { _id: link_id } },
      });

      // Getting Old clicks values
      const oldClicks = oldLink.links.filter((link) => link._id == link_id)[0]
        .clicks;

      // Updating to new value
      const newLink = await User.findOneAndUpdate(
        { "links._id": link_id },
        {
          $set: {
            "links.$.clicks": oldClicks + clicks,
          },
        }
      );
      return oldLink;
    } catch (error) {
      throw error;
    }
  },
  increaseUsersClicksByUsername: async (username, clicks = 1) => {
    try {
      // Searching for link
      const oldLink = await User.findOne({
        username: username,
      });

      // Getting Old clicks values
      const oldClicks = oldLink.clicks;

      // Updating to new value
      const newLink = await User.findOneAndUpdate(
        { username },
        {
          $set: {
            clicks: oldClicks + clicks,
          },
        }
      );
      return newLink;
    } catch (error) {
      throw error;
    }
  },
  increaseUsersClicksByMyLinkTree: async (myLinkTree, clicks = 1) => {
    try {
      // Searching for link
      const oldLink = await User.findOne({
        myLinkTree,
      });

      // Getting Old clicks values
      const oldClicks = oldLink.clicks;

      // Updating to new value
      const newLink = await User.findOneAndUpdate(
        { myLinkTree },
        {
          $set: {
            clicks: oldClicks + clicks,
          },
        }
      );
      return newLink;
    } catch (error) {
      throw error;
    }
  },
  deleteLink: async (user_id, link_id) => {
    try {
      const oldLink = await User.updateOne(
        { _id: user_id, "links._id": link_id },
        {
          $pull: {
            links: {
              _id: link_id,
            },
          },
        }
      );

      return oldLink;
    } catch (error) {
      throw error;
    }
  },
};
