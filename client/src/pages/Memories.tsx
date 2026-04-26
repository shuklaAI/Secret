import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

const coupleImages = [
  { src: "/couple1.jpg", id: 1 },
  { src: "/couple2.jpg", id: 2 },
  { src: "/couple3.jpg", id: 3 },
  { src: "/couple4.jpg", id: 4 },
  { src: "/couple5.jpg", id: 5 },
];

function ImageCard({ src, index }: { src: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="flex justify-center"
    >
      <div className="relative bg-white p-3 rounded-3xl shadow-xl border-2 border-white overflow-hidden max-w-sm w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-3xl transform rotate-2 -z-10" />
        <img
          src={src}
          alt=""
          className="w-full rounded-2xl object-cover"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export default function Memories() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400/70" />
            </motion.div>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent" />
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-400" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400/60 to-transparent" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400/70" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-base sm:text-lg md:text-xl text-rose-700 font-serif leading-relaxed max-w-2xl mx-auto px-4 bg-white/60 backdrop-blur-sm rounded-2xl py-4 shadow-sm border border-pink-100">
              Dekhiye I'm sorry but please ab Maan jao, dekho ab tk birthday surprise bhi khrb ho gya, but ab Maan jao ab ni hoga n I'm sorry please 🥺
            </p>
          </motion.div>
        </motion.header>

        <div className="space-y-10 mb-16">
          {coupleImages.map((img, idx) => (
            <ImageCard key={img.id} src={img.src} index={idx} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center py-12 sm:py-16"
        >
          <Link href="/surprise">
            <motion.button
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-full font-serif text-sm sm:text-base md:text-lg shadow-xl shadow-pink-300/40 overflow-hidden"
            >
              <span className="relative flex items-center gap-3">
                Continue
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}