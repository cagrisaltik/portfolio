// src/components/Footer.tsx
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // GitHub ve LinkedIn ikonları

export default function Footer() {
  // Lütfen bu linkleri kendi profil linklerinizle güncelleyin
  const GITHUB_LINK = "https://github.com/cagrisaltik";
  const LINKEDIN_LINK = "https://www.linkedin.com/in/cagrisaltik/"; // Örnek link

  return (
    <footer className="mt-16 py-8 border-t border-zinc-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">

        {/* Sol Taraf: Copyright */}
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Çağrı Saltık. Tüm hakları saklıdır.
        </p>

        {/* Sağ Taraf: Sosyal Medya İkonları */}
        <div className="flex items-center space-x-6">
          <Link
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            aria-label="GitHub Profilim"
          >
            <FaGithub size={24} /> {/* 24px boyutunda ikon */}
          </Link>

          <Link
            href={LINKEDIN_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn Profilim"
          >
            <FaLinkedin size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}