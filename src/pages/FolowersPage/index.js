import { useState, useEffect } from "react";
import { api } from "../../api/api";

function FollowersPage() {
  const [isLoading, setIsLoading] = useState(true);
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
  }, []);

  return (
    <div>
      {!isLoading && (
        <>
          <h1>Meus seguidores</h1>
          {user.followers.map((friend) => {
            return <h1 key={friend._id}>{friend.username}</h1>;
          })}
        </>
      )}
    </div>
  );
}

export default FollowersPage;
