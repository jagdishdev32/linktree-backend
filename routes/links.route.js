const {
  checkUserLoggedIn,
  createLink,
  updateLink,
  increaseLinkClicks,
  increaseUsersClicksByUsername,
  increaseUsersClicksByMyLinkTree,
  deleteLink,
} = require("../handlers");
const { getUserDetailsByMyLinkTree } = require("../handlers/users.handlers");
const User = require("../modals/user.modal");

const router = require("express").Router();

// METH		GET	/links/
// DESC		Get all public links
// ACCESS	public
router.get("/", (req, res) => {
  //TODO Complete This function
  return res.json({ message: "links Page" });
});

// METH		POST	/links/
// DESC		Create new link
// ACCESS	private
router.post("/", checkUserLoggedIn, async (req, res) => {
  const { title, url, toggle } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newLink = await createLink(req.user_id, title, url, toggle);
  return res.status(201).json({ message: "Link Created" });
});

// METH		put	/links/
// DESC		Update old links
// ACCESS	private
router.put("/", checkUserLoggedIn, async (req, res) => {
  try {
    const { title, url, id, toggle } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newLink = await updateLink(req.user_id, id, title, url, toggle);
    return res.status(201).json({ message: "Link Updated" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// METH		PUT	/links/clicks
// DESC		Update link click
// ACCESS	public
router.put("/clicks", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  try {
    const newLink = await increaseLinkClicks(id);
    return res.status(201).json({ message: "Link Updated", newLink });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

// METH		POST	/links/mylinktree
// DESC		Get User by myLinkTree
// ACCESS	public
router.post("/mylinktree", async (req, res) => {
  const { myLinkTree } = req.body;
  // console.log(req.body);

  if (!myLinkTree) {
    return res.status(400).json({ message: "myLinkTree required" });
  }

  try {
    const user = await getUserDetailsByMyLinkTree(myLinkTree);
    // Increaseing Click by calling user link tree name
    await increaseUsersClicksByMyLinkTree(myLinkTree);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// METH		PUT	/links/mylinktree
// DESC		Update user clicks by 1 with mylinktree
// ACCESS	public
router.put("/clicks", async (req, res) => {
  const { myLinkTree } = req.body;

  if (!myLinkTree) {
    return res.status(400).json({ message: "myLinkTree required" });
  }

  try {
    const newLink = await increaseUsersClicksByMyLinkTree(myLinkTree);
    return res.status(201).json({ message: "Link Updated", newLink });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

// METH		PUT	/links/users
// DESC		Update user clicks by 1 with username
// ACCESS	public
router.put("/clicks", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "username required" });
  }

  try {
    const newLink = await increaseUsersClicksByUsername(username);
    return res.status(201).json({ message: "Link Updated", newLink });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

// METH		POST /links/delete
// DESC		Delete link
// ACCESS	private
router.delete("/", checkUserLoggedIn, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id required" });
  }

  try {
    const newLink = await deleteLink(req.user_id, id);
    return res.status(201).json({ message: "Link Deleted", newLink });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
