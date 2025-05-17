import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const imageAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold"
            variants={fadeInUp}
          >
            Hi, I'm <span className="text-primary-600 dark:text-primary-400">John Doe</span>
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300"
            variants={fadeInUp}
          >
            Software Engineer | Web Developer
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400"
            variants={fadeInUp}
          >
            Passionate about creating beautiful and functional web applications
            with modern technologies.
          </motion.p>
          <motion.div 
            className="flex space-x-4"
            variants={fadeInUp}
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="ml-2" size={20} />
              </motion.span>
            </motion.a>
            <motion.a
              href="#projects"
              className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div 
          className="relative"
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full h-64 mx-auto md:h-96 flex items-center justify-center">
            {/* Abstract geometric shapes */}
            <div className="relative w-full h-full max-w-md">
              {/* Large circle */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 rounded-full border-8 border-primary-500/30 dark:border-primary-400/30"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              
              {/* Medium circle */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-56 md:h-56 rounded-full border-4 border-primary-600/40 dark:border-primary-500/40"
                animate={{ 
                  rotate: -360
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Small circle */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-primary-700/50 dark:border-primary-600/50"
                animate={{ 
                  rotate: 360
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Floating squares */}
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i}
                  className={`absolute w-6 h-6 md:w-8 md:h-8 rounded-md bg-primary-${400 + (i * 100)}/40`}
                  style={{
                    top: `${20 + (i * 10)}%`,
                    left: `${15 + (i * 12)}%`,
                    rotate: `${i * 15}deg`
                  }}
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: 360,
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ 
                    y: {
                      duration: 3 + (i * 0.5),
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    rotate: {
                      duration: 10 + (i * 2),
                      repeat: Infinity,
                      ease: "linear"
                    },
                    opacity: {
                      duration: 4 + (i * 0.5),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />
              ))}
              
              {/* Core element */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 bg-primary-600 dark:bg-primary-500 rounded-lg"
                animate={{ 
                  rotate: [0, 45, 0, -45, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}