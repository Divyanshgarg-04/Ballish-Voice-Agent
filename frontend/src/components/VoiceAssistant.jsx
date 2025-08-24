import { useEffect, useRef, useState } from "react";
import { fetchGemini, fetchMurf } from "../api";
import { Mic, MicOff } from "lucide-react"; // Icon library

export default function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [command, setCommand] = useState("");
  const [conversation, setConversation] = useState([]);

  // persist across renders
  const recognitionRef = useRef(null);
  const debounceRef = useRef(null);
  const listeningRef = useRef(listening);

  // keep ref in sync with state to avoid stale closures
  useEffect(() => {
    listeningRef.current = listening;
  }, [listening]);

  // init SpeechRecognition and (re)bind handlers
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    // create once
    if (!recognitionRef.current) {
      const rec = new SR();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = "en-US";
      recognitionRef.current = rec;
    }

    const rec = recognitionRef.current;

    rec.onresult = async (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();

      if (transcript.toLowerCase().includes("ok ballish")) {
        setListening(true);
      } else if (listeningRef.current) {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
          setCommand(transcript);

          // Show user command
          setConversation((prev) => [
            ...prev,
            { role: "user", text: transcript },
          ]);

          // Fetch from Gemini
          const geminiRes = await fetchGemini(transcript);
          const replyText =
            geminiRes?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I didn't understand that.";

          // Show assistant reply
          setConversation((prev) => [
            ...prev,
            { role: "assistant", text: replyText },
          ]);

          // Speak reply
          const murfAudio = await fetchMurf(replyText);
          const audioURL = URL.createObjectURL(murfAudio);
          new Audio(audioURL).play();
        }, 3000);
      }
    };

    rec.onerror = (e) => {
      console.error("SpeechRecognition error:", e?.error || e);
    };

    // cleanup on unmount
    return () => {
      rec.onresult = null;
      rec.onerror = null;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []); // initialize once

  const startListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    try {
      rec.start(); // safe: ref persists
      setListening(true);
    } catch (e) {
      // guard against "InvalidStateError: already started"
      console.error("Failed to start recognition:", e);
    }
  };

  const stopListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    try {
      rec.stop();
      setListening(false);
    } catch (e) {
      console.error("Failed to stop recognition:", e);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white p-6">
      <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">
        🎙️ Ballish Assistant
      </h1>
      <p className="mt-2 opacity-80">
        Say <span className="italic">“Ok Ballish”</span> to activate.
      </p>

      {/* Conversation Panel */}
      <div className="mt-8 w-full max-w-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6 overflow-y-auto max-h-[60vh]">
        {conversation.length === 0 && (
          <p className="text-center opacity-70 italic">
            Waiting for your command...
          </p>
        )}
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`flex my-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm md:text-base ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Mic Button */}
      <div className="fixed bottom-12 flex justify-center w-full">
        <button
          onClick={listening ? stopListening : startListening}
          className={`w-20 h-20 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 
            ${listening ? "bg-red-500 animate-pulse" : "bg-green-500 hover:bg-green-400"}`}
        >
          {listening ? <MicOff size={36} /> : <Mic size={36} />}
        </button>
      </div>
    </div>
  );
}
