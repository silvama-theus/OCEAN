const Artifact = require("../models/mArtifact")

exports.create = async (data) => {
    response = await Artifact.create({
        id: data.id,
        name: data.name,
        description: data.description,
        imagePath: data.imagePath,
        foundPlace: data.foundPlace,
        age: data.age,
        historicalContext: data.historicalContext,
        whoFound: data.whoFound,
        coordinates: data.coordinates,
        dimensions: data.dimensions,
        weight: data.weight,
        texture: data.texture,
        materiaComposition: data.materiaComposition,
        historicalPeople: data.historicalPeople,
        origin_or_utility: data.origin_or_utility,
        socialRelevance: data.socialRelevance,
    });
    return response;
}

exports.bulkCreate = async (data) => {
    response = await Artifact.bulkCreate(data);
    return response;
}

exports.select = async (filters = null, res) => {
    let response;
    if (filters == null) {

        response = await Artifact.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await Artifact.findAll({
            where: filters
        });
        return response;
    }

}

exports.selectOne = async (filters = null, res) => {
    response = await Artifact.findOne({
        where: filters
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await Artifact.findByPk(data.id);

    tochange.name = data.name ? data.name : tochange.name;
    tochange.description = data.description ? data.description : tochange.description;
    tochange.imagePath = data.imagePath ? data.imagePath : tochange.imagePath;
    tochange.foundPlace = data.foundPlace ? data.foundPlace : tochange.foundPlace;
    tochange.age = data.age ? data.age : tochange.age;
    tochange.historicalContext = data.historicalContext ? data.historicalContext : tochange.historicalContext;
    tochange.whoFound = data.whoFound ? data.whoFound : tochange.whoFound;
    tochange.coordinates = data.coordinates ? data.coordinates : tochange.coordinates;
    tochange.dimensions = data.dimensions ? data.dimensions : tochange.dimensions;
    tochange.weight = data.weight ? data.weight : tochange.weight;
    tochange.texture = data.texture ? data.texture : tochange.texture;
    tochange.materialComposition = data.materialComposition ? data.materialComposition : tochange.materialComposition;
    tochange.historicalPeople = data.historicalPeople ? data.historicalPeople : tochange.historicalPeople;
    tochange.origin_or_utility = data.origin_or_utility ? data.origin_or_utility : tochange.origin_or_utility;
    tochange.socialRelevance = data.socialRelevance ? data.socialRelevance : tochange.socialRelevance;

    response = await tochange.save();
    return response;
}

exports.delete = async (data, res) => {
    return Artifact.destroy({
        where: {
            id: data.id
        }
    });
}