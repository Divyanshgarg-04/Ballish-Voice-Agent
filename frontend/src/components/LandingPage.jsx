export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen 
      bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 text-white">
      
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg animate-pulse">
          Welcome to <span className="text-yellow-300">Ballish</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl font-light leading-relaxed opacity-90">
          Your <span className="font-semibold">AI-powered voice assistant </span>  
          for search, tasks, and productivity.  
          Just say <span className="italic">“Ok Ballish”</span> to get started!
        </p>
      </div>

      <button
        className="mt-12 px-8 py-4 rounded-2xl text-lg font-semibold 
          bg-yellow-400 text-black shadow-xl 
          hover:bg-yellow-300 hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Get Started
      </button>
    </div>
  );
}
