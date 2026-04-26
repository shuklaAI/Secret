import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

const images = [
  { src: "/aanchal1.jpg", id: 1 },
  { src: "/aanchal2.jpg", id: 2 },
  { src: "/aanchal3.jpg", id: 3 },
];

function ImageCard({ src, index }: { src: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
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

export default function Story() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 px-4">
        <header ref={headerRef} className="text-center py-12 sm:py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
            </motion.div>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-400" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 leading-tight px-4"
          >
            here's Ur time
          </motion.h1>
        </header>

        <div className="space-y-10 pb-16">
          {images.map((img, idx) => (
            <ImageCard key={img.id} src={img.src} index={idx} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center py-16 sm:py-20 px-4"
        >
          <Link href="/memories">
            <motion.button
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-full font-serif text-sm sm:text-base md:text-lg shadow-xl shadow-pink-300/40 overflow-hidden"
            >
              <span className="relative flex items-center gap-3">
                Little memories
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