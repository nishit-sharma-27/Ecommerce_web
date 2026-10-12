import { useState } from "react";
import { useForm } from "react-hook-form";
import {  useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Component names must be capitalized in React
export default function Auth() {
  const [mode, setMode] = useState("signup");
  const [error,setError]=useState(null);
  const navigate=useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { signUp ,login} = useAuth();

  function onSubmit(data) {
    setError(null);
    let result;
    if (mode==="signup"){
    result=signUp(data.email, data.password);
    }
    else{
    result=login(data.email, data.password);
    }

    if (result.success){
      navigate("/");
    }
    else {
      setError(result.error);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button className="btn btn-primary btn-large" type="submit">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span onClick={() => setMode("login")} className="auth-link">
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span onClick={() => setMode("signup")} className="auth-link">
                  Sign Up
                </span>
              </p>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}