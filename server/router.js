import Router from "express";
import PostController from "./posts/PostController.js";

const router = new Router();

router.get("/posts", PostController.getAll);
router.get("/posts/:question", PostController.getChoosenCateg);
router.post("/posts", PostController.create);
router.put("/posts", PostController.updatePost);
router.delete("/posts/:id", PostController.deletePost);
router.get("/posts/filtered/:category", PostController.getChoosenCateg);

export default router;
