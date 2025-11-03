// src/app/iletisim/page.tsx
'use client'; // <-- Form state'i ve gönderimi için şart

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

export default function IletisimPage() {
  // Form verilerini tutmak için state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Formun gönderim durumunu tutmak için state
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: '',
  });

  // Animasyon varyantları (CV sayfasındaki gibi)
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = { // <-- DÜZELTME BURADA
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

  // Formdaki her değişiklikte state'i güncelle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    setStatus({ loading: true, success: false, error: '' });

    try {
      // Henüz oluşturmadığımız API rotamıza veriyi gönder
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Bir sorun oluştu. Lütfen tekrar deneyin.');
      }

      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' }); // Formu sıfırla

    } catch (error: any) {
      setStatus({ loading: false, success: false, error: error.message });
    }
  };

  return (
    // Bu zaten bir motion.div olduğu için ekstra bir sarmalayıcıya gerek yok.
    <motion.div
      className="max-w-2xl mx-auto mt-12 p-10 bg-zinc-800 rounded-2xl shadow-xl border border-zinc-700"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-4xl font-bold mb-6 text-center text-cyan-400"
        variants={itemVariants}
      >
        İletişime Geçin
      </motion.h1>
      
      <motion.p 
        className="text-lg text-gray-300 mb-10 text-center"
        variants={itemVariants}
      >
        Aşağıdaki formu doldurarak bana e-posta gönderebilirsiniz.
      </motion.p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={itemVariants}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Adınız Soyadınız
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            E-posta Adresiniz
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Mesajınız
          </label>
          <textarea
            name="message"
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <motion.button
            type="submit"
            disabled={status.loading} // Gönderim sırasında butonu kilitle
            className="px-10 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-700 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={status.loading ? {} : { scale: 1.05 }}
            whileTap={status.loading ? {} : { scale: 0.95 }}
          >
            {status.loading ? 'Gönderiliyor...' : 'Gönder'}
          </motion.button>
        </motion.div>
      </form>

      {/* Başarı veya Hata Mesajları */}
      {status.success && (
        <motion.p 
          className="mt-6 text-center text-green-400"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          Mesajınız başarıyla gönderildi. Teşekkür ederim!
        </motion.p>
      )}
      {status.error && (
        <motion.p 
          className="mt-6 text-center text-red-400"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          {status.error}
        </motion.p>
      )}
    </motion.div>
  );
}
