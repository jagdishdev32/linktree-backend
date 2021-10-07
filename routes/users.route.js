const router = require("express").Router();

const {
  getUsers,
  createUser,
  checkNotIncludeBadCharaters,
  verifyPassword,
  generateToken,
  deleteAllUsers,
  checkUserLoggedIn,
  updateUserLinkTree,
} = require("../handlers");
const { getUserByUsername } = require("../handlers/users.handlers");

// METH		GET	/user/
// DESC		Get User Route
// ACCESS	public
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json({ message: "users here", users: users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// METH		POST /user/register
// DESC		Register User
// ACCESS	public
router.post("/register", async (req, res) => {
  const { username, password, myLinkTree } = req.body;

  // If no myLinkTree then username is myLinkTree
  let linktree = myLinkTree || username;
  const user = await createUser(username, password, linktree);

  //   Error Handling
  if (user.message) {
    return res.status(400).json({ message: user.message });
  }

  return res.status(201).json({
    message: "User Registered...",
    user: { ...user, password: undefined },
  });
});

// METH		POST /users/update
// DESC		Update Users LinkTree
// ACCESS	private
router.post("/update", checkUserLoggedIn, async (req, res) => {
  try {
    const { myLinkTree } = req.body;
    if (!myLinkTree) {
      return res.status(400).json({ message: "myLinkTree is undefined" });
    }
    const oldValues = await updateUserLinkTree(req.user_id, myLinkTree);
    return res.json({ message: "Updated" });
  } catch (error) {
    throw error;
  }
  // return res.json({ message: "Update route" });
});

// METH		POST /users/login
// DESC		Login User (return access token and user)
// ACCESS	public
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username &&
      password &&
      checkNotIncludeBadCharaters(username) &&
      checkNotIncludeBadCharaters(password)
    ) {
      const user = await getUserByUsername(username);

      // If user exists
      if (user.length > 0) {
        const passMatch = await verifyPassword(password, user[0].password);
        // const passMatch = await

        // If password is correct
        if (passMatch) {
          const token = await generateToken(
            {
              username: user[0].username,
              user_id: user[0].id,
            },
            (owner = "user")
          );
          return res.status(200).json({ access_token: token });
        }
      }
    }

    return res.status(400).json({ message: "Invalid Details" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

if (process.env.DELETE_ENABLED == "true") {
  // METH		GET /users/delete
  // DESC		delete all users
  // ACCESS	public
  router.get("/delete", async (req, res) => {
    await deleteAllUsers();
    return res.json({ message: "Deleted" });
  });
}

module.exports = router;
