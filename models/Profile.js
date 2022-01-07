const TKKH = require("../models/TaiKhoan_KH");
const TKNV = require("../models/TaiKhoan_NV");

class userProfile {
    //[GET]
    constructor() {
        this.id = "";
        this.firstName = "Admin";
        this.fullName = "Admin";
        this.lastName = "Admin"
        this.img = "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp";
        this.username = "Admin"
        this.emails = "nepturn111@gmail.com"
        this.gender = "Nam"

    }
    async setData(user, role) {
        if (role === "admin") {
            this.id = user._id
            return;
        }


        let UserInf = null
        if (role === 'staff') {
            let cus = await TKNV.findOne({ _id: user._id }).populate('MaNV').exec();
            UserInf = cus.MaNV
            this.id = user.MaNV

        }
        if (role === 'customer') {
            let cus = await TKKH.findOne({ _id: user._id }).populate('MaKH').exec();
            UserInf = cus.MaKH
            this.id = user.MaKH
        }
        this.fullName = UserInf.HoTen
        const splitFull = this.fullName.split(' ');
        if (splitFull.length === 1) {
            this.firstName = this.fullName
        }
        if (splitFull.length > 1) {
            this.firstName = splitFull[splitFull.length - 1];
            this.lastName = splitFull[0];
        }
        this.img = UserInf.Avatar
        this.gender = UserInf.GioiTinh
        this.username = user.TenDangNhap

    }
    async getData() {
        const data = {
            id: this.id,
            firstName: this.firstName,
            fullName: this.fullName,
            lastName: this.lastName,
            img: this.img,
            username: this.username,
            emails: this.emails,
            gender: this.gender
        }
        return data;
    }
}

module.exports = new userProfile;