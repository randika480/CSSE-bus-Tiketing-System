const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PassengerSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "passenger",
  },
  accountType: {
    // Permanent | Temporary
    // Permanent - user type - locals only
    // Temporary - user type - can be local or foreigner
    type: String,
    required: true,
  },
  userType: {
    // Local | Foreigner
    type: String,
    required: true,
  },
  NIC: {
    type: String,
  },
  passportNo: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  paymentLogs: [
    {
      rechargedAmount: Number,
      timeStamp: {
        type: Date,
        default: Date(),
      },
      paymentType: String, // VISA | MASTER | AMEX | E-TRANSFER | CASH
    },
  ],
});

//by using "pre save" we run this code segment before mongoose save data on db
PassengerSchema.pre("save", async function (next) {
  //check whether the password has already been hashed or not by using isModified
  if (!this.isModified("password")) {
    next();
  }

  //hash password before passing it to db save query through the model
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //this.password refers to password that contains within request object

  next();
});

//to compare hashed passwords in login scenarios
PassengerSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
};

PassengerSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Passenger = mongoose.model("passenger", PassengerSchema);

module.exports = Passenger;
