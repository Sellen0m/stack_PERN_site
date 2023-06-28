const Router = require('express')
const router = new Router()

const genresRouter = require('./genresRouter')
const groupsRouter = require('./groupsRouter')
const songsRouter = require('./songsRouter')
const userRouter = require('./userRouter')

router.use('/genres',genresRouter)
router.use('/groups',groupsRouter)
router.use('/songs',songsRouter)
router.use('/user',userRouter)


module.exports = router