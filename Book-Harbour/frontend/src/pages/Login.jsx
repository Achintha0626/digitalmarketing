
import React, { useState } from "react";
import { Logo, FormRow } from "../components";
import SubmitBtn from "../components/SubmitBtn";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
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
      // POST /api/v1/auth/login
      const response = await customFetch.post("/auth/login", form);
      const { user, token } = response.data;

      toast.success("Login successful!");
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || "Login failed";
      toast.error(msg);
      setError(msg);
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
          labelText="Email"
          defaultValue={form.email}
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          defaultValue={form.password}
          onChange={handleChange}
        />

       
        <SubmitBtn formBtn />

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
