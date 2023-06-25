import React, { useRef } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { FakeApi } from "./fake-api/fake-api";
import { dummyPosts } from "./fake-api/dummy-posts";
import { generateUUID } from "./utils/generate-uuid";
import Post from "./Post";

export const CreateNewPost = ({ setCurrentShow }) => {
  const api = new FakeApi(dummyPosts);
  const bodyRef = useRef();

  const createPostMutation = useMutation({
    //this variable parameter corresponds to line 46
    mutationFn: (variable) => api.createPost(variable),
    onSuccess: (data, variables, context) => {
      console.log(data);
      setCurrentShow(<Post id={data.post_id} />);
    },
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
    onMutate: (variables) => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = bodyRef.current.value;
    let post = {
      post_id: 100,
      user_id: 1,
      post_content: body,
      post_date: new Date().toISOString(),
      likes: 0,
    };

    //refers to this parameter here
    createPostMutation.mutate(post);
  };

  return (
    <>
      {createPostMutation.isLoading && <div>Loading...</div>}
      {createPostMutation.isError && <div>{}</div>}
      <div>CreateNewPost</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" type="text" ref={bodyRef} />
        </div>
        <button type="submit">
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </>
  );
};
