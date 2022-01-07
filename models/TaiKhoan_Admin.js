const mongoose = require('mongoose');

const TaiKhoan_Admin_Schema = new mongoose.Schema({
  TenDangNhap: {
    type: String,

    required: true,
    unique: true,
  },
  MatKhau: { type: String, required: true },
  NgayTao: { type: Date, default: Date.now(), immutable: true },

});

module.exports = mongoose.model("TaiKhoan_Admin", TaiKhoan_Admin_Schema);