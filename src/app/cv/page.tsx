// src/app/cv/page.tsx
'use client'; // <-- Animasyonlar için bu satır şart!

import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa'; // Buton için indirme ikonu

export default function CVPage() {
  // Lütfen public klasörüne attığınız dosyanın adını buraya yazın
  const cvDosyaAdi = "CV.pdf"; 

  // 1. Ana kart için animasyon (Kapsayıcı)
  // Bu, içindeki elemanların (çocukların) sırayla gelmesini de tetikleyecek
  const cardContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        when: "beforeChildren", // Önce bu kapsayıcı, sonra çocuklar
        staggerChildren: 0.2 // Çocuklar (h1, p, a) arası 0.2sn gecikme olacak
      }
    }
  };

  // 2. İçerideki elemanlar için animasyon (h1, p, a)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 } // Esnek bir animasyon
    }
  };

  return (
    // İçeriği ortalayan, kart görünümü veren ve animasyonu başlatan ana div
    // Bu zaten bir motion.div olduğu için ekstra bir sarmalayıcıya gerek yok.
    <motion.div
      className="max-w-2xl mx-auto mt-12 p-10 bg-zinc-800 rounded-2xl shadow-xl border border-zinc-700 text-center"
      variants={cardContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-4xl font-bold mb-6 text-cyan-400"
        variants={itemVariants}
      >
        Özgeçmişim (CV)
      </motion.h1>
      
      <motion.p 
        className="text-lg text-gray-300 mb-10" // Boşluğu biraz artırdık
        variants={itemVariants}
      >
        Aşağıdaki butondan güncel özgeçmişimi PDF olarak indirebilirsiniz.
      </motion.p>
      
      {/* Butonu da animasyonlu hale getirdik ve ikon ekledik */}
      <motion.a
        href={`/${cvDosyaAdi}`}
        download
        className="inline-flex items-center justify-center px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-700 transition-all transform"
        variants={itemVariants}
        // Üzerine gelince ve tıklayınca ekstra "niş" dokunuşlar
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0px 0px 15px rgba(6, 182, 212, 0.5)" // Cyan renginde bir parlama
        }}
        whileTap={{ scale: 0.95 }}
      >
        <FaDownload className="mr-3" /> {/* İkon ve boşluk */}
        CV İndir (PDF)
      </motion.a>
    </motion.div>
  );
}