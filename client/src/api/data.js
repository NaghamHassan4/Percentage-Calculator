const API_BASE = "http://localhost:5000";

export const fetchDataItems = async () => {
  const response = await fetch(`${API_BASE}/api/data`);
  return response.json();
};
