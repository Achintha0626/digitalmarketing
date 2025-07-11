
export const registerUser = async (userData) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const payload = await res.json();
  if (!res.ok) throw new Error(payload.msg || "Registration failed");
  return payload; 
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const payload = await res.json();
  if (!res.ok) throw new Error(payload.msg || "Login failed");
  return payload;
};
