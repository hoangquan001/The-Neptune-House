const mongoose = require('mongoose');

const GioHang_Schema = new mongoose.Schema({
  MaKH: { type: mongoose.SchemaTypes.ObjectId, ref: "KhachHang" },
  TongSoLuongSp: { type: Number }
});

module.exports = mongoose.model("GioHang", GioHang_Schema);
