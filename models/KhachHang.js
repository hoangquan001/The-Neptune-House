const mongoose = require("mongoose");
//add model mới
const KhachHang_Schema = new mongoose.Schema({
  HoTen: { type: String, require: true },
  GioiTinh: { type: String, enum: ["Nam", "Nữ"], require: true },
  DiaChi: { type: String, require: true },
  NgaySinh: { type: Date },
  SDT: { type: String },
  Avatar: { type: mongoose.SchemaTypes.ObjectId, ref: "Image" }
});

module.exports = mongoose.model("KhachHang", KhachHang_Schema);
