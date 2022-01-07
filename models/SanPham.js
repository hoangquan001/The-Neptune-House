const mongoose = require('mongoose');
const Schema = mongoose.Schema
const SanPham_Schema = new Schema({
    TenSP: { type: String, require: true },
    LoaiSP: { type: String, require: true },
    GiaBan: { type: Number, require: true },
    MoTa: { type: String, default: "Not thing" },
    Image: { ref: "HoaDon", type: mongoose.SchemaTypes.ObjectId, },
})

module.exports = mongoose.model('SanPham', SanPham_Schema)