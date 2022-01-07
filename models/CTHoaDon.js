const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CT_HoaDonSchema = new Schema({
  SoLuong: { type: Number, require: true },
  ThanhTien: { type: Number },
  Sugar: { type: String, enum: ['30', '50', '70'], require: true },
  Size: { type: String, enum: ['S', 'M', 'L'], require: true },
  MaSP: { type: mongoose.SchemaTypes.ObjectId, ref: "SanPham" },
  MaHD: { type: mongoose.SchemaTypes.ObjectId, ref: "HoaDon" },
});

module.exports = mongoose.model("CT_HOADON", CT_HoaDonSchema);
