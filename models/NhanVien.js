const mongoose = require('mongoose');

const NhanVien_Schema = new mongoose.Schema({
  HoTen: { type: String, minLength: 5, maxLength: 50, required: true },
  GioiTinh: { type: String, enum: ["Nam", "Nữ"], default: "Nam" },
  DiaChi: { type: String, default: "Việt Nam" },
  NgaySinh: { type: Date },
  SDT: { type: Number },
  LoaiNV: { type: String, default: "Bán Hàng" },
  Luong: { type: Number, default: 10000 },
  NgayLamViec: { type: Date, default: Date.now() },
  Avatar: { type: mongoose.SchemaTypes.ObjectId, ref: "Image", }


});

module.exports = mongoose.model("NhanVien", NhanVien_Schema);
