const Sequelize = require('sequelize')
const database = require('./db');

const Artifact = database.define('Artifact',{
    id:{
        type:Sequelize.TEXT,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: Sequelize.STRING
    },
    description:{
        type:Sequelize.TEXT
    },
    imagePath:{
        type:Sequelize.TEXT
    },
    foundPlace:{
        type:Sequelize.TEXT
    },
    age:{
        type:Sequelize.TEXT
    },
    historicalContext:{
        type:Sequelize.TEXT
    },
    whoFound:{
        type:Sequelize.TEXT
    },
    coordinates:{
        type:Sequelize.TEXT
    },
    dimensions: {
        type:Sequelize.TEXT
    },
    weight: {
        type:Sequelize.TEXT
    },
    texture: {
        type:Sequelize.TEXT
    },
    materiaComposition: {
        type:Sequelize.TEXT
    },
    historicalPeople: {
        type:Sequelize.TEXT
    },
    origin_or_utility: {
        type:Sequelize.TEXT
    },
    socialRelevance: {
        type:Sequelize.TEXT
    }
})
module.exports = Artifact;