
const multer = require("multer");
const fs = require("fs");
const imageModel = require('../../models/Image')
module.exports = app => {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })

    var upload = multer({ storage: storage })

    app.post("/uploadphoto", upload.single('myImage'), (req, res) => {

        var img = fs.readFileSync(req.file.path);
        console.log(req.file.path)
        var encode_img = img.toString('base64');
        var final_img = {
            img: {
                data: Buffer.from(encode_img, 'base64'),
                contentType: req.file.mimetype

            }
        };
        imageModel.create(final_img, function (err, result) {
            if (err) {
                res.send('err');
            }
            else {
                fs.unlinkSync(req.file.path)
                res.send(result._id)
            }
        })
    })

    app.get('/uploadphoto/:id', async function (req, res) {
        var ObjectId = require('mongoose').Types.ObjectId;
        const ID = req.params.id;
        if (!ObjectId.isValid(ID)) {
            return res.send("not iamge")
        } //true
        const item = await imageModel.findOne({ _id: ID })
        if (item) {
            res.contentType(item.img.contentType);
            res.send(item.img.data);

        } else {
            res.send("not iamge")
        }
    });
}