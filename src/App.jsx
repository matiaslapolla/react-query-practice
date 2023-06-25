import PostLists1 from "./PostLists1";
import PostLists2 from "./PostLists2";
import { useState } from "react";
import Post from "./Post";
import { CreateNewPost } from "./CreatePost";
import PostListPaginated from "./PostListPaginated";
import Divider from "./components/divider";

export default function App() {
  const [currentShow, setCurrentShow] = useState(<PostLists1 />);
  const [postId, setPostId] = useState(1);

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100%",
          gap: "1rem",
          border: "1px solid red",
        }}
      >
        <div
          style={{
            display: "flex",
            borderRight: "1px solid #dedede",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            minWidth: "200px",
            padding: "1rem",
            gap: "1rem",
          }}
        >
          <div onClick={() => setCurrentShow()}>
            <h1
              style={{
                fontSize: "2rem",
                fontFamily: "sans-serif",
                color: "#333",
              }}
            >
              React Query Demo
            </h1>
          </div>

          <Divider />

          <div>
            <button
              style={{
                width: "150px",
                zIndex: 1,
                height: "50px",
                fontSize: "1rem",
              }}
              onClick={() => setCurrentShow(<PostLists1 />)}
            >
              PostLists1
            </button>
          </div>

          <Divider />

          <div>
            <button
              style={{
                width: "150px",
                zIndex: 1,
                height: "50px",
                fontSize: "1rem",
              }}
              onClick={() => setCurrentShow(<PostLists2 />)}
            >
              PostLists2
            </button>
          </div>

          <Divider />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "150px",
            }}
          >
            <input
              type="text"
              placeholder="Post number"
              onChange={(e) => setPostId(e.target.value)}
              style={{
                minWidth: "150px",
                zIndex: 1,
                height: "25px",
                fontSize: "0.8rem",
              }}
            />
            <p>There are a total of 30 posts.</p>
            <button
              style={{
                width: "150px",
                zIndex: 1,
                height: "50px",
                fontSize: "1rem",
              }}
              onClick={() => setCurrentShow(<Post id={postId} />)}
            >
              Post 1
            </button>
          </div>

          <Divider />

          <div>
            <button
              style={{
                width: "150px",
                zIndex: 1,
                height: "50px",
                fontSize: "1rem",
              }}
              onClick={() =>
                setCurrentShow(
                  <CreateNewPost setCurrentShow={setCurrentShow} />
                )
              }
            >
              Create Post
            </button>
          </div>
        </div>
        {currentShow}
      </div>
    </>
  );
}
