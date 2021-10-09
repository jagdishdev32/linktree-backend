const {
  getUser,
  getUsers,
  createUser,
  checkUserLoggedIn,
  deleteAllUsers,
  updateUserLinkTree,
  updateTheme,
} = require("./users.handlers");

const {
  hashPassword,
  verifyPassword,
  checkNotIncludeBadCharaters,
  checkAnyLoggedIn,
} = require("./common.handlers");

const { generateToken, verifyToken } = require("./token.handlers");

const {
  createLink,
  updateLink,
  increaseLinkClicks,
  updateToggle,
  increaseUsersClicksByMyLinkTree,
  increaseUsersClicksByUsername,
  deleteLink,
} = require("./links.handle");

module.exports = {
  // User
  getUser,
  getUsers,
  createUser,
  checkUserLoggedIn,
  deleteAllUsers,
  updateUserLinkTree,
  updateTheme,
  // Common
  hashPassword,
  verifyPassword,
  checkNotIncludeBadCharaters,
  checkAnyLoggedIn,
  // Token
  generateToken,
  verifyToken,
  // Link
  createLink,
  updateLink,
  increaseLinkClicks,
  updateToggle,
  increaseUsersClicksByMyLinkTree,
  increaseUsersClicksByUsername,
  deleteLink,
};
