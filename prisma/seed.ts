import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      fullName: "Tes",
      email: "tes@gmail.com",
      password: await argon2.hash("12345678"),
    },
  });

  await prisma.translation.createMany({
    data: [
      {
        language: "id",
        key: "homeParagraph",
        value:
          "Halo, saya Muhammad Isa Nuruddin seorang Web Developer yang memiliki minat besar dalam pengembangan web modern. Saya senang membangun aplikasi yang tidak hanya berfungsi dengan baik, tetapi juga memberikan pengalaman pengguna yang nyaman dan menarik. Saya terbiasa bekerja secara tim maupun mandiri dan selalu antusias mempelajari teknologi baru.",
      },
      {
        language: "en",
        key: "homeParagraph",
        value:
          "Hello, I'm Muhammad Isa Nuruddin a Web Developer with a strong passion for modern web development. I enjoy building applications that not only function well but also provide comfortable and engaging user experiences. I am capable of working both independently and collaboratively in a team, and I am always enthusiastic about learning new technologies.",
      },
      { language: "id", key: "titleNavbar", value: "Portofolio Saya" },
      { language: "en", key: "titleNavbar", value: "My Portfolio" },
      {
        language: "id",
        key: "homeWelcome",
        value: "Halo 👋, Saya Muhammad Isa Nuruddin",
      },
      {
        language: "en",
        key: "homeWelcome",
        value: "Hii 👋, Iam Muhammad Isa Nuruddin",
      },
      { language: "id", key: "menu1", value: "Beranda" },
      { language: "en", key: "menu1", value: "Home" },
      { language: "id", key: "menu2", value: "Tentang" },
      { language: "en", key: "menu2", value: "About" },
      { language: "id", key: "menu3", value: "Proyek" },
      { language: "en", key: "menu3", value: "Projects" },
      { language: "id", key: "menu4", value: "Kontak" },
      { language: "en", key: "menu4", value: "Contact" },
      { language: "id", key: "menu5", value: "Tema" },
      { language: "en", key: "menu5", value: "Theme" },
      { language: "id", key: "menu6", value: "Bahasa" },
      { language: "en", key: "menu6", value: "Language" },
      { language: "id", key: "linkHome1", value: "Unduh CV" },
      { language: "en", key: "linkHome1", value: "Download CV" },
      { language: "id", key: "linkHome2", value: "Lihat Proyek" },
      { language: "en", key: "linkHome2", value: "See Projects" },
      {
        language: "id",
        key: "aboutP1",
        value:
          "Halo, saya Muhammad Isa Nuruddin seorang Web Developer yang memiliki minat besar dalam pengembangan web modern. Saya senang membangun aplikasi yang tidak hanya berfungsi dengan baik, tetapi juga memberikan pengalaman pengguna yang nyaman dan menarik. Saya terbiasa bekerja secara tim maupun mandiri dan selalu antusias mempelajari teknologi baru.",
      },
      {
        language: "en",
        key: "aboutP1",
        value:
          "Hello, I'm Muhammad Isa Nuruddin a Web Developer with a strong passion for modern web development. I enjoy building applications that not only function well but also provide comfortable and engaging user experiences. I am capable of working both independently and collaboratively in a team, and I am always enthusiastic about learning new technologies.",
      },
      { language: "id", key: "aboutP2", value: "Proyek Selesai" },
      { language: "en", key: "aboutP2", value: "Project Result" },
      { language: "id", key: "aboutP3Years", value: "Tahun Pengalaman" },
      { language: "en", key: "aboutP3Years", value: "Year Experience" },
      { language: "id", key: "toolsH1", value: "Tools Yang Dipakai" },
      { language: "en", key: "toolsH1", value: "Tech Stack" },
      {
        language: "id",
        key: "toolsP4",
        value:
          "Berikut ini beberapa tools yang biasa saya pakai untuk pembuatan website.",
      },
      {
        language: "en",
        key: "toolsP4",
        value: "Some tools and technologies I use for building websites.",
      },
      { language: "id", key: "titleProject", value: "Proyek" },
      { language: "en", key: "titleProject", value: "Projects" },
      {
        language: "id",
        key: "projectP1",
        value: "Berikut ini beberapa proyek yang saya buat.",
      },
      {
        language: "en",
        key: "projectP1",
        value: "Here are some projects that I have built.",
      },
      { language: "id", key: "contactTitle", value: "Kontak" },
      { language: "en", key: "contactTitle", value: "Contact" },
      { language: "id", key: "contactf1", value: "Nama" },
      { language: "en", key: "contactf1", value: "Name" },
      { language: "id", key: "contactf2", value: "Email" },
      { language: "en", key: "contactf2", value: "Email" },
      { language: "id", key: "contactf3", value: "Pesan" },
      { language: "en", key: "contactf3", value: "Message" },
      { language: "id", key: "contactf4", value: "Kirim" },
      { language: "en", key: "contactf4", value: "Send" },
      { language: "id", key: "contactp1", value: "Hubungi saya" },
      { language: "en", key: "contactp1", value: "Contact Me" },
      {
        language: "id",
        key: "contactsweetalertMsgSuccess",
        value: "Pesan Berhasil Terkirim",
      },
      {
        language: "en",
        key: "contactsweetalertMsgSuccess",
        value: "Message Sent Successfully",
      },
      {
        language: "id",
        key: "notFoundTitle",
        value: "Halaman Tidak Ditemukan.",
      },
      { language: "en", key: "notFoundTitle", value: "Page Not Found" },
      {
        language: "id",
        key: "notFoundDesc",
        value: "Halaman yang Anda cari tidak ditemukan.",
      },
      {
        language: "en",
        key: "notFoundDesc",
        value: "The page you are looking for does not exist.",
      },
      { language: "id", key: "goHome", value: "Kembali ke beranda" },
      { language: "en", key: "goHome", value: "Back to home" },
    ],
  });

  console.log("Users seeded");
  console.log("Translations seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
