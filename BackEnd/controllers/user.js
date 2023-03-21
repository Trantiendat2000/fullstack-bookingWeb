const mongoose = require("mongoose");
const mongodb = require("mongodb");

const User = require("../models/user");
const Transaction = require("../models/transaction");

// DK account
exports.registerUser = (req, res, next) => {
  const { username, password, fullName, phoneNumber, email, isAdmin } =
    req.body;
  const user = new User({
    username: username,
    password: password,
    isAdmin: isAdmin,
  });

  User.find({ username: username })
    .then((users) => {
      if (users.length > 0) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ message: "Username is already existed" }));
        res.end();
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ message: "USuccesfully registered" }));
        res.end();
        return user.save();
      }
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
};

// login account
exports.loginUser = (req, res, next) => {
  const { username, password } = req.body;

  User.find({ username: username })
    .then((users) => {
      if (users.length > 0) {
        if (users[0].password === password) {
          return res
            .status(200)
            .send(JSON.stringify({ message: "Successfully Logged In" }));
        } else {
          return res.status(400).json({ message: "Password Is Not Correct" });
        }
      } else {
        return res.status(400).json({ message: "User Not Found" });
      }
    })
    .catch((err) => console.log(err));
};

exports.postReservation = (req, res, next) => {
  const { user, hotel, room, dateStart, dateEnd, price, payment, status } =
    req.body;
  const transaction = new Transaction({
    user: user,
    hotel: new mongodb.ObjectId(hotel),
    room: room,
    dateStart: dateStart,
    dateEnd: dateEnd,
    price: price,
    payment: payment,
    status: status,
  });

  transaction
    .save()
    .then((result) => {
      res
        .status(200)
        .send(JSON.stringify({ message: "Successfully Reserved" }));
      console.log("Added Transaction");
    })
    .catch((err) => console.log(err));
};

exports.postTransaction = (req, res, next) => {
  const user = req.body.user;

  Transaction.find({ user: user })
    .then((transaction) => {
      console.log(transaction);
      res.status(200).send(transaction);
    })
    .catch((err) => console.log(err));
};
