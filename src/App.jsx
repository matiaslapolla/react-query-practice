import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PostLists1 from "./PostLists1";
import PostLists2 from "./PostLists2";
import { useState } from "react";
import Post from "./Post";
import { CreateNewPost } from "./CreatePost";
import PostListPaginated from "./PostListPaginated";

const generateRandomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateUUID = () => {
  return `${generateRandomString(8)}-${generateRandomString(
    4
  )}-${generateRandomString(4)}-${generateRandomString(
    4
  )}-${generateRandomString(12)}`;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostLists1 />);

  return (
    <>
      <div>
        <button onClick={() => setCurrentPage(<PostLists1 />)}>
          PostLists1
        </button>
        <button onClick={() => setCurrentPage(<PostLists2 />)}>
          PostLists2
        </button>
        <button onClick={() => setCurrentPage(<Post id={1} />)}>Post 1</button>
        <button
          onClick={() =>
            setCurrentPage(<CreateNewPost setCurrentPage={setCurrentPage} />)
          }
        >
          Create Post
        </button>

        <button
          onClick={() => {
            setCurrentPage(<PostListPaginated />);
          }}
        >
          PostListPaginated
        </button>
      </div>
      {currentPage}
    </>
  );
}
