export const fetchGemini = async (query) => {
  const res = await fetch("http://localhost:5000/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return res.json();
};

export const fetchMurf = async (text) => {
  const res = await fetch("http://localhost:5000/murf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.blob();
};
