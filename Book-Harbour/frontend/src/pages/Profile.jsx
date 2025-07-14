
import React, { useState } from "react";
import { Form, useLoaderData, useActionData, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import FormRow from "../components/FormRow";
import SubmitBtn from "../components/SubmitBtn";


export async function loader() {
  const { data } = await customFetch.get("/users/show-me");
  return data.user;
}


export async function action({ request }) {
  const formData = await request.formData();
  const file = formData.get("avatar");
  const MAX = 2 * 1024 * 1024; 
  if (file && file.size > MAX) {
    toast.error("Image too large (max 2 MB)");
    return null;
  }
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated");
    return redirect("/dashboard/profile");
  } catch (err) {
    const msg = err.response?.data?.msg || err.message;
    toast.error(msg);
    return { error: msg };
  }
}

const Profile = () => {
  const user = useLoaderData();
  const actionData = useActionData();

  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        {actionData?.error && <p className="form-error">{actionData.error}</p>}

        <div className="form-center">
          

          
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select An Image File (Max 2 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>

          {/* Controlled text inputs */}
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

          <SubmitBtn formBtn text="Save Changes" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
