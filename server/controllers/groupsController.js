const {Groups} = require('../groups/gr')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class GroupsController{
    async create(req,res,next){
        try{
            const {name_gr, description_gr, Genres_id} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const gr = await Groups.create({name_gr, description_gr, Genres_id, img: fileName})
            return res.json(gr)
        }
        catch (e){
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req,res){
        let {Genres_id} = await req.query
        let gr;
        if(!Genres_id){
            gr = await Groups.findAll()
        }
        if(Genres_id){
            gr = await Groups.findAll({where:{Genres_id}})
        }
        return res.json(gr)
    }

    async getOne(req,res){
        const {id} = req.params
        const gr = await Groups.findOne({
            where: {id}
        })
        return res.json(gr)
    }

   // Изменить имя
   async updateName(req, res, next){
        try{
            const {id} = req.params
            const {name_gr} = req.body
            const updatedName = await Groups.update(
                {name_gr},
                {where:{id}}
            )
            return res.json(updatedName)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    // Изменить изображение
    async updatePic(req, res, next){
        try{
            const {id} = req.params
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const updatedPic = await Groups.update(
                {img: fileName},
                {where:{id}}
            )
            return res.json(updatedPic)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    // Изменить описание
    async updateDescription(req, res, next){
        try{
            const {id} = req.params
            const {description_gr} = req.body
            const updatedGroup = await Groups.update(
                {description_gr},
                {where:{id}}
            )
            return res.json(updatedGroup)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    // Изменить жанр группы
    async updateGenre(req, res, next){
        try{
            const {id} = req.params
            const {Genres_id} = req.body
            const updateGenreGroup = await Groups.update(
                {Genres_id},
                {where:{id}}
            )
            return res.json(updateGenreGroup)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req,res){
        const {id} = req.params
        const groups = await Groups.destroy(
            {where: {id}}
        )
        return res.json(groups)
    }

}

module.exports = new GroupsController()