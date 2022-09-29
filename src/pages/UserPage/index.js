import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import CreateComment from "../../components/CreateComment";

function UserPage() {
  const { idUser } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [form, setForm] = useState({ content: "" });

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    async function fetchUser() {
      try {
        const response = await api.get(`/users/user/${idUser}`);
        const response2 = await api.get(`/users/profile`);

        setLoggedInUser(response2.data);
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [reload, idUser]);

  async function follow() {
    try {
      await api.put(`/users/follow/${user._id}`);
      console.log("usuário seguido");
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollow() {
    try {
      await api.put(`/users/unfollow/${user._id}`);
      navigate("/");
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

  return (
    <div>
      {!isLoading && (
        <>
          <h1>{user.username}</h1>
          <img src={user.profilePic} alt="" width={100} />

          {loggedInUser.following.includes(user._id) ? (
            <button onClick={unfollow}>Deixar de Seguir</button>
          ) : (
            <button onClick={follow}>Seguir</button>
          )}

          {user.followers.includes(loggedInUser._id) && (
            <>
              {user.posts.map((post) => {
                return (
                  <div key={post._id}>
                    <h1>{post.content}</h1>

                    <CreateComment
                      setForm={setForm}
                      handleComment={handleComment}
                      post={post}
                      form={form}
                    />

                    <h2>Comentários</h2>
                    {post.comments.map((comment) => {
                      if (comment.author === loggedInUser._id) {
                        return (
                          <p key={comment._id}>
                            {comment.content} -{" "}
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              apagar
                            </button>
                          </p>
                        );
                      }
                      return <p key={comment._id}>{comment.content}</p>;
                    })}
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default UserPage;
