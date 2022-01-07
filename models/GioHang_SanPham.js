const mongoose = require('mongoose');
const Schema = mongoose.Schema
const GioHang_SanPham_Schema = new Schema({
    SoLuong: { type: Number, require: true },
    TongTien: { type: Number },
    MaGH: { type: mongoose.SchemaTypes.ObjectId, ref: "GioHang" },
    MaSP: { type: mongoose.SchemaTypes.ObjectId, ref: "SanPham" },
})

module.exports = mongoose.model('GioHang_SanPham', GioHang_SanPham_Schema)