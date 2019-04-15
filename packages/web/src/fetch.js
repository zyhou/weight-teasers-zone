const API_URL = "http://localhost:3001";

export const appFetch = async (path, options = {}) => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  const result = await fetch(API_URL + path, { ...options, headers });
  return await result.json();
};

export const appPostFetch = async (path, param, options = {}) => {
  const body = JSON.stringify({ ...param });
  return appFetch(path, { ...options, body, method: "POST" });
};

export const appPutFetch = async (path, param, options = {}) => {
  const body = JSON.stringify({ ...param });
  return appFetch(path, { ...options, body, method: "PUT" });
};
