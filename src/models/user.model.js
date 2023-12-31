import { model, Schema } from "mongoose";

let collection = "users";
let schema = new Schema({
  name: { type: String, required: true },
  photo: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/17/17004.png",
  },
  first_name: { type: String, index: true, required: true },
  last_name: { type: String, index: true, required: true },
  mail: { type: String, unique: true, index: true, required: true },
  age: { type: Number, default: 12 },
  password: { type: String, required: true },
  cart: {
    type: mongoose.Schema.Types.ObjectId,ref: 'Cart'
  },
  role: { type: String, default: 'user' }
});

let User = model(collection, schema);
export default User;
