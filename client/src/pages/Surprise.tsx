import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Link } from "wouter";
import { Heart, Sparkles, Star } from "lucide-react";

export default function Surprise() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnvelopeHovered, setIsEnvelopeHovered] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ['#ffc0cb', '#ff69b4', '#ff1493', '#ff85a1', '#ffb3c6'];

    (function frame() {
      confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors, shapes: ['circle', 'square'], scalar: 1.2 });
      confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors, shapes: ['circle', 'square'], scalar: 1.2 });
      confetti({ particleCount: 3, angle: 90, spread: 100, origin: { x: 0.5, y: 0.5 }, colors, shapes: ['star'], scalar: 1.5 });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05], rotate: [0, 90, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.05, 0.1, 0.05], rotate: [90, 0, 90] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-[150px]"
        />
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${(i * 8.3) % 100}%`, top: `${(i * 7.7) % 100}%` }}
            animate={{ opacity: [0, 0.4, 0], scale: [0, 1, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          >
            <Sparkles className="w-3 h-3 text-pink-400/30" />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-lg relative z-10" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 1.2, opacity: 0, rotateY: 20 }}
              transition={{ duration: 0.6 }}
              onClick={handleOpen}
              onHoverStart={() => setIsEnvelopeHovered(true)}
              onHoverEnd={() => setIsEnvelopeHovered(false)}
              className="cursor-pointer group mx-auto relative"
            >
              <div className="relative w-full max-w-sm mx-auto">
                <motion.div
                  animate={{ y: isEnvelopeHovered ? -10 : 0, rotateZ: isEnvelopeHovered ? -3 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full aspect-[4/3] bg-gradient-to-br from-pink-200 to-rose-200 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <motion.div
                    animate={{ rotateX: isEnvelopeHovered ? -15 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-pink-300 to-rose-300 origin-bottom shadow-lg"
                    style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100" />
                  <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-pink-200/50 to-transparent" style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: isEnvelopeHovered ? [1, 1.15, 1] : 1, rotate: isEnvelopeHovered ? [0, -5, 5, 0] : 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-40 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40"
                    >
                      <Heart className="w-8 h-8 md:w-10 md:h-10 text-white fill-white relative z-10" />
                      {isEnvelopeHovered && [...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: Math.cos((i * Math.PI) / 3) * 35, y: Math.sin((i * Math.PI) / 3) * 35 }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                          className="absolute"
                        >
                          <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0], opacity: isEnvelopeHovered ? 1 : 0.7 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-8 text-center"
                >
                  <p className="font-handwriting text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 px-4">
                    I'm sorry aanchal, and I love you and ik aap maan jaoge, neeche click kro
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-2 flex justify-center"
                  >
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-400" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
              className="bg-white/95 backdrop-blur-xl p-6 md:p-12 rounded-3xl shadow-2xl border-2 border-pink-200/50 text-center relative overflow-hidden mx-4"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-rose-500 to-purple-400" />

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mb-6 flex justify-center"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="text-6xl"
                >
                  🥺
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <p className="font-handwriting text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
                  I'm sorry aanchal, and I love you ❤️
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                <Link href="/final">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-full px-6 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-2xl font-serif text-base md:text-lg shadow-xl overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      One last thing...
                      <Heart className="w-5 h-5 fill-white" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-6 flex items-center justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div key={i} animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                    <Heart className="w-3 h-3 text-pink-400/60 fill-pink-300/50" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}