const express = require('express');
const auth = require('../middleware/auth')();
const router = express.Router();
// const multer = require('multer');
// const { storage } = require('../cloudinary');
const { generateUrl, deleteLink, renewLink, hosting, track} = require('../controllers/admin');
// const { ValidateQuery } = require('../middleware/validator');
// const upload = multer({ storage });

router.post('/generateUrl',auth.authenticate(), generateUrl)
.post('/host',hosting)
.get('/track/:queryid',track)
.post('/delete',auth.authenticate(), deleteLink)
.post('/renew',auth.authenticate(), renewLink)


// .post('/parse', auth.authenticate(), upload.array('invoices'), secureparser)
    // .post('/noparse', upload.array('invoices'), nosaveparser)
    // .post('/getJson', auth.authenticate(), refinedSearch)
    // .get('/userhistory', auth.authenticate(), allQueries)
    // .post('/deletehistory', auth.authenticate(), deleteQuery)



    // .post('/editUser', auth.authenticate())
    // router.post('/signup', ValidateUser, signup, login);
    // router.post('/login', passport.authenticate("local"), login);

// router.post('/secret', auth.authenticate(), secret)
module.exports = router;