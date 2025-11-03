// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// POST isteğini işleyecek fonksiyon
export async function POST(request: Request) {
  try {
    // Formdan gelen verileri JSON olarak al
    const { name, email, message } = await request.json();

    // .env.local dosyasından güvenli bilgileri çek
    const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;

    // Bilgiler eksikse hata ver
    if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
      throw new Error('E-posta yapılandırma bilgileri eksik.');
    }

    // Nodemailer 'taşıyıcısını' (transporter) ayarla
    // Gmail için standart ayarlar
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS, // Burası Google Uygulama Şifresi
      },
    });

    // E-posta içeriğini ayarla
    const mailOptions = {
      from: `"${name}" <${EMAIL_USER}>`, // Gönderen adı (formu dolduran kişi gibi)
      replyTo: email,                   // Cevapla dediğimizde form sahibine gitsin
      to: EMAIL_TO,                     // E-postanın gideceği yer (bizim adresimiz)
      subject: `Portföy Sitesinden Yeni Mesaj: ${name}`,
      html: `
        <h1>Portföy Sitenizden Yeni Bir Mesaj Aldınız</h1>
        <p><strong>Gönderen:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <hr>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // E-postayı gönder
    await transporter.sendMail(mailOptions);

    // Başarılı olursa istemciye (frontend'e) haber ver
    return NextResponse.json(
      { message: 'Mesaj başarıyla gönderildi.' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error(error); // Sunucu konsoluna hatayı yazdır
    // Başarısız olursa istemciye haber ver
    return NextResponse.json(
      { error: 'Mesaj gönderilirken bir hata oluştu: ' + error.message },
      { status: 500 }
    );
  }
}