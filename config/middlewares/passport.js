const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const CusM = require('../../models/TaiKhoan_KH')
const StaffM = require('../../models/TaiKhoan_NV')
const AdminM = require('../../models/TaiKhoan_Admin')
const khach_hang = require('../../models/KhachHang')

const bcrypt = require('bcrypt');
const saltRounds = 10
module.exports = app => {

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
    async (username, password, done) => {

      try {

        const cus = await CusM.findOne({ TenDangNhap: username })
        const admin = await AdminM.findOne({ TenDangNhap: username })
        const staff = await StaffM.findOne({ TenDangNhap: username })
        let phanquyen = 'customer'
        if (!cus) {
          if (!admin) {
            if (!staff) {
              return done(null, false, { message: 'Sai tên đăng nhập hoặt mật khẩu' });
            } else phanquyen = 'staff'
          }
          else phanquyen = 'admin'
        }

        if (phanquyen === 'customer') {

          const chellangePass = await bcrypt.compare(password, cus.MatKhau)
          if (cus.XacThuc === false)
            return done(null, false, { message: 'Tài khoản chưa xác thực' });
          if (chellangePass)
            return done(null, cus, { phanquyen: phanquyen })
        }


        if (phanquyen === 'staff') {
          const chellangePass = await bcrypt.compare(password, staff.MatKhau)

          if (chellangePass)
            return done(null, staff, { phanquyen: phanquyen })

        }

        if (phanquyen === 'admin') {
          const chellangePass = await bcrypt.compare(password, admin.MatKhau)
          if (chellangePass)
            return done(null, admin, { phanquyen: phanquyen })
        }


        return done(null, false, { message: 'Mật khẩu không chính xác' });

      } catch (error) {
        return done(error)
      }
    }
  ));


  passport.use(
    'local-signup',
    new LocalStrategy({ passReqToCallback: true }, async function (req, username, password, done) {

      try {
        const cus = await CusM.findOne({ TenDangNhap: username })
        const admin = await AdminM.findOne({ TenDangNhap: username })
        const staff = await StaffM.findOne({ TenDangNhap: username })
        if (cus || admin || staff) {
          return done(null, false, {
            message: 'Tên đăng nhập đã tồn tại!'
          });
        }
        const name = req.body.name
        const sex = req.body.sex
        let date = new Date()

        const passHash = await bcrypt.hash(password, saltRounds)
        const TaiKhoan = {
          TenDangNhap: username,
          MatKhau: passHash,
          NgayTao: date

        }
        const newAcc = new CusM(TaiKhoan)
        const newKH = new khach_hang({ HoTen: name, GioiTinh: sex })
        newKH.save()
        newAcc.MaKH = newKH._id;
        newAcc.save()
        // save the user
        return done(null, newAcc);
      } catch (error) {
        return done(error)
      }
    })
  );


  passport.serializeUser(async (user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {

    try {
      // const us = await userM.findOne({ TenDangNhap: user.TenDangNhap });
      // const ad = await StaffM.findOne({ TenDangNhap: user.TenDangNhap });
      done(null, user)
    } catch (error) {
      return done(new Error('Error'));
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());
}