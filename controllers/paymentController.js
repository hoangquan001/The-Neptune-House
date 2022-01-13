const san_pham = require("../models/SanPham");
const HOA_DON = require("../models/HoaDon");
const CT_HOA_DON = require("../models/CTHoaDon");
var nodemailer = require('nodemailer');
var ejs = require('ejs');
class PaymentController {
    //[GET]
    async index(req, res, next) {
        const cart = req.session.cart;
        const listProducts = []
        let TongTien = 0;
        for (var i = 0; i < cart.items.length; i++) {

            const doc = await san_pham.findById(cart.items[i].MaSP).exec();
            listProducts.push({
                product: doc,
                numItem: cart.items[i].SoLuong,
            })
            TongTien += doc.GiaBan * cart.items[i].SoLuong
        }
        if (req.session.message === 'paymentsuccess') {
            res.locals.message = req.session.message
            req.session.message = null
        }
        res.render('payment', {
            listProducts: listProducts,
            TongTien: TongTien,
            title: 'Thanh toán'
        })
        next()
    }
    async Order(req, res) {
        // console.log(req.body)
        let TongTien = 0
        const HoaDon = {
            MaKH: req.user.MaKH,
            HoTen: req.body.HoTen,
            Email: req.body.Email,
            SDT: req.body.SDT,
            DiaChi: req.body.DiaChi
        }
        const DB_HoaDon = new HOA_DON(HoaDon)
        await DB_HoaDon.save()
        const cart = req.session.cart;

        let List = []
        for (var i = 0; i < cart.items.length; i++) {

            const SPData = await san_pham.findById(cart.items[i].MaSP)

            let CTHD = {

                SoLuong: cart.items[i].SoLuong,
                ThanhTien: cart.items[i].TongTien,
                Sugar: req.body[`SUGAR${i}`],
                Size: req.body[`SIZE${i}`],
                MaSP: cart.items[i].MaSP,
                MaHD: DB_HoaDon._id,
                TenSP: SPData.TenSP
            }
            List.push(CTHD)
            let DB_CTHD = new CT_HOA_DON(CTHD)
            await DB_CTHD.save()
            TongTien += cart.items[i].TongTien
        }

        DB_HoaDon.TongTien = TongTien
        await DB_HoaDon.save()

        //#gửi mail
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "theneptunehouse111@gmail.com",
                pass: "theneptune111"
            }
        })
        const data = await ejs.renderFile("views/partials/OderMail.ejs", { TongTien: TongTien, List: List })
        var mainOptions = {
            from: "The Neptune House",
            to: req.body.Email,
            subject: "Đặt hàng thành công",
            text: "text",
            html: data

        };
        transporter.sendMail(mainOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
        });

        req.session.cart = null;
        req.session.message = 'paymentsuccess';
        res.redirect('back')

    }
}

module.exports = new PaymentController;