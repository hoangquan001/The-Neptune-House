// const khach_hang = require("../models/KhachHang");
const TKKH = require("../models/TaiKhoan_KH");
const TKNV = require("../models/TaiKhoan_NV");
const san_pham = require("../models/SanPham");
const profile = require("../models/Profile");
// const nhanvien = require("../models/NhanVien");

const pport = require("passport");
class HomeController {
    //[GET]
    async index(req, res) {
        const all = await san_pham.find({})
        res.locals.signup = req.session.signup
        req.session.signup = null

        res.render('home', {
            data: all,
            layout: 'layouts/mainHome',
            title: 'Trang Chủ'
        })
    }
    async home(req, res) {
        res.redirect("/home")
    }


    async getLogin(req, res, next) {

        pport.authenticate('local-signin', {
            successReturnToOrRedirect: "/",
            failureRedirect: "/",
            failureFlash: true
        }, async (err, user, info) => {
            if (err) {
                return res.redirect('/notfound404')
            }
            if (!user) {
                req.session.signup = info.message
                return res.redirect('back')
            }
            req.logIn(user, async function (err) {

                req.user = user

                req.session.role = info.phanquyen

                await profile.setData(user, info.phanquyen)

                await profile.getData()
                    .then(data => {
                        req.session.user = data
                    })

                if (req.session.role == 'admin') {
                    return res.redirect('/admin');
                }
                if (req.session.role == 'staff') {
                    return res.redirect('/employee');
                }
                return res.redirect('back');

            });
        })(req, res, next);

    }


    getLogout(req, res, next) {
        if (req.session.user) {
            req.session.destroy();
        }
        req.logout();
        res.redirect("back");
    }



    Search(req, res) {

        san_pham.find({}, function (err, docs) {

            const data = []
            const stringSearch = req.query.key
            for (let i = 0; i < docs.length; i++) {
                const check = docs[i].TenSP
                    .toUpperCase()
                    .includes(stringSearch.toUpperCase())
                if (check === true) {
                    data.push(docs[i])
                }
            }
            if (docs.length == 0)
                return res.redirect('home');
            res.render('home', {
                data: data,
                layout: 'layouts/mainHome',
                title: 'Trang Chủ'
            });

        });

    }


    addCart(req, res) {

        req.session.cart = req.body

        res.send('null')
    }

}

module.exports = new HomeController;