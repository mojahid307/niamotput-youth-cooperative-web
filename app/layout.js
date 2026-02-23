import { Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-noto",
});

export const metadata = {
  title: "নিয়ামতপুর যুব সমবায় সমিতি লিঃ",
  description: "নিয়ামতপুর যুব সমবায় সমিতি লিঃ এর অফিসিয়াল ওয়েবসাইট। বার্ষিক অনুষ্ঠান ২০২৬ এর নিবন্ধনের জন্য ভিজিট করুন।",
  keywords: ["নিয়ামতপুর", "যুব সমবায় সমিতি", "বগুড়া", "কাহালু", "অনুষ্ঠান নিবন্ধন"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.variable} ${notoSerifBengali.variable}`} style={{ fontFamily: 'var(--font-hind), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
