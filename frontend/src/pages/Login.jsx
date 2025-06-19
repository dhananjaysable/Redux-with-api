import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {
    login,
    isLoading,
    error,
    message,
    isAuthenticated,
    clearAuthError,
    clearAuthMessage,
  } = useAuth();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearAuthError();
    }
    if (message && isAuthenticated) {
      toast.success(message);
      clearAuthMessage();
      navigate("/dashboard");
    }
  }, [
    error,
    message,
    isAuthenticated,
    clearAuthError,
    clearAuthMessage,
    navigate,
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const result = await login(formData);
      if (result.type === "auth/login/fulfilled") {
        console.log("Login successful");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (isAuthenticated) {
    return <div>You are already logged in!</div>;
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
