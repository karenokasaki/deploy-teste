import { useState, useEffect, useContext } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import CreateComment from "../CreateComment";

function MyPosts({ reload, setReload }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ content: "" });

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const response = await api.get("/posts/my-posts");
        setPosts([...response.data]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, [reload]);

  async function handleDelete(idPost) {
    try {
      await api.delete(`/posts/delete/${idPost}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleComment(idPost) {
    try {
      await api.post(`/comments/create/${idPost}`, form);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteComment(idComment) {
    try {
      await api.delete(`/comments/delete/${idComment}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(form);
  return (
    <div>
      <h1>My posts</h1>
      {!isLoading &&
        posts.map((post) => {
          //const date = post.createdAt.slice(0, 10);
          const date = new Date(post.createdAt);
          const day = date.getDate();
          const month = date.getMonth() + 1; // mês começa pelo 0
          const hour = date.getHours();
          const minutes = date.getMinutes();
          return (
            <div key={post._id}>
              <p>
                {post.content} -
                <small>
                  {day}/{month} - {hour}:{minutes}
                </small>{" "}
              </p>
              <button onClick={() => handleDelete(post._id)}>
                Deletar post
              </button>

              <button onClick={() => setShowForm(!showForm)}>Comentar</button>
              {showForm && (
                <>
                  <CreateComment
                    setForm={setForm}
                    handleComment={handleComment}
                    post={post}
                    form={form}
                  />
                </>
              )}

              {post.comments.length !== 0 &&
                post.comments.map((comment) => {
                  return (
                    <div key={comment._id}>
                      <p>
                        {comment.content} - criado: {comment.author.username}
                      </p>
                      <button onClick={() => handleDeleteComment(comment._id)}>
                        Apagar comentário
                      </button>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}

export default MyPosts;
