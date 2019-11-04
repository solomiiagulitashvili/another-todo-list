const handleResponse = (body) => {
  try {
    const parsed = JSON.parse(body);
    if (parsed.error) {
      throw parsed.error.message;
    }
    return parsed;
  } catch {
    throw (body);
  }
};

export default handleResponse;
