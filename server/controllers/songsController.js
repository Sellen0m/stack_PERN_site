const {Songs} = require('../groups/gr')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class SongsController{
    async create(req,res,next){
        try{
            const {name_sg, Groups_id, song} = req.body

            const sg = await Songs.create({name_sg, Groups_id, song})
            return res.json(sg)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req,res){
        let {Groups_id} = await req.query
        let gr;
        if(!Groups_id){
            gr = await Songs.findAll()
        }
        if(Groups_id){
            gr = await Songs.findAll({where:{Groups_id}})
        }

        return res.json(gr)
    }

    async getOne(req,res){
        const {id} = req.params
        const sg = await Songs.findOne({
            where: {id}
        })
        return res.json(sg)
    }

    // Изменить имя
    async updateName(req, res, next){
        try{
            const {id} = req.params
            const {name_sg} = req.body
            const updatedName = await Songs.update(
                {name_sg},
                {where:{id}}
            )
            return res.json(updatedName)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    // Изменить Песню
    async updateSong(req, res, next){
        try{
            const {id} = req.params
            const {song} = req.body

            const updatedSg = await Songs.update(
                {song},
                {where:{id}}
            )
            return res.json(updatedSg)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    //Изменить группу
    async updateGroup(req, res, next){
        try{
            const {id} = req.params
            const {Groups_id} = req.body
            const updatedGroup = await Songs.update(
                {Groups_id},
                {where:{id}}
            )
            return res.json(updatedGroup)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req,res){
        const {id} = req.params
        const songs = await Songs.destroy(
            {where: {id}}
        )
        return res.json(songs)
    }
}

module.exports = new SongsController()