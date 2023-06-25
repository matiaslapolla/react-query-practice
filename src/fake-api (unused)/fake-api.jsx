import { generateRandomString } from "../utils/generate-random-string";
import { dummyPosts } from "./dummy-posts";

export class FakeApi {
  constructor(posts = []) {
    this.posts = posts;
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.posts);
      }, 500);
    });
  }

  getPost(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.posts.find((post) => post.post_id === id));
      }, 500);
    });
  }

  createPost(post) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.posts) {
          this.posts = [post, ...this.posts];
          resolve(post);
        } else {
          let _posts = [];
          _posts.push(post);
          this.posts = _posts;
          resolve(post);
        }
      }, 500);
    });
  }

  updatePost(post) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.posts.findIndex((p) => p.id === post.id);
        this.posts[index] = post;
        resolve(post);
      }, 500);
    });
  }

  deletePost(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.posts = this.posts.filter((post) => post.id !== id);
        resolve(id);
      }, 500);
    });
  }

  getPostPaginated(limit, page = 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const pagePosts = this.posts.slice(startIndex, endIndex);
        const hasMore = endIndex < this.posts.length;
        resolve({ posts: pagePosts, hasMore: endIndex < this.posts.length });
      }, 500);
    });
  }
}
