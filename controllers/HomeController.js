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

        let page = 1
        const item_per_page = 12
        if (req.query.page) {
            page = req.query.page
            page = page < 1 ? page + 1 : page
        }

        const all = await san_pham.find({})
            .skip((page - 1) * item_per_page)
            .limit(item_per_page)
        let numPage = parseInt((await san_pham.find({})).length) / item_per_page
        numPage = numPage - parseInt(numPage) === 0 ? numPage : numPage + 1

        res.locals.login = req.session.signup
        req.session.signup = undefined;
        res.render('Home', {
            data: all,
            layout: 'layouts/mainHome',
            title: 'Trang Chủ',
            numPage: numPage,
            curPage: page

        })

    }
    async home(req, res) {
        if (req.query.page) {
            return res.redirect(`/home?page=${req.query.page}`)
        }
        res.redirect(`/home`)
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
                return res.redirect('/')
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
            if (!stringSearch) return res.redirect('/')
            for (let i = 0; i < docs.length; i++) {
                const check = docs[i].TenSP
                    .toUpperCase()
                    .includes(stringSearch.toUpperCase())
                if (check === true) {
                    data.push(docs[i])
                }
            }
            if (docs.length == 0)
                return res.redirect('/home');
            res.render('Home', {
                data: data,
                layout: 'layouts/mainHome',
                title: 'Trang Chủ',
                numPage: 0,
                curPage: 0
            });

        });

    }


    addCart(req, res) {

        req.session.cart = req.body

        res.send('null')
    }

}

module.exports = new HomeController;