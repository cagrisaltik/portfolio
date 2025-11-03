import Link from "next/link"; // Next.js'in sayfa geçişleri için özel link bileşeni

export default function Navbar() {
  return (
    <nav className="p-4 border-b border-zinc-700">
      <div className="container mx-auto flex justify-between items-center">
        {/* Sol Taraf: İsim/Logo */}
        <Link href="/" className="text-xl font-bold">
          Çağrı Saltık
        </Link>

        {/* Sağ Taraf: Menü Linkleri */}
        <div className="flex items-center space-x-6">
          <Link href="/projelerim" className="hover:text-cyan-400 transition-colors">
            Projelerim
          </Link>
          <Link href="/cv" className="hover:text-cyan-400 transition-colors">
            CV
          </Link>
          <Link href="/iletisim" className="hover:text-cyan-400 transition-colors">
            İletişim
          </Link>
        </div>
      </div>
    </nav>
  );
}