import React, { useState } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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
      const { user, token } = await registerUser(form);

      toast.success("Registration successful! 🎉");

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h4>Register</h4>
        {error && <p className="form-error">{error}</p>}
        <FormRow
          type="text"
          name="firstName"
          labelText="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          value={form.email}
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? "Please wait..." : "Submit"}
        </button>
        <p>
          Already a member?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
