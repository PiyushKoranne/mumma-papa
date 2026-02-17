import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// --- Assets ---
// REPLACE THESE URLS WITH YOUR ACTUAL PHOTOS
const HERO_PHOTO = "/asyy2.png"; 
const MUSIC_NOTE = "🎵"; // You can replace with an SVG icon

// --- Components ---

// 1. Background Magic (GSAP)
const Sparkles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create 30 random sparkles
      for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        containerRef.current.appendChild(sparkle);

        gsap.set(sparkle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: 0,
          opacity: 0,
          backgroundColor: Math.random() > 0.5 ? '#D4AF37' : '#F3E5AB', // Gold variations
          position: 'absolute',
          width: Math.random() * 6 + 2 + 'px',
          height: Math.random() * 6 + 2 + 'px',
          borderRadius: '50%',
          zIndex: 0
        });

        gsap.to(sparkle, {
          duration: Math.random() * 3 + 2,
          y: `-=${Math.random() * 100 + 50}`,
          scale: Math.random() * 1.5,
          opacity: Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" />;
};

// 2. The Cover Page
const Cover = ({ onOpen }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      className="h-screen w-full flex flex-col items-center justify-center relative z-10"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center p-8 border-4 border-double border-gold/30 bg-white/50 backdrop-blur-sm shadow-xl rounded-lg max-w-md mx-4"
      >
        <h1 className="font-serif text-5xl md:text-7xl text-gold mb-4 tracking-tighter">
          50 Years
        </h1>
        <p className="font-sans text-gray-600 tracking-widest uppercase text-sm mb-8">
          A Love Story
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="px-8 py-3 bg-gold text-white font-serif text-xl rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
        >
          Open Book
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// 3. The Message Page
const Message = ({ onNext }) => {
  // Animation variants for staggering text
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.8, delayChildren: 0.5 }
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
  };

  const textVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      exit="exit"
      className="h-screen w-full flex flex-col items-center justify-center p-6 text-center z-10 relative max-w-2xl mx-auto"
    >
      <motion.h2 variants={textVars} className="font-serif text-3xl md:text-4xl text-charcoal mb-8 leading-relaxed">
        To Mumma & Papa,
      </motion.h2>
      
      <motion.p variants={textVars} className="font-serif text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
        "True love isn't about finding someone you can live with... <br/>
        it's about finding someone you can't live without."
      </motion.p>
      
      <motion.p variants={textVars} className="font-sans text-lg text-gray-500 mb-12 italic">
        Watching you two has been the greatest lesson of our lives.
      </motion.p>

      <motion.div variants={textVars}>
        <button 
          onClick={onNext}
          className="text-gold border-b-2 border-gold pb-1 font-serif text-lg hover:text-charcoal hover:border-charcoal transition-all"
        >
          See the magic moment &rarr;
        </button>
      </motion.div>
    </motion.div>
  );
};

// 4. The Grand Reveal
// const Reveal = () => {
//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//       className="min-h-screen w-full flex flex-col items-center justify-center p-4 z-10 relative"
//     >
//       {/* Photo Frame Container */}
//       <motion.div 
//         initial={{ scale: 0.8, rotate: -2, opacity: 0 }}
//         animate={{ scale: 1, rotate: 0, opacity: 1 }}
//         transition={{ 
//           type: "spring", 
//           stiffness: 50, 
//           damping: 20, 
//           delay: 0.2 
//         }}
//         className="bg-white p-4 md:p-6 pb-16 md:pb-24 shadow-2xl rotate-1 max-w-lg w-full transform origin-center"
//         style={{ boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.25)" }}
//       >
//         <div className="overflow-hidden bg-gray-100 relative aspect-[4/5] md:aspect-[3/4]">
//           <motion.img 
//             initial={{ scale: 1.2 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 10, ease: "linear" }} // Ken Burns effect
//             src={HERO_PHOTO} 
//             alt="Anniversary Moment" 
//             className="w-full h-full object-cover"
//           />
//         </div>
        
//         <div className="mt-8 text-center">
//           <h3 className="font-serif text-3xl text-charcoal">Happy Anniversary</h3>
//           <p className="font-sans text-gray-500 mt-2 text-sm">With love, Name & SisterName</p>
//         </div>
//       </motion.div>

//       {/* Floating hearts animation (Simple CSS/Framer mix) */}
//       {[...Array(5)].map((_, i) => (
//         <motion.div
//           key={i}
//           initial={{ y: 0, opacity: 0, scale: 0 }}
//           animate={{ y: -300, opacity: [0, 1, 0], scale: 1 }}
//           transition={{ 
//             duration: 3, 
//             repeat: Infinity, 
//             delay: i * 0.8,
//             ease: "easeOut" 
//           }}
//           className="absolute text-4xl text-red-400"
//           style={{ 
//             left: `${50 + (i % 2 === 0 ? -10 * i : 10 * i)}%`, 
//             top: '60%' 
//           }}
//         >
//           ♥
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// };

// REPLACE the previous Reveal component with this one:

const Reveal = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  // --- Audio Logic ---
  useEffect(() => {
    // REPLACE THIS URL with "/song.mp3" after putting your file in the public folder
    const songUrl = "/kksong.mp3"; 
    
    audioRef.current = new Audio(songUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0; // Start at 0 for fade-in

    // Play immediately
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Fade in volume over 2 seconds
          const fadeAudio = setInterval(() => {
            // Only fade in if not muted and volume < 1
            if (audioRef.current && audioRef.current.volume < 0.9 && !audioRef.current.muted) {
              audioRef.current.volume += 0.1;
            } else {
              clearInterval(fadeAudio);
            }
          }, 200);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
        });
    }

    // Cleanup when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }} // Slowed down specifically for the song intro
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 z-10 relative"
    >
      {/* Mute Button (Discrete) */}
      <button 
        onClick={toggleMute}
        className="absolute top-6 right-6 text-gold/50 hover:text-gold transition-colors z-50 p-2"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Photo Frame Container */}
      <motion.div 
        initial={{ scale: 0.8, rotate: -2, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 40, 
          damping: 20, 
          delay: 0.5 // Wait slightly for music to start
        }}
        className="bg-white p-4 md:p-6 pb-16 md:pb-24 shadow-2xl rotate-1 max-w-lg w-full transform origin-center"
        style={{ boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="overflow-hidden bg-gray-100 relative aspect-[4/5] md:aspect-[3/4]">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: "linear" }} // Extended Ken Burns effect
            src={HERO_PHOTO} 
            alt="Anniversary Moment" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="mt-8 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="font-serif text-3xl text-charcoal"
          >
            Happy Anniversary
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="font-sans text-gray-500 mt-2 text-sm"
          >
            With love, Name & SisterName
          </motion.p>
        </div>
      </motion.div>

      {/* Floating hearts animation */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{ y: -300, opacity: [0, 1, 0], scale: 1 }}
          transition={{ 
            duration: 4, // Slower float
            repeat: Infinity, 
            delay: i * 1.5,
            ease: "easeOut" 
          }}
          className="absolute text-4xl text-red-400"
          style={{ 
            left: `${50 + (i % 2 === 0 ? -15 * i : 15 * i)}%`, 
            top: '60%' 
          }}
        >
          ♥
        </motion.div>
      ))}
    </motion.div>
  );
};

// --- Main App Controller ---
function App() {
  const [step, setStep] = useState(0); // 0: Cover, 1: Message, 2: Reveal

  return (
    <div className="relative min-h-screen bg-paper selection:bg-gold selection:text-white overflow-hidden">
      {/* Background Music Hint (Optional) */}
      <div className="fixed top-4 right-4 z-50 text-gold opacity-50 text-xl animate-pulse">
        {MUSIC_NOTE}
      </div>

      {/* GSAP Background - Persistent across pages */}
      <Sparkles />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <Cover key="cover" onOpen={() => setStep(1)} />
        )}

        {step === 1 && (
          <Message key="message" onNext={() => setStep(2)} />
        )}

        {step === 2 && (
          <Reveal key="reveal" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;