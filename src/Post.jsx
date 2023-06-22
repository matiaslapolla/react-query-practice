import React from "react";
import { getPost } from "./api/posts";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api/users";

const Post = ({ id }) => {
  const postQuery = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ["user", postQuery?.data?.userId],
    enabled: postQuery.data?.userId !== undefined,
    queryFn: () => getUser(postQuery?.data?.userId),
  });

  if (postQuery.status === "loading") {
    return <div>Loading...</div>;
  }

  if (postQuery.status === "error") {
    return <div>Error: {JSON.stringify(postQuery.error)}</div>;
  }

  return (
    <>
      {postQuery.data.title} <br />
      {userQuery.isLoading ? (
        <div>Loading...</div>
      ) : userQuery.isError ? (
        <div>Error: {JSON.stringify(userQuery.error)}</div>
      ) : (
        <div>{userQuery.data.name}</div>
      )}
    </>
  );
};

export default Post;
