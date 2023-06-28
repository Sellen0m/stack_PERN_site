const {Genres} = require('../groups/gr')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class GenresController{
    async create(req,res){
        const {name_gn} = req.body
        const genre = await Genres.create({name_gn})
        return res.json(genre)
        
    }

    async getAll(req,res){
        const genre = await Genres.findAll()
        return res.json(genre)
    }

    async getOne(req,res){
        const {id} = req.params
        const gr = await Genres.findOne({
            where: {id}
        })
        return res.json(gr)
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {name_gn} = req.body
            const updatedGroup = await Genres.update(
                {name_gn},
                {where: { id }}
            )
            return res.json(updatedGroup);
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res) {
        const {id} = req.params
        const group = await Genres.destroy(
            {where: { id }}
        )
        return res.json(group)
    }
}

module.exports = new GenresController()