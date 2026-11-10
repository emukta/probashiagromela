import { Anek_Bangla, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { SITE, VENUE, EVENT_START, EVENT_END, PHONES, OFFICE } from "@/data/site";

const anek = Anek_Bangla({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-anek",
  display: "swap",
});

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  keywords: [
    "প্রবাসী এগ্রো রিসোর্ট",
    "একক মেলা",
    "হালাল বিনিয়োগ",
    "নিরাপদ খাদ্য",
    "সুদমুক্ত বিনিয়োগ",
    "Probashi Agro Resort",
    "Probashi Agro Mela",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "bn_BD",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: SITE.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/og-image.jpg"],
  },
};

export const viewport = {
  themeColor: "#070c08",
  width: "device-width",
  initialScale: 1,
};

// Google-এ Event rich result দেখানোর জন্য structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "৩ দিনব্যাপী একক মেলা — প্রবাসী এগ্রো রিসোর্ট",
  description: SITE.description,
  startDate: EVENT_START,
  endDate: EVENT_END,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`${SITE.url}/images/poster-square.webp`],
  location: {
    "@type": "Place",
    name: VENUE.name,
    address: { "@type": "PostalAddress", streetAddress: VENUE.address, addressLocality: "Dhaka", addressCountry: "BD" },
  },
  organizer: {
    "@type": "Organization",
    name: SITE.brandEn,
    url: SITE.url,
    telephone: PHONES[0].tel,
    address: OFFICE.head,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${anek.variable} ${hind.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
