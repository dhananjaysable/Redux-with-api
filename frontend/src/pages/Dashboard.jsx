import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth";

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  if (data.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl">{data.user?.name || "User"}</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
      {data.loading && <p>Logging out...</p>}
      {data.error && <p style={{ color: "red" }}>{data.error}</p>}
    </div>
  );
};

export default Dashboard;
