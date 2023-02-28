import PostService from "./PostService.js";

class PostController {
  async create(req, res) {
    try {
      const post = await PostService.create(req.body);
      res.json({
        message: "post created",
        body: post,
      });
    } catch (e) {
      res.status(500).json({
        message: "Post error",
        body: e,
      });
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll();
      return res.json({
        message: "all posts",
        body: posts,
      });
    } catch (e) {
      res.status(500).json({
        message: "failed to get all",
        body: e,
      });
    }
  }

  async getOne(req, res) {
    try {
      const post = await PostService.getOne(req.params.id);
      return res.json({
        message: `get one post with id: ${req.params.id}`,
        body: post,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async updatePost(req, res) {
    try {
      const updatedPost = await PostService.updatePost(req.body);
      return res.json({
        message: "post updated successfully",
        body: updatedPost,
      });
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "ID not specified" });
      }
      const post = await PostService.deletePost(id);
      return res.json({
        message: "deleted successfully",
        body: post,
      });
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new PostController();
