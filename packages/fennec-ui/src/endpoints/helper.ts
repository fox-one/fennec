import axios from "axios";

export async function getUser(id: string) {
  const resp = await axios.get(`https://echo.fox.one/users/${id}`);

  return resp.data.data;
}
