import dbConnect from "db/connect";
import Users from "db/Models/Users";
export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  console.log("Received request for ID:", id);

  await dbConnect();

  try {
    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User data retrieved:", user);

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
