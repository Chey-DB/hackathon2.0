const { Router } = require('express');

const authenticator = require("../middleware/authenticator");
const diaryController = require('../controllers/diary');

const diaryRouter = Router();

diaryRouter.get("/", authenticator, diaryController.index);
diaryRouter.post("/", diaryController.create);
diaryRouter.get("/:id", diaryController.show);
diaryRouter.patch("/:id", diaryController.update);
diaryRouter.delete("/:id", diaryController.destroy);

module.exports = diaryRouter;
