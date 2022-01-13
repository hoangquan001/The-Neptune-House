const infoUser_M = require("../models/KhachHang");
const Profile_M = require("../models/Profile");
const changeAcc_M = require("../models/TaiKhoan_KH");
const bcrypt = require("bcrypt")
const saltRounds = 10
class ProfileController {
    //[GET]
    async inforUser(req, res, next) {
        const Id = req.params.id;
        const data = await infoUser_M.findById(Id).exec();
        if (!data) return next()

        res.render('profile', {
            inforUser: data, title: 'Change Information User',
            layout: "layouts/main",
        })

    }
    async editInfo(req, res) {

        const IdEdit = req.params.id
        const modifile = new Date()
        const newdata = {

            HoTen: req.body.newname,
            NgaySinh: req.body.newbirth,
            GioiTinh: req.body.newsex,
            DiaChi: req.body.newaddr,
            SDT: req.body.newphone,
        }
        if (req.body.newpass != "") {
            const passHashed = await bcrypt.hash(req.body.newpass, saltRounds)
            const newacc = {
                MatKhau: passHashed,
                NgayTao: modifile
            }
            await changeAcc_M.findByIdAndUpdate(req.user._id, newacc)
        }
        await Profile_M.setData(req.user, req.session.role)
        await Profile_M.getData()
            .then(data => {
                req.session.user = data
            })

        await infoUser_M.findByIdAndUpdate(IdEdit, newdata)

        res.redirect(`/profile/${IdEdit}`)
    }
    async editInfo(req, res) {

        const IdEdit = req.params.id
        const modifile = new Date()
        const newdata = {

            HoTen: req.body.newname,
            NgaySinh: req.body.newbirth,
            GioiTinh: req.body.newsex,
            DiaChi: req.body.newaddr,
            SDT: req.body.newphone,
        }
        const passHashed = await bcrypt.hash(req.body.newpass, saltRounds)
        const newacc = {
            MatKhau: passHashed,
            NgayTao: modifile
        }

        await Profile_M.setData(req.user, req.session.role)
        await Profile_M.getData()
            .then(data => {
                req.session.user = data
            })

            //121212
        await changeAcc_M.findByIdAndUpdate(req.user._id, newacc)
        await infoUser_M.findByIdAndUpdate(IdEdit, newdata)
        res.redirect(`/profile/${IdEdit}`)
    }

}


module.exports = new ProfileController;