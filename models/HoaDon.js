const mongoose = require("mongoose");

const HoaDon_Schema = new mongoose.Schema({
  MaNV: { type: mongoose.SchemaTypes.ObjectId, ref: "NhanVien" },
  HoTen: { type: String },
  DiaChi: { type: String },
  SDT: { type: String },
  Email: { type: String },
  PhiSanPham: { type: Number, default: 0 },
  PhiShip: { type: Number, default: 0 },
  TongTien: { type: Number, default: 0 },
  TinhTrangDonHang: { type: String, enum: ["Chưa giao", "Đã giao", "Đang giao"], default: "Chưa giao" },
  NgayLap: { type: Date, default: Date.now(), immutable: true },
  MaKH: { type: mongoose.SchemaTypes.ObjectId, ref: "KhachHang" },
});

module.exports = mongoose.model("HoaDon", HoaDon_Schema);
