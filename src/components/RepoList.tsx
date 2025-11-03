// src/components/RepoList.tsx
'use client';

import { motion } from 'framer-motion';
import RepoKart from './RepoKart';

// Tip tanımı
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string | null; // API'den null gelebilir
  language: string | null;
  stargazers_count: number;
}

export default function RepoList({ repos }: { repos: Repo[] }) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // --- DÜZELTME BURADA (SİZDE ZATEN MEVCUT) ---
         // Sayfa geçiş animasyonunun (0.5s) bitmesini bekle
        staggerChildren: 0.1 // Sonra kartları sırayla göstermeye başla
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      style={{ transformStyle: 'preserve-3d' }} 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* --- FİLTRELEME --- */}
      {repos
        .filter(repo => repo.html_url) // 'null' veya 'undefined' olanları ayıkla
        .map((repo) => (
          <RepoKart
            key={repo.id}
            name={repo.name}
            description={repo.description}
            html_url={repo.html_url!} // Filtrelendiği için 'null' olmayacak
            language={repo.language}
            stargazers_count={repo.stargazers_count}
          />
        ))}
    </motion.div>
  );
}