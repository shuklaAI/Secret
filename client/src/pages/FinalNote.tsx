import { motion } from "framer-motion";
import { useEffect, useState, memo } from "react";
import { Heart, Sparkles, Feather } from "lucide-react";

const VintageSparkle = memo(({ delay, left, top }: { delay: number; left: string; top: string }) => (
  <motion.div
    className="absolute will-change-transform pointer-events-none"
    style={{ left, top }}
    animate={{ opacity: [0, 0.15, 0], scale: [0, 1, 0] }}
    transition={{ duration: 7, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <Feather className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400/30" />
  </motion.div>
));

VintageSparkle.displayName = "VintageSparkle";

export default function FinalNote() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const fullText = "Aanchal dekho ik kl meri galati thi and I'm sorry I should've informed you, but aaj to yr I informed you and I'm sorry yr it's just ki acha ni lg ra tha aap bhi baat ni kr rhe the and I thought I should go to visit and mai to yr din bhar text kr ra tha, kl bhi jb wo sab hua aap meko meri galati ka wo kr rhe the, but thk h and I'm sorry for that I really am but I really miss you yr and I'm sorry, 🥺 please please please maaf kr do ab 🥺❤️ please aanchal muuni ab Maan jao munni please";

  useEffect(() => {
    let index = 0;
    const typingSpeed = 35;
    const timer = setInterval(() => {
      if (index >= fullText.length) {
        clearInterval(timer);
        setIsTypingComplete(true);
        return;
      }
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
    }, typingSpeed);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-rose-300 rounded-full blur-[100px] will-change-transform"
        />
        {[...Array(5)].map((_, i) => (
          <VintageSparkle key={i} delay={i * 0.8} left={`${20 + i * 15}%`} top={`${10 + i * 18}%`} />
        ))}
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-amber-50/90 to-rose-50/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-amber-200/50 p-6 sm:p-10 md:p-12 lg:p-16 relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-amber-300/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-amber-300/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-amber-300/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-amber-300/40 rounded-br-lg" />

          <div className="relative z-10 space-y-6 sm:space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-center space-y-3 sm:space-y-4"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="inline-block">
                <Feather className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600/50" />
              </motion.div>
              <h1 className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-rose-600 to-pink-600">
                My Dearest Aanchal
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-400 fill-rose-300/50" />
                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent via-amber-400/50 to-transparent" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }}>
              <p className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed sm:leading-loose text-center px-2 sm:px-4">
                {displayedText}
                {!isTypingComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 sm:h-6 md:h-7 bg-rose-400 ml-1"
                  />
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-right space-y-3 sm:space-y-4 pt-4 sm:pt-6"
            >
              <div className="flex items-center justify-end gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div key={i} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
                    <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400/50 fill-rose-300/50" />
                  </motion.div>
                ))}
              </div>
              <p className="font-handwriting text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                I love you, Aanchal 🥺❤️
              </p>
              <motion.div animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="flex items-center justify-end gap-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400/60" />
                <span className="font-serif text-xs sm:text-sm text-gray-500 italic">please maaf kr do 🥺</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isTypingComplete ? 1 : 0, scale: isTypingComplete ? 1 : 0.8 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="flex items-center justify-center gap-2 pt-4 sm:pt-6"
            >
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-400/50" />
              </motion.div>
              <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-rose-300/50 to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}