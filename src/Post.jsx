import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FakeApi } from "./fake-api (unused)/fake-api";
import { dummyPosts } from "./fake-api (unused)/dummy-posts";

const Post = ({ id }) => {
  const api = new FakeApi(dummyPosts);

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => api.getPost(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(post);

  return (
    <>
      <div>
        <h1>{post.post_id}</h1>
        <h2>{post.post_content}</h2>
        <h3>{post.post_date}</h3>
        <p>Likes: {post.likes}</p>
      </div>
    </>
  );
};

export default Post;
