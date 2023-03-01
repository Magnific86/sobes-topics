import Post from "./Post.js";

class PostService {
  async create(post) {
    const createdPost = await Post.create(post);
    return createdPost;
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }

  async getOne(question) {
    if (!question) {
      throw new Error("question not specified");
    }
    const post = await Post.find(question);
    return post;
  }

  async findCateg(category) {
    console.log("IN CATEG FUNC", category);
    if (!category) {
      throw new Error("category not specified");
    }
    const posts = await Post.find({ category: category });
    console.log("FINDED POSTS AT CATEG", posts);
    return posts;
  }

  async updatePost(post) {
    if (!post._id) {
      throw new Error("ID not specified");
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }

  async deletePost(id) {
    if (!id) {
      throw new Error("ID not specified");
    }
    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  }
}

export default new PostService();
