import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import { useEffect } from "react";
import { getAuthUser } from "./redux/features/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthUser());
  }, []);
  const data = useSelector((state) => state.auth);
  if (data.loading) {
    return <h1>Loading...</h1>;
  }
  if (data.error != null) {
    return <h1>{data.error}</h1>;
  }
  return (
    <>
      <Login />
      <h1>{data.user.name}</h1>
    </>
  );
}

export default App;
