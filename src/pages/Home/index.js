import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";

export function Home() {
  const { loggedInUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      try {
        const response = await api.get("/users/all");
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <>
      <h1>Tamo na home!</h1>
      <p>
        <Link to="/signup">Sign up</Link>
      </p>
      <p>
        <Link to="/login">Logins</Link>
      </p>
      <input
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loggedInUser && !isLoading && (
        <div>
          <Link to="/profile">Profile</Link>
          <Link to="/followers">Meus Seguidores</Link>
          <Link to="/following">Quem eu sigo</Link>

          {users
            .filter((user) =>
              user.username.toLowerCase().includes(search.toLocaleLowerCase())
            )
            .map((user) => {
              if (user._id === loggedInUser.user._id) {
                return <div key={user._id}></div>;
              }
              return (
                <div key={user._id}>
                  <h2>{user.username}</h2>
                  <Link to={`/users/${user._id}`}>Ver Perfil</Link>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
