import React, { useState } from "react";
import { Logo, FormRow } from "../components";
import SubmitBtn from "../components/SubmitBtn";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    try {
      const response = await customFetch.post("/auth/register", form);
      const { user, token } = response.data;

      toast.success("Registration successful!");
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.msg || err.message || "Registration failed";
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
        <h4>Register</h4>
        {error && <p className="form-error">{error}</p>}

        <FormRow
          type="text"
          name="firstName"
          labelText="First Name"
          defaultValue={form.firstName}
          onChange={handleChange}
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue={form.lastName}
          onChange={handleChange}
        />
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

        <SubmitBtn formBtn isLoading={loading} />

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
