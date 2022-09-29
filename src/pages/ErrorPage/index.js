import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function ErrorPage() {
  const { loggedInUser } = useContext(AuthContext);
  console.log(loggedInUser.user.username);

  return <h1>Error 404 - Página não encontrada</h1>;
}
