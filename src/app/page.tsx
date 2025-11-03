// src/app/page.tsx
'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react'; // React import'unu ekledik (MouseEvent tipi için gerekli)

export default function HomePage() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const transformedX = useTransform(x, (value) => value - 150);
  const transformedY = useTransform(y, (value) => value - 150);

  const handleMouseMove = (event: React.MouseEvent) => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  return (
    // --- DÜZELTME: EN DIŞTAKİ <motion.div> SİLİNDİ ---
    // Artık 'PageWrapper' animasyonu ile çakışmayacak
    <div
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ height: 'calc(100vh - 150px)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Fare imleci takip eden ışık efekti div'i */}
      <motion.div
        className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full opacity-70 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.3) 0%, rgba(0,0,0,0) 50%)',
          filter: 'blur(80px)',
          x: transformedX,
          y: transformedY,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
      />

      {/* Başlık ve alt başlık */}
      <div className="relative z-10">
        <motion.h1
          className="text-5xl font-bold md:text-6xl lg:text-7xl mb-4"
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, x: -50 },
              // Gecikmeleri 0.5s (sayfa geçişi) + 0.3s = 0.8s yaptık
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.8 } },
            }}
          >
            Merhaba, Ben 
          </motion.span>
          
          <motion.span
            className="inline-block text-cyan-400 ml-2" 
            variants={{
              hidden: { opacity: 0, x: 50 },
              // Gecikmeleri 0.5s (sayfa geçişi) + 0.3s = 0.8s yaptık
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.8 } },
            }}
          >
            Çağrı 
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-4 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // Gecikmeyi 0.5s (sayfa geçişi) + 0.7s = 1.2s yaptık
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          IT Specialist'im ve bu benim portföy sitem. 
          Projelerimi ve yeteneklerimi keşfetmeye hazır mısınız?
        </motion.p>
      </div>
    </div>
  );
}