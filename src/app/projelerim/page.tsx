// src/app/projelerim/page.tsx

// --- DÜZELTME 1: 'motion' import edildi ---
import { motion } from "framer-motion"; 
import RepoList from "@/components/RepoList";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string | null;
  language: string | null;
  stargazers_count: number;
}

async function getRepos(username: string): Promise<Repo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`, {
      next: { revalidate: 3600 } 
    });
    if (!res.ok) {
      throw new Error('GitHub API\'sinden veri alınamadı.');
    }
    const data = await res.json();
    return data as Repo[];
  } catch (error) {
    console.error(error);
    return []; 
  }
}

export default async function ProjelerimPage() {
  const GITHUB_KULLANICI_ADI = "cagrisaltik"; 
  
  const repos = await getRepos(GITHUB_KULLANICI_ADI);

  return (
    // --- DÜZELTME 2: <div>, <motion.div> olarak değiştirildi ---
    // Bu, 'AnimatePresence' için tutarlılık sağlar.
    <div> 
      <h1 className="text-4xl font-bold mb-8">Projelerim</h1>

      {repos.length > 0 ? (
        <RepoList repos={repos} />
      ) : (
        <p className="text-lg text-gray-300">
          Gösterilecek proje bulunamadı veya API'dan veri çekilemedi.
        </p>
      )}
    </div>
  );
}