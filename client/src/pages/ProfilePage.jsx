import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

const ProfilePage = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    navigate("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
