const {Router} = require('express')
const router = module.exports = Router()
router.prefix = ''

router.get('/',function (req,res) {
	res.render('index')
})