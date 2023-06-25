import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FakeApi } from "./fake-api/fake-api";
import { dummyPosts } from "./fake-api/dummy-posts";

const queryClient = new QueryClient();

const PostLists2 = () => {
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState(1);

  const api = new FakeApi(dummyPosts);

  const { isLoading, error, isSuccess, data } = useQuery({
    queryKey: ["postsData", page],
    queryFn: () => api.getPostPaginated(5, page),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data?.hasMore === true) {
      queryClient.prefetchQuery(["postsData"], () =>
        api.getPostPaginated(5, page)
      );
    }
  }, [data, page, api]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {error && (
          <>
            <div>
              <button onClick={() => setShowError(!showError)}>
                {showError ? "Hide" : "Show"} error details
              </button>
              Error {showError ? JSON.stringify(error) : null}
            </div>
          </>
        )}

        {isLoading && <div>Loading...</div>}

        {isSuccess && (
          <div style={{ width: "auto" }}>
            <div>Paginated</div>
            <ol>
              {data?.posts?.map((post) => (
                <li key={post.post_id}>
                  Post: {post.post_id} - {post.post_content}
                  <br />
                  Date: {post.post_date}
                  <br />
                  Likes: {post.likes}
                </li>
              ))}
            </ol>
            <div>
              {data.hasMore === false && "Final "} Page: {page}
            </div>
            {page > 1 && (
              <button onClick={() => setPage(page - 1)}>Prev</button>
            )}
            {data.hasMore === true && (
              <button onClick={() => setPage(page + 1)}>Next</button>
            )}
          </div>
        )}
      </QueryClientProvider>
    </>
  );
};

export default PostLists2;
