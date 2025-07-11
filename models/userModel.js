import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Function to hash the password and return String
const hashFunction = async function (unhashedString) {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await hash(unhashedString, salt);
  return hashedString;
};

/* Document middleware is supported for the following document functions. 
In Mongoose, a document is an instance of a Model class. 
In document middleware functions, this refers to the document. 
To access the model, use this.constructor.*/

// Pre method to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashFunction(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;

//Function to compare password
const compareFunction = async function(unhashedString) {
  await bcrypt.compare(unhashedString, hash);
}
