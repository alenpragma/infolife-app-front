import axios from "axios";
import Cookies from "js-cookie";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const refreshAccessToken = async (): Promise<string | null> => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const res = await axios.post(
      "https://3twenty.codebyovi.xyz/api/auth/refresh",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const newToken = res.data?.payload?.accessToken;
    if (newToken) {
      Cookies.set("infolife", newToken, { expires: 3 });

      // axios default header token set
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      processQueue(null, newToken);
      return newToken;
    }
    return null;
  } catch (err) {
    processQueue(err, null);
    throw err;
  } finally {
    isRefreshing = false;
  }
};
