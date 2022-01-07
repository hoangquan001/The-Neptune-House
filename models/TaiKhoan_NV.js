const mongoose = require('mongoose');

const TaiKhoan_NV_Schema = new mongoose.Schema({
  "TenDangNhap": {
    type: String,
    required: true,
    unique: true,
  },
  "MatKhau": { type: String, required: true },
  "NgayTao": { type: Date, default: Date.now(), immutable: true },
  "MaNV": { type: mongoose.SchemaTypes.ObjectId, ref: "NhanVien" },
});

module.exports = mongoose.model("TaiKhoan_NV", TaiKhoan_NV_Schema);
