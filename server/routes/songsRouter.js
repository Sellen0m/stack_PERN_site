const Router = require('express')
const songsController = require('../controllers/songsController')
const chekRoleMiddleware = require('../middleware/chekRoleMiddleware')
const router = new Router()

// Create
router.post('/',chekRoleMiddleware('ADMIN'),songsController.create)
//Read
router.get('/',songsController.getAll)
router.get('/:id',songsController.getOne)
//Update
router.put('/:id/Name', chekRoleMiddleware('ADMIN'), songsController.updateName)
router.put('/:id/Song', chekRoleMiddleware('ADMIN'), songsController.updateSong)
router.put('/:id/Group', chekRoleMiddleware('ADMIN'), songsController.updateGroup)
//Delete
router.delete('/:id',chekRoleMiddleware('ADMIN'), songsController.delete)

module.exports = router