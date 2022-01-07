const mongoose = require('mongoose')

const TaiKhoan_KH_Schema = new mongoose.Schema({
    "TenDangNhap": { type: String, minLength: 5, maxLength: 20, required: true, unique: true },
    "MatKhau": { type: String, required: true },
    "NgayTao": { type: Date, default: Date.now(), immutable: true },
    "MaKH": { type: mongoose.SchemaTypes.ObjectId, ref: "KhachHang" },
    "XacThuc": { type: Boolean, default: false }
})

module.exports = mongoose.model("TaiKhoan_KH", TaiKhoan_KH_Schema); 