// src/components/RepoKart.tsx
'use client';

import Link from "next/link";
import { FaStar, FaCode } from "react-icons/fa";
import { 
  motion, 
  useMotionValue, 
  useTransform 
} from "framer-motion";
import React, { useRef } from "react"; 

interface RepoKartProps {
  name: string;
  description: string | null;
  html_url: string; // RepoList'ten filtrelenmiş geldiği için 'string'
  language: string | null;
  stargazers_count: number;
}

// RepoList tarafından tetiklenecek giriş animasyonu
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function RepoKart({
  name,
  description,
  html_url,
  language,
  stargazers_count,
}: RepoKartProps) {
  
  const ref = useRef<HTMLDivElement>(null); 

  // --- YENİ ANİMASYON ---
  // Sadece fare X pozisyonunu (yatay) takip edeceğiz
  const x = useMotionValue(0);

  // x pozisyonunu Y-ekseni rotasyonuna dönüştüreceğiz
  // Kartın merkezinden +/- 150px sapma, +/- 20 derece rotasyona denk gelecek
  const rotateY = useTransform(x, [-150, 150], [-20, 20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    
    // Kartın merkezine göre fare X pozisyonu
    const rect = ref.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - (rect.width / 2);
    
    x.set(mouseX);
  };

  const handleMouseLeave = () => {
    x.set(0); // Fare ayrılınca rotasyonu sıfırla
  };

  return (
    // --- YENİ MİMARİ: Link dışarıda, motion.div içeride ---
    // Bu, tıklama ve animasyon çakışmasını %100 çözer
    <Link
      href={html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block" // Link'in bir blok olarak yer kaplamasını sağlar
    >
      <motion.div
        ref={ref}
        className="h-full block p-6 bg-zinc-800 border border-zinc-700 rounded-lg shadow 
                   transition-all"
        
        // 1. Giriş Animasyonu
        variants={itemVariants} 
        
        // 2. Yeni 3D Rotasyon (Sadece Y ekseni)
        style={{
          perspective: "1000px", // 3D etkisi için
          rotateY: rotateY,      // Sadece 'rotateY'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        whileHover={{ scale: 1.05, z: 10 }} // Üzerine gelince hafifçe büyüsün
      >
        {/* Kart içeriği */}
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-cyan-400">
          {name}
        </h5>
        <p className="font-normal text-gray-300 mb-4 h-12 overflow-hidden">
          {description || "Açıklama bulunmuyor."}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            {language && (
              <span className="flex items-center">
                <FaCode className="mr-1" /> {language}
              </span>
            )}
          </div>
          <span className="flex items-center">
            <FaStar className="mr-1 text-yellow-400" /> {stargazers_count}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}