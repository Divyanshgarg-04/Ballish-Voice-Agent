export const fetchGemini = async (query) => {
  const res = await fetch("http://localhost:5000/api/ai/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return res.json();
};

export const fetchMurf = async (text) => {
  const res = await fetch("http://localhost:5000/api/murf/speech", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  console.log("Murf fetch status:", res.status, res.headers.get("content-type"));

  if (!res.ok) throw new Error("Failed to fetch Murf audio");

  return await res.blob(); // return audio blob
};
