// src/components/PageWrapper.tsx
'use client'; // Bu component client-side'da çalışır

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation'; // Sayfa yolunu almak için

interface PageWrapperProps {
  children: React.ReactNode;
}

// Ortak sayfa geçiş varyantları
const pageTransitionVariants = {
  initial: { opacity: 0, x: -100 }, // Başlangıç pozisyonu (solda)
  animate: { opacity: 1, x: 0 },     // Geliş pozisyonu (ortada)
  exit: { opacity: 0, x: 100 }        // Çıkış pozisyonu (sağda)
};

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname(); // Mevcut sayfa yolunu al

  return (
    // AnimatePresence, bir çocuk kaldırıldığında animasyonunu tetikler (exit)
    <AnimatePresence mode="wait"> 
      <motion.div
        // pathname'i key olarak kullanmak, Next.js'e her yol değiştiğinde
        // bu component'i yeni bir component olarak algılamasını söyler.
        // Bu, AnimatePresence'in çıkış animasyonunu tetiklemesini sağlar.
        key={pathname}
        variants={pageTransitionVariants}
        initial="initial" // Giriş animasyonu (initial -> animate)
        animate="animate"
        exit="exit"       // Çıkış animasyonu (exit)
        transition={{ 
          duration: 0.5, 
          ease: "easeInOut" 
        }}
        // Sayfanın yükseklik değişimlerinden kaynaklı anlık kaymaları engellemek için
        className="w-full" 
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}