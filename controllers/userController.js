import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken } from "../middleware/jwt.js";

export const createUser = async function (req, res) {
  const { name, email, password } = req.body;
  var user;

  try {
    const ifExists = await User.findOne({ email: email }).exec();

    if (ifExists) {
      return res.status(401).json({ msg: `Email already in use` });
    }

    user = await User.create(req.body);
    if (!user) {
      return res.status(500).json({ msg: `User not created` });
    }
    res.status(201).json({ msg: `User created successfully` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Internal Server Error` });
  }
};

export const loginUser = async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email }).exec();

    if (!user) {
      return res.status(401).json({ msg: `Authentication Failed !` });
    }

    const isValid = await compareFunction(password, user.password);

    if (!isValid) {
      return res.status(401).json({ msg: `Login Failed !` });
    }

    const token = createToken(user.name, user.id);

    return res.status(200).json({ msg: `Login Successful !`, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `Internal Server Error !` });
  }
};

export const deleteUser = async function (req, res) {
  const { id } = req.user;

  try {
    const deletedUser = await User.findOneAndDelete({
      _id: id,
    }).exec();

    if (deletedUser) {
      return res.status(204).json({
        msg: `User Deleted Successfully !`,
        id
      });
    }

    return res.status(404).json({ msg: `Cannot find user` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Function to compare password
const compareFunction = async function (unhashedString, hash) {
  return await bcrypt.compare(unhashedString, hash);
};
