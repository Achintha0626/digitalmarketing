import React, { useState } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    try {
      const { user, token } = await loginUser(form);
      // show success toast
      toast.success("Login successful!");
      // persist token
      localStorage.setItem("token", token);
      // redirect
      navigate("/dashboard");
    } catch (err) {
      // show error toast
      toast.error(err.message || "Login failed");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h4>Login</h4>
        {error && <p className="form-error">{error}</p>}
        <FormRow
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? "Please wait..." : "Submit"}
        </button>
        <p>
          Not a member yet?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
