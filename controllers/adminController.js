
const Products_M = require("../models/SanPham");
const Staff_M = require("../models/NhanVien");
const Detail_M = require("../models/CTHoaDon");
class AdminController {

  //Quan lý nhân viên
  //[GET]
  async staff(req, res) {


    const allemployee = await Staff_M.find({})
    res.render('Staff', {
      staffs: allemployee, title: 'Manage Products',
      layout: "layouts/staff",
    })
  }


  admin(req, res) {
    res.redirect('admin/product')
  }

  async deleteStaff(req, res) {
    const id = req.params.id
    await Staff_M.findByIdAndRemove(id)
    res.redirect("/admin/staff")
  }



  async addStaff(req, res) {

    const newStaff = {
      HoTen: req.body.Name,
      NgaySinh: req.body.birth,
      DiaChi: req.body.Address,
      SDT: req.body.PhoneNumber,
      LoaiNV: req.body.Position,
      Luong: req.body.Salary,
      NgayLamViec: req.body.dateStart,
    }
    if (req.body.img) newStaff.Avatar = req.body.img
    //console.log(newStaff)
    const Nstaff = new Staff_M(newStaff)
    Nstaff.save(
      function (err) {
        if (!err) {
          res.redirect("/admin/staff")

        }

        else res.send(err)
      }
    )

  }

  searchStaff(req, res) {

    Staff_M.find({}, function (err, docs) {

      const data = []
      const stringSearch = req.query.key
      for (let i = 0; i < docs.length; i++) {
        const check = docs[i].HoTen
          .toUpperCase()
          .includes(stringSearch.toUpperCase())
        if (check === true) {
          data.push(docs[i])
        }
      }
      if (docs.length == 0)
        return res.redirect('home');

      res.render('Staff', {
        staffs: data, title: 'Manage Products',
        layout: "layouts/staff",
      })
    });
  }


  async editStaff(req, res) {

    const newdata = {
      _id: req.params.id,
      HoTen: req.body.hoten,
      DiaChi: req.body.diachi,
      SDT: req.body.sdt,
      Luong: req.body.luong
    }
    if (req.body.img) newdata.Avatar = req.body.img

    await Staff_M.findByIdAndUpdate(req.params.id, newdata)
    res.redirect("/admin/staff")
  }


  //xư lý yêu cầu về sản phẩm
  async products(req, res) {
    const allpro = await Products_M.find({})
    res.render('Admin', {
      products: allpro,
      title: 'Manage Products',
      layout: "layouts/admin",
    })
  }
  async deletepro(req, res) {

    const id = req.params.id

    await Products_M.findByIdAndRemove(id)
    await Detail_M.findOneAndRemove({ MaSP: id })
    res.redirect("/admin/product")
  }
  async addpro(req, res) {

    const newpro = {
      GiaBan: req.body.gia,
      MoTa: req.body.mota,
    }
    if (req.body.ten != "") newpro.TenSP = req.body.ten
    if (req.body.loai != "") newpro.Image = req.body.loai
    if (req.body.img) newpro.Image = req.body.img

    const Nproduct = new Products_M(newpro)
    Nproduct.save(function (err) {
      res.redirect("/admin/product")
    })

  }

  async editPro(req, res) {

    const newdata = {
    }

    if (req.body.tensp != "") newdata.TenSP = req.body.tensp
    if (req.body.loai != "") newdata.Image = req.body.loai
    if (req.body.img != "") newdata.Image = req.body.img
    if (req.body.giasp != "") newdata.giasp = req.body.giasp
    await Products_M.findByIdAndUpdate(req.params.id, newdata)
    res.redirect("/admin/product")
  }

  searchPro(req, res) {

    Products_M.find({}, function (err, docs) {

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
      res.render('Admin', {
        products: data,
        title: 'Manage Products',
        layout: "layouts/admin",
      })

    });

  }

}

module.exports = new AdminController;
