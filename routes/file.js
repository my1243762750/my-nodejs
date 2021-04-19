const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
})
const upload = multer({storage})

router.get('/', (req, res, next) => {
    fs.readdir('./public/uploads', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render('file/index', {
            fileList: result.map((item) => {
                const extname = path.extname(item);
                return {
                    url: '/uploads/' + item,
                    extname
                }
            })
        });
    })
});

// 图片/视频上传
router.post('/img/upload', upload.fields([{name: 'img', maxCount: 100}]), (req, res, next) => {
    res.send('upload successfully');
});

module.exports = router
