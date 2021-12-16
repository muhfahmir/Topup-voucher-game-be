const mongoose = require("mongoose");
let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email  harus diisi"],
    },
    name: {
      type: String,
      require: [true, "Nama  harus diisi"],
      maxlength: [225, "Panjang nama harus antara 3 - 225 karakter"],
      minLength: [3, "Panjang nama harus antara 3- 225 karakter"],
    },
    username: {
      type: String,
      require: [true, "Nama  harus diisi"],
      maxlength: [225, "Panjang username harus antara 3 - 225 karakter"],
      minLength: [3, "Panjang username harus antara 3- 225 karakter"],
    },
    password: {
      type: String,
      require: [true, "Kata sandi  harus diisi"],
      maxlength: [225, "Panjang password maksimal 225 karakter"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    avatar: {
      type: String,
    },
    fileName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      require: [true, "Nomor telepon  harus diisi"],
      maxlength: [13, "Panjang nomor telepon harus antara 9 - 13 karakter"],
      minLength: [9, "Panjang nomor telepon harus antara 9 - 13 karakter"],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
