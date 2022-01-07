const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    Comment: [String],
    Star: { type: Number, enum: [1, 2, 3, 4, 5] },
    NgayDang: { type: Date, default: Date.now(), immutable: true },
    MaSP: { type: mongoose.SchemaTypes.ObjectId, ref: "SanPham" },
    MaKH: { type: mongoose.SchemaTypes.ObjectId, ref: "KhachHang" },
});

module.exports = mongoose.model("Comment", CommentSchema);
