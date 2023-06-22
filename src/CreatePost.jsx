import React, { useRef } from "react";
import { createPost } from "./api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Post from "./Post";

export const CreateNewPost = ({ setCurrentPage }) => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
    // onMutate: variable, // before mutationFn
    // onSuccess: (data, variable, context), // then in promise
    // onError: (error, variable, context), // catch in promise
    // onSettled: (data, error, variable, context), // finally in promise
  });

  // createPostMutation.mutate(
  //   {
  //     title: titleRef.current.value,
  //     body: bodyRef.current.value,
  //   },
  // options
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //     onSettled: (data, error) => {
  //       console.log(data, error);
  //     },
  //     onMutate: (variable) => {
  //       console.log(variable);
  //     },
  //   }
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  };

  return (
    <>
      {createPostMutation.isLoading && <div>Loading...</div>}
      {createPostMutation.isError && (
        <div>Error: {JSON.stringify(createPostMutation.error)}</div>
      )}
      <div>CreateNewPost</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" ref={titleRef} />
        </div>
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
