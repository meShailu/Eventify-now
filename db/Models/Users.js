import mongoose from "mongoose";

const { Schema } = mongoose;

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  emailVerified: { type: String, required: true },
});

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;
