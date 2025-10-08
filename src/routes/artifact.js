const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const multer = require("multer");
const path = require("path");
const artifactService = require("../services/artifactService");

const storage = multer.diskStorage({
    destination: './public/images/artifacts/',
    filename: function (req, file, cb) {
        const id = req.body.id;
        cb(null, id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('image'), artifactService.create);
router.get("/", artifactService.select);
router.get("/:id", artifactService.getOne);
router.put("/:id", artifactService.update);
//srouter.delete("/:id", artifactService.delete)

module.exports = router;