import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <div>
      <h1>Welcome, {user?.name.split(" ")[0]}!</h1>
      <p>Email: {user?.email}</p>
      <button onClick={logout} className="btn-secondary">
        Logout
      </button>
    </div>
  );
};
export default Dashboard;
