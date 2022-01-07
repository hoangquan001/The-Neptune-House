const san_pham = require("../models/SanPham");
const comment = require("../models/Comment")
class DetailController {
    
    async productDetai(req, res, next) {

        const _id = req.params.slug
        var ObjectId = require('mongoose').Types.ObjectId;
        if (!ObjectId.isValid(_id)) return next()
        const data = await san_pham.findById(_id).exec();
        if (!data) return next()
        const comments = await comment.find({ MaSP: _id }).populate('MaKH').exec();

        res.render('detail', {
            Comments: comments,
            data: data,
            title: 'Chi tiết đơn hàng'
        })



    }
    async commentBox(req, res) {
        const masp = req.params.slug
        const makh = req.params.id
        const newComment = new comment({
            MaKH: makh,
            MaSP: masp,
            Comment: req.body.boxcomment,
            Star: req.body.rating
        })
        await newComment.save()
        res.redirect('back')
    }

}

module.exports = new DetailController;