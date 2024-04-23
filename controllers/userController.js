const mongooose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/data");
const UserModel = mongooose.model("Users");

module.exports.registerUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    phone,
    dob,
    address,
    town,
    country,
    state,
    zip,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  //   console.log("efefwef >> ", req.body);
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(200).send({ message: "Email already exists" });
    }
    await UserModel.create({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      dob,
      address,
      country,
      state,
      town,
      zip,
    });
    res.status(200).send({ message: "Account has been created" });
  } catch (error) {
    console.log("register server error >> ", error);
    res.status(500).send({ message: error });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await UserModel.findOne({ email });
    if (!isUser) {
      return res.status(404).send({ message: "Email does not exist" });
    }
    if (await bcrypt.compare(password, isUser.password)) {
      const accessToken = jwt.sign({ email: isUser.email }, SECRET_KEY, {
        expiresIn: "1hr",
      });

      if (res.status(201)) {
        return res.status(200).send({
          message: "Login Successfull",
          data: isUser,
          accessToken,
        });
      } else {
        return res.status(401).send({ message: "Invalid email or password" });
      }
    }
    res.status(201).send({ message: "Invalid email or password" });
  } catch (error) {
    console.log("login server error >> ", error);
    res.status(500).send({ message: error });
  }
};

// forgot password

// update password
