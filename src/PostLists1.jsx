import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPosts } from "./api/posts";

const PostLists1 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    refetchInterval: 1000,
  });

  if (postsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (postsQuery.isError) {
    return <div>Error: {JSON.stringify(postsQuery.error)}</div>;
  }

  return (
    <>
      <div>PostLists1</div>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>
            <p>{post.title}</p>
            <p>{post.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
};

export default PostLists1;
