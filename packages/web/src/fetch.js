export const appFetch = async (path, options = {}) => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  const result = await fetch(process.env.REACT_APP_API_URL + path, {
    ...options,
    headers
  });
  if (result.status !== 200) {
    return null;
  }
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

export const appDeleteFetch = async (path, param, options = {}) => {
  const body = JSON.stringify({ ...param });
  return appFetch(path, { ...options, body, method: "DELETE" });
};
