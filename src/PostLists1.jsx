import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FakeApi } from "./fake-api/fake-api";
import { dummyPosts } from "./fake-api/dummy-posts";

const PostLists1 = () => {
  const [showError, setShowError] = useState(false);

  const api = new FakeApi(dummyPosts);
  const { isLoading, error, data, fetchStatus } = useQuery({
    queryKey: ["postsData"],
    queryFn: () => api.getPosts(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <div>
          <button onClick={() => setShowError(!showError)}>
            {showError ? "Hide" : "Show"} error details
          </button>
          Error {showError ? JSON.stringify(error) : null}
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ width: "auto" }}>
        <div>Simple posts</div>
        <p>Fetch status: {fetchStatus}</p>
        <ol>
          {data.map((post) => (
            <li key={post.post_id}>
              {post.post_id}
              <br />
              {post.post_content}
              <br />
              Date: {post.post_date}
              <br />
              Likes: {post.likes}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default PostLists1;
