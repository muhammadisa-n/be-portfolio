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
      { language: "id", key: "projecta1", value: "Demo Langsung" },
      { language: "en", key: "projecta1", value: "Live Demo" },
      { language: "id", key: "projecta2", value: "Link Proyek" },
      { language: "en", key: "projecta2", value: "Project Link" },
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

  await prisma.tool.createMany({
    data: [
      {
        name: "Javascript",
        description: "Javascript",
        image_id: "portfolio/tools-images/a39yz9z1q6figc6vyonv",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/a39yz9z1q6figc6vyonv.png",
        tool_url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        dad: 100,
        sort_order: 1,
        type: "language",
        show: true,
      },
      {
        name: "PHP",
        description: "PHP",
        image_id: "portfolio/tools-images/o8g3mmg7qmec3mufim5c",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/o8g3mmg7qmec3mufim5c.png",
        tool_url: "https://www.php.net/",
        dad: 200,
        sort_order: 1,
        type: "language",
        show: true,
      },
      {
        name: "Python",
        description: "Python",
        image_id: "portfolio/tools-images/edznrjbcjumm9fqubvkd",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778743850/portfolio/tools-images/edznrjbcjumm9fqubvkd.png",
        tool_url: "https://www.python.org/",
        dad: 300,
        sort_order: 1,
        type: "language",
        show: true,
      },
      {
        name: "Typescript",
        description: "Typescript",
        image_id: "portfolio/tools-images/g4q0uruew8lqegi7kxzl",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/g4q0uruew8lqegi7kxzl.png",
        tool_url:
          "https://developer.mozilla.org/en-US/docs/Glossary/TypeScript",
        dad: 400,
        sort_order: 1,
        type: "language",
        show: true,
      },
      {
        name: "Node JS",
        description: "Node JS",
        image_id: "portfolio/tools-images/kcgbw9muancivohovtco",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/kcgbw9muancivohovtco.png",
        tool_url: "https://nodejs.org/",
        dad: 500,
        sort_order: 2,
        type: "runtime",
        show: true,
      },
      {
        name: "Adonis JS",
        description: "Adonis Js",
        image_id: "portfolio/tools-images/gsiy2v2gm9lobjpbknks",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/gsiy2v2gm9lobjpbknks.png",
        tool_url: "https://adonisjs.com/",
        dad: 600,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "Bootstrap",
        description: "Bootstrap",
        image_id: "portfolio/tools-images/ab6soit5zjeardmpxhfz",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/ab6soit5zjeardmpxhfz.png",
        tool_url: "http://getbootstrap.com/",
        dad: 700,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "CodeIgniter",
        description: "CodeIgniter",
        image_id: "portfolio/tools-images/w9cunrneeb3frqesu2nt",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/w9cunrneeb3frqesu2nt.png",
        tool_url: "https://codeigniter.com/",
        dad: 800,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "Express JS",
        description: "Express JS",
        image_id: "portfolio/tools-images/slfx0iwmm1s76fcpwa1p",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/slfx0iwmm1s76fcpwa1p.png",
        tool_url: "https://expressjs.com/",
        dad: 100,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "Flask",
        description: "Flask",
        image_id: "portfolio/tools-images/aebvanhonlyuppdewxto",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778743906/portfolio/tools-images/aebvanhonlyuppdewxto.png",
        tool_url: "https://flask.palletsprojects.com/en/stable/",
        dad: 200,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "Flutter",
        description: "Flutter",
        image_id: "portfolio/tools-images/ged9grbdwfigqm9pjvix",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778744167/portfolio/tools-images/ged9grbdwfigqm9pjvix.png",
        tool_url: "hhttps://flutter.dev/",
        dad: 300,
        sort_order: 3,
        type: "framework",
        show: false,
      },
      {
        name: "Laravel",
        description: "Laravel",
        image_id: "portfolio/tools-images/gbavl7ljdul1rsokgzqk",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/gbavl7ljdul1rsokgzqk.png",
        tool_url: "https://laravel.com/",
        dad: 400,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "Nest JS",
        description: "Nest JS",
        image_id: "portfolio/tools-images/vomprnwyguckzloqnkny",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778744043/portfolio/tools-images/vomprnwyguckzloqnkny.png",
        tool_url: "https://nestjs.com/",
        dad: 500,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "Next JS",
        description: "Next JS",
        image_id: "portfolio/tools-images/mxerrthgz0htfyqwbtjr",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778695270/portfolio/tools-images/mxerrthgz0htfyqwbtjr.png",
        tool_url: "http://nextjs.org/",
        dad: 600,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "Nuxt JS",
        description: "Nuxt JS",
        image_id: "portfolio/tools-images/gwahpcpz0fzst45lxipp",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778744449/portfolio/tools-images/gwahpcpz0fzst45lxipp.png",
        tool_url: "https://nuxt.com/",
        dad: 700,
        sort_order: 3,
        type: "framework",
        show: false,
      },
      {
        name: "React JS",
        description: "React JS",
        image_id: "portfolio/tools-images/ly1uwsj5ygeatywlali0",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/ly1uwsj5ygeatywlali0.png",
        tool_url: "https://react.dev/",
        dad: 800,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "Tailwind CSS",
        description: "Tailwind CSS",
        image_id: "portfolio/tools-images/xfm62otrufulncmqppep",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/xfm62otrufulncmqppep.png",
        tool_url: "https://tailwindcss.com/",
        dad: 100,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "Vue JS",
        description: "Vue JS",
        image_id: "portfolio/tools-images/xotwivbdiupwlqfmcb8d",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/xotwivbdiupwlqfmcb8d.png",
        tool_url: "https://vuejs.org/",
        dad: 200,
        sort_order: 3,
        type: "framework",
        show: true,
      },
      {
        name: "MongoDB",
        description: "MongoDB",
        image_id: "portfolio/tools-images/biwmzi6cugwwdtlju1bl",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778744309/portfolio/tools-images/biwmzi6cugwwdtlju1bl.png",
        tool_url: "https://www.mongodb.com/",
        dad: 300,
        sort_order: 4,
        type: "database",
        show: false,
      },
      {
        name: "MySQL",
        description: "MySQL",
        image_id: "portfolio/tools-images/hlrctjuyyqishzjkgfn0",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/hlrctjuyyqishzjkgfn0.png",
        tool_url: "https://www.mysql.com/",
        dad: 400,
      },
      {
        name: "Oracle",
        description: "Oracle",
        image_id: "portfolio/tools-images/oqxohdlai06yho1ksbr9",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778744274/portfolio/tools-images/oqxohdlai06yho1ksbr9.png",
        tool_url: "https://www.oracle.com/asean/database/",
        dad: 500,
        sort_order: 4,
        type: "database",
        show: true,
      },
      {
        name: "PostgresSQL",
        description: "PostgresSQL",
        image_id: "portfolio/tools-images/xsbnjzucftzqkd4vjaww",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778744243/portfolio/tools-images/xsbnjzucftzqkd4vjaww.png",
        tool_url: "https://www.postgresql.org/",
        dad: 600,
        sort_order: 4,
        type: "database",
        show: false,
      },
      {
        name: "Github",
        description: "Github",
        image_id: "portfolio/tools-images/jdc7qs3bggkxjzjdamwy",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/jdc7qs3bggkxjzjdamwy.png",
        tool_url: "https://github.com/",
        dad: 700,
        sort_order: 5,
        type: "tools",
        show: true,
      },
      {
        name: "Gitlab",
        description: "Gitlab",
        image_id: "portfolio/tools-images/w7pt0jqkjbgicytbywht",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778746811/portfolio/tools-images/w7pt0jqkjbgicytbywht.png",
        tool_url: "https://gitlab.com/gitlab-com",
        dad: 800,
        sort_order: 5,
        type: "tools",
        show: true,
      },
      {
        name: "Postman",
        description: "Postman",
        image_id: "portfolio/tools-images/bpsoipznbpr4h3jta8tw",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778744345/portfolio/tools-images/bpsoipznbpr4h3jta8tw.png",
        tool_url: "https://www.postman.com/",
        dad: 100,
        sort_order: 5,
        type: "tools",
        show: true,
      },
      {
        name: "Visual Studio Code",
        description: "Visual Studio Code",
        image_id: "portfolio/tools-images/ltxftr0f1oofbhx2ggwp",
        image_url:
          "https://res.cloudinary.com/dahdvag/image/upload/v1778693965/portfolio/tools-images/ltxftr0f1oofbhx2ggwp.png",
        tool_url: "https://code.visualstudio.com/",
        dad: 200,
        sort_order: 5,
        type: "tools",
        show: true,
      },
    ],
  });

  console.log("Tools seeded");
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
