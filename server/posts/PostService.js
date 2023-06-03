import Post from "./Post.js"

class PostService {
  async create(post) {
    const createdPost = await Post.create(post)
    return createdPost
  }

  async getAll() {
    const posts = await Post.find()
    return posts
  }

  async getOne(id) {
    if (!id) {
      throw new Error("id not specified")
    }
    const post = await Post.findById(id)
    return post
  }

  async findCateg(category) {
    if (!category) {
      throw new Error("category not specified")
    }
    const posts = await Post.find({ category: category })
    return posts
  }

  async updatePost(post) {
    if (!post._id) {
      throw new Error("ID not specified")
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    })
    return updatedPost
  }

  async deletePost(id) {
    if (!id) {
      throw new Error("ID not specified")
    }
    const deletedPost = await Post.findByIdAndDelete(id)
    return deletedPost
  }
}

export default new PostService()
