import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { Link } from "react-router-dom";

function FollowersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await api.get("/users/followers");
        setUser(response.data);
        console.log(response);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [reload]);

  return (
    <div>
      {!isLoading && (
        <>
          <h1>Meus seguidores</h1>
          {user.following.map((friend) => {
            return (
              <h1>
                {friend.username} -{" "}
                <Link to={`/users/${friend._id}`}>Perfil</Link>
              </h1>
            );
          })}
        </>
      )}
    </div>
  );
}

export default FollowersPage;
