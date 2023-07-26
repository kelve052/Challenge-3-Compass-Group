import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { petSchema } from "./modelPet";

const tutorSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: [true, "turor name"],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: [true, "totor phone"],
  },
  email: {
    type: String,
    required: [true, "tutor email"],
    unique: [true],
    validate: {
      validator: function (value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "The email entered is not a valid email",
    },
    message: ["invalid email"],
  },
  date_of_birth: {
    type: Date,
    required: [true, "tutor date_of_birth"],
  },
  zip_code: {
    type: Number,
    required: [true, "tutor zip_code"],
  },
  pets: {
    type: [petSchema],
  },
});

export default mongoose.model("Tutor", tutorSchema);
