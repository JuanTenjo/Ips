const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)

      // cb(null, `${file.fieldname}-${uniqueSuffix}`)

      //cb(null,`${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
      cb(null,`${file.fieldname}-${uniqueSuffix}.${file.mimetype.split('/')[1]}`)
    }
  })
  
const upload = multer({ storage })

module.exports = upload