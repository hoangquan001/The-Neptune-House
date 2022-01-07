const TKKH = require("../models/TaiKhoan_KH");
var nodemailer = require('nodemailer');
const pport = require("passport");
var ejs = require('ejs');
class SignupController {
    //[GET]
    index(req, res) {
        //121212/
        res.locals.message = req.session.message;
        req.session.message = null;
        res.render('Signup', { title: 'Đăng kí' })

    }
    async Signup(req, res, next) {
        pport.authenticate("local-signup", {
            successReturnToOrRedirect: "/",
            failureRedirect: "/signup",
            failureFlash: true
        }, async (err, user, info) => {
            if (err) {
                return res.redirect('/notfound404')
            }
            if (!user) {
                req.session.message = "signupfailer"
                return res.redirect('back')
            }

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
            //121212
            const data = await ejs.renderFile("views/partials/verifymail.ejs", { username: req.body.username })
            var mainOptions = {
                from: "The Neptune House",
                to: req.body.email,
                subject: "Kích hoạt tài khoản",
                text: "text",
                html: data

            };
            transporter.sendMail(mainOptions, (err, info) => {
                if (err) {
                    console.log(err);
                }
            });
            req.session.message = 'signupsuccess'
            return res.redirect('back')

        })(req, res, next);
    }
    async getVerifyEmail(req, res, next) {
        const ID = req.params.id;
        const user = await TKKH.findOne({ TenDangNhap: ID })
        if (!user) return next()
        user.XacThuc = true;
        await user.save();
        res.redirect('/home')
    }
}

module.exports = new SignupController; 