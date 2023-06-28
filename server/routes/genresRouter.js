const Router = require('express')
const router = new Router()
const genresController = require('../controllers/genresController')
const chekRoleMiddleware = require('../middleware/chekRoleMiddleware')

//create
router.post('/',chekRoleMiddleware('ADMIN'),genresController.create)

//read
router.get('/',genresController.getAll)
router.get('/:id',genresController.getOne)

//update
router.put('/:id', chekRoleMiddleware('ADMIN'), genresController.update)

//delete
router.delete('/:id', chekRoleMiddleware('ADMIN'), genresController.delete)

module.exports = router