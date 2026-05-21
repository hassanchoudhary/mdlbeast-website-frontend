'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and play background audio (start muted for browser autoplay compatibility)
  useEffect(() => {
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.loop = true;
    audio.volume = 0.4; // Pleasant background volume
    audio.muted = true;
    audioRef.current = audio;

    // Proactively try to play muted audio on load
    const playMuted = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.warn('[AudioPlayer] Autoplay prevented:', err);
      }
    };
    playMuted();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      // Unmuting: set muted to false and ensure it is playing
      audioRef.current.muted = false;
      audioRef.current.play().catch((err) => {
        console.error('[AudioPlayer] Error playing audio:', err);
      });
      setIsMuted(false);
    } else {
      // Muting: set muted to true
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] pointer-events-auto">
      <motion.button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        className="relative flex h-14 w-14 items-center justify-center rounded-full 
                   bg-[#111111]/90 border border-white/10 hover:border-beast-pink/50
                   text-beast-white shadow-2xl backdrop-blur-md cursor-pointer 
                   transition-all duration-300 active:scale-95 group focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glowing background ring on hover */}
        <div className="absolute inset-0 -m-[1px] rounded-full border border-transparent 
                        group-hover:border-beast-pink/20 transition-all duration-300 pointer-events-none" />

        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <VolumeX className="h-5 w-5 text-beast-cream/80 group-hover:text-beast-white transition-colors" />
            </motion.div>
          ) : (
            <motion.div
              key="playing"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative flex items-center justify-center"
            >
              <Volume2 className="h-5 w-5 text-beast-pink group-hover:text-beast-pink transition-colors" />
              {/* Premium pulsing indicator */}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-beast-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-beast-pink"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
