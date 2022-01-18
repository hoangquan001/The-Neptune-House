const Detail_M = require("../models/CTHoaDon");
const Order_M = require("../models/HoaDon");
var nodemailer = require('nodemailer');
var ejs = require('ejs');
class EmployeeController {
  //[GET]

  async employee(req, res) {
    let page = 1
    const item_per_page = 4
    if (req.query.page) {
      page = req.query.page
      page = page < 1 ? page + 1 : page
    }


    let data = []
    const allOrder = await Order_M.find({})
      .skip((page - 1) * item_per_page)
      .limit(item_per_page)
      .populate('MaKH').exec()

    for (var i = 0; i < allOrder.length; i++) {

      let allDetail = await Detail_M.find({ MaHD: allOrder[i]._id }).populate('MaSP')

      data.push({
        DonHang: allOrder[i],
        DeTail: allDetail
      })
    }


    let numPage = parseInt((await Order_M.find({})).length) / item_per_page
    numPage = numPage - parseInt(numPage) === 0 ? numPage : numPage + 1
    res.render('Employee', {
      orders: data,
      layout: 'layouts/employee',
      title: 'Quản lý hóa đơn',
      numPage: numPage,
      curPage: page
    })

  }

  async deleteOrder(req, res) {
    const id = req.params.id
    await Order_M.findByIdAndRemove(id)
    res.redirect("/employee")

  }
  async editOrder(req, res) {
    const ID = req.params.slug
    console.log(ID)
    const newdata = {
      TinhTrangDonHang: req.body.status
    }

    await Order_M.findByIdAndUpdate(ID, newdata)
    res.redirect("/employee")
  }

  async confirmOrder(req, res) {
    const Id = req.params.id
    const donhang = await Order_M.findById(Id)
    donhang.TinhTrangDonHang = "Đang giao"
    await donhang.save()
    //#gửi mail
    // var transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 587,
    //   secure: false,
    //   requireTLS: true,
    //   auth: {
    //     user: "theneptunehouse111@gmail.com",
    //     pass: "theneptune111"
    //   }
    // })

    // const data = await ejs.renderFile("views/partials/OderMail.ejs", { TongTien: TongTien, List: List, })
    // var mainOptions = {
    //   from: "The Neptune House",
    //   to: donhang.Email,
    //   subject: "Đặt hàng thành công",
    //   text: "text",
    //   html: data

    // };
    // transporter.sendMail(mainOptions, (err, info) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });

    res.redirect("/employee")
  }


  async statistical(req, res) {


    await Order_M.aggregate([
      {
        $group: {
          _id: "$NgayLap",
          ThuNhap: { $sum: '$TongTien' },
          SoLuong: { $sum: 1 }
        }
      },

    ]).
      exec((err, locations) => {

        let data = []
        let none = []
        for (let i = 0; i < locations.length; i++) {
          var d = new Date(locations[i]._id).setHours(0, 0, 0, 0)
          if (none.indexOf(d) < 0) none.push(d)
          data.push({
            time: d,
            ThuNhap: locations[i].ThuNhap,
            SoLuong: locations[i].SoLuong
          })
        }
        let lastData = []
        for (let i = 0; i < none.length; i++) {
          let ThuNhap = 0
          let SoLuong = 0
          for (let j = 0; j < data.length; j++) {
            if (data[j].time === none[i]) {
              ThuNhap += data[j].ThuNhap;
              SoLuong += data[j].SoLuong
            }
          }
          lastData.push({
            time: new Date(none[i]).toLocaleDateString(),
            ThuNhap: ThuNhap,
            SoLuong: SoLuong,
          })
        }
        return res.render("Statistical", { data: lastData, title: "Statistical Information", layout: "layouts/employee" })
      })
  }

}




module.exports = new EmployeeController;
