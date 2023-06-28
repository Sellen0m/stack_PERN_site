const Router = require('express')
const router = new Router()
const groupsController = require('../controllers/groupsController')
const checkRole = require('../middleware/chekRoleMiddleware')

//Create
router.post('/', checkRole('ADMIN'),groupsController.create)

//Read
router.get('/',groupsController.getAll)
router.get('/:id',groupsController.getOne)

// Update
router.put('/:id/Name', checkRole('ADMIN'), groupsController.updateName)
router.put('/:id/Pic', checkRole('ADMIN'), groupsController.updatePic)
router.put('/:id/Des', checkRole('ADMIN'), groupsController.updateDescription)
router.put('/:id/Genre', checkRole('ADMIN'), groupsController.updateGenre)

// Delete
router.delete('/:id',checkRole('ADMIN'), groupsController.delete)


module.exports = router