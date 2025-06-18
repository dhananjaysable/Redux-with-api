import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import { useEffect } from "react";
import { getAuthUser } from "./redux/features/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            data?.isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            data?.isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            data?.isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
