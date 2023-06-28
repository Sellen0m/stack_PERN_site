const {DataTypes} = require('sequelize')

const sequelize = require("../db")

const User = sequelize.define('user', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email: {type:DataTypes.STRING, unique:true},
    password: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: "USER"},
})

// таблица жанров групп
const Genres = sequelize.define('Genres', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name_gn: {type:DataTypes.STRING, unique:true}
})

// таблица групп
const Groups = sequelize.define('Groups', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name_gr: {type:DataTypes.STRING, unique: true, allowNull: false},
    img: {type:DataTypes.STRING, allowNull: false},
    description_gr: {type:DataTypes.STRING(2500)},
    Genres_id: {type:DataTypes.INTEGER}
})

// таблица песен
const Songs = sequelize.define('Songs', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name_sg: {type:DataTypes.STRING, unique: true, allowNull: false},
    song: {type:DataTypes.STRING},
    Groups_id: {type:DataTypes.INTEGER}
})

// у жанров много групп
Genres.hasMany(Groups, {
    foreignKey: 'Genres_id',
    source: 'id'
})
Groups.belongsTo(Genres,{
    foreignKey: 'Genres_id',
    targetKey: 'id'
})

// у групп много песен
Groups.hasMany(Songs, {
    foreignKey: 'Groups_id',
    source: 'id'
})
Songs.belongsTo(Groups,{
    foreignKey: 'Groups_id',
    targetKey: 'id'
})

// у жанров много песен
Genres.hasMany(Songs, {
    foreignKey: 'Genres_id',
    source: 'id'
})
Songs.belongsTo(Genres,{
    foreignKey: 'Genres_id',
    targetKey: 'id'
})

module.exports = {
    User, Genres, Groups, Songs
}