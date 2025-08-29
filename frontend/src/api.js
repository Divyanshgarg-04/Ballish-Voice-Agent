const Backend_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchGemini = async (query) => {
  const res = await fetch(`${Backend_URL}/api/ai/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return res.json();
};

export const fetchMurf = async (text) => {
  const res = await fetch(`${Backend_URL}/api/murf/speech`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  

  if (!res.ok) throw new Error("Failed to fetch Murf audio");

  return await res.blob(); // return audio blob
};
