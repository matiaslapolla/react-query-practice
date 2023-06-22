import React, { useState } from "react";
import { getPostsPaginated } from "./api/posts";
import { useQuery } from "@tanstack/react-query";

const PostListPaginated = () => {
  const [page, setPage] = useState(1);

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ["posts", { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page),
  });

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>{error.message}</div>;

  return (
    <>
      <h1>paginated posts</h1>
      <div>{isPreviousData && "Previous Data"}</div>
      <div>
        {data.posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
          </div>
        ))}
        {data.previousPage && (
          <button onClick={() => setPage(data.previousPage)}>
            Previous Page
          </button>
        )}
        {data.nextPage && (
          <button onClick={() => setPage(data.nextPage)}>Next Page</button>
        )}
      </div>
    </>
  );
};

export default PostListPaginated;
