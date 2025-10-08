const artifactController = require("../controllers/artifactController");
const artifactPlaceController = require("../controllers/artifactPlaceController");

exports.create = async (req, res) => {
    data = req.body;
    if (true) {
        artifact = await artifactController.create(data);
        return res.status(201).json(artifact);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = async (req, res) => {
    data = req.body;
    filter = {
        name: data.name ? data.name : null,
        description: data.description ? data.description : null,
        imagePath: data.imagePath ? data.imagePath : null,
        foundPlace: data.foundPlace ? data.foundPlace : null,
        age: data.age ? data.age : null,
        historicalContext: data.historicalContext ? data.historicalContext : null,
        whoFound: data.whoFound ? data.whoFound : null,
        coordinates: data.coordinates ? data.coordinates : null,
        weight: data.weight ? data.weight : null,
        texture: data.texture ? data.texture : null,
        materiaComposition: data.materiaComposition ? data.materiaComposition : null,
        historicalPeople: data.historicalPeople ? data.historicalPeople : null,
        origin_or_utility: data.origin_or_utility ? data.origin_or_utility : null,
        socialRelevance: data.socialRelevance ? data.socialRelevance : null,
        created_at: data.created_at ? data.created_at : null,
        updated_at: data.updated_at ? data.updated_at : null,
    }
    artifact.keys(filter).forEach(key => {
        if (filter[key] == null) {
            delete filter[key];
        }

    });

    if (req.query.filter == undefined) {

        //We should create the 'filter' param to check if have filters and later get
        //all the params to filter the response
        console.log("No filter");
        //rules
        if (true) {
            artifacts = await artifactController.select(null, res);
            return res.status(200).json(artifacts);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            artifacts = await artifactController.select(filter, res);
            return res.status(200).json(artifacts);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.getOne = async (req, res) => {
    const id = req.params.id;
    const response = await artifactController.selectOne({ id: id }, null);
    if (response) {
        return res.status(200).json(response);
    } else {
        return res.status(404).json({ "message": "artifact not found" });
    }
}

exports.update = async (req, res) => {
    data = req.body;
    data.id = req.params.id;
    //rules
    if (true) {
        artifact = await artifactController.update(data);
        return res.status(200).json(artifact);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}