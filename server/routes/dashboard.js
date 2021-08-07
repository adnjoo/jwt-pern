const router = require('express').Router()
const pool = require('../db')
const authorization = require('../middleware/authorization')

router.get('/', authorization, async (req,res)=>{
    try {

        //after passing middleware, req.user has payload

    } catch (err) {
        console.log(err.message)
        res.status(500).json('server error')
    }
})

module.exports = router;