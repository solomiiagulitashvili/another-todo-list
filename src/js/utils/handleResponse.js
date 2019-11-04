const handleResponse = (body) => {
  try {
    return JSON.parse(body);
  } catch {
    throw (body);
  }
};

export default handleResponse;
