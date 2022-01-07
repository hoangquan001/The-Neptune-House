const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PhieuGiaoHang_Schema = new Schema({
  NgayGiao: { type: String },
  DiaChiGiao: { type: String },
  GhiChu: { type: String },
  TinhTrangDonHang: { type: String, enum: ["Chưa giao", "Đã giao", "Đang giao"], default: "Chưa giao" },
  MaDH: { type: mongoose.SchemaTypes.ObjectId, ref: "HoaDon" },

});

module.exports = mongoose.model("PhieuGiaoHang", PhieuGiaoHang_Schema);