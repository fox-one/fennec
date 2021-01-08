import AxiosClient from "~/utils/axios";
import { API_BASE } from "~/constants";

export function createApis(http: AxiosClient) {
  return {
    getPublic() {
      return http.get("/public");
    },
  };
}

export default function createService() {
  const http = new AxiosClient({ baseURL: API_BASE }, [], []);
  return createApis(http);
}
