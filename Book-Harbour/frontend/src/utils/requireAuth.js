import { redirect } from "react-router-dom";

export async function requireAuth({ request }) {
  const token = localStorage.getItem("token");
  if (!token) {
    const url = new URL(request.url);

    throw redirect(`/login?redirectTo=${url.pathname}`);
  }

  return null;
}
