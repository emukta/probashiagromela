// ============================================================
//  সাইটের সব কনটেন্ট এক জায়গায় — এখান থেকে লেখা/নম্বর/ছবি বদলান
// ============================================================

export const SITE = {
  domain: "probashiagromela.com",
  url: "https://probashiagromela.com",
  name: "প্রবাসী এগ্রো মেলা",
  brand: "প্রবাসী এগ্রো রিসোর্ট",
  brandEn: "Probashi Resort & Agro Industries",
  title: "৩ দিনব্যাপী একক মেলা — প্রবাসী এগ্রো রিসোর্ট",
  description:
    "হালাল উপার্জন ও শতভাগ নিরাপদ খাদ্যের নিশ্চয়তায় প্রবাসী এগ্রো রিসোর্টের ৩ দিনব্যাপী বিশেষ একক মেলা — ১৭, ১৮ ও ১৯ নভেম্বর, ব্লু লোটাস চাইনিজ রেস্টুরেন্ট, দক্ষিণ যাত্রাবাড়ী।",
  slogan: "সুদমুক্ত জীবন গড়ি, হালাল পথে আয় করি",
  tagline: "নিরাপদ খাদ্য, সুস্থ জীবন",
};

// মেলা শুরুর সময় (ঢাকা সময়)। শুরুর ঘণ্টা বদলাতে চাইলে শুধু এখানে বদলান।
export const EVENT_START = "2026-11-17T10:00:00+06:00";
export const EVENT_END = "2026-11-19T22:00:00+06:00";

export const PHONES = [
  { label: "+৮৮ ০১৭৫৫-৫৭০৬৫০", tel: "+8801755570650" },
  { label: "+৮৮ ০১৭৫৫-৫৭০৬৫১", tel: "+8801755570651" },
];

export const SOCIAL = {
  facebookResort: "https://www.facebook.com/ProbashiResortAgro/",
  facebookQari: "https://www.facebook.com/QariNazmulHasan",
};

export const VENUE = {
  name: "ব্লু লোটাস চাইনিজ রেস্টুরেন্ট",
  address: "৩২২/এ, দক্ষিণ যাত্রাবাড়ী (যাত্রাবাড়ী থানার পাশে)",
  city: "ঢাকা",
  mapQuery: "Blue Lotus Chinese Restaurant, Jatrabari, Dhaka",
};

export const OFFICE = {
  head: "৪৫, তোপখানা রোড, ট্রপিকানা টাওয়ার (৮ম তলা), পুরানা পল্টন, ঢাকা-১০০০",
  project: "শিবপাশা, আজমিরীগঞ্জ, হবিগঞ্জ",
};

export const NAV = [
  { href: "#about", label: "পরিচিতি" },
  { href: "#videos", label: "ভিডিও" },
  { href: "#speakers", label: "অতিথি" },
  { href: "#offers", label: "উপহার" },
  { href: "#project", label: "প্রজেক্ট" },
  { href: "#venue", label: "স্থান" },
];

// রেজিস্ট্রেশন ফর্মের তথ্য এই WhatsApp নম্বরে যাবে (দেশের কোড সহ, + ছাড়া)
export const WHATSAPP = "8801916803293";

// ভিডিও — শিরোনাম ইচ্ছেমতো বদলে নিন
export const VIDEOS = [
  { src: "https://media.shafiqalislam.tech/probashi-mela.mp4", title: "একক মেলার আমন্ত্রণ", tag: "ভিডিও ০১" },
  { src: "https://media.shafiqalislam.tech/probashi-mela2.mp4", title: "প্রবাসী এগ্রো রিসোর্টের কথা", tag: "ভিডিও ০২" },
  { src: "https://media.shafiqalislam.tech/probashi-mela3.mp4", title: "হালাল বিনিয়োগের পথচলা", tag: "ভিডিও ০৩" },
];

export const MARQUEE = [
  "হালাল উপার্জন",
  "শতভাগ নিরাপদ খাদ্য",
  "সুদমুক্ত বিনিয়োগ",
  "১৮০ বিঘার সবুজ প্রকল্প",
  "প্রকৃতির সান্নিধ্য",
  "বরকতময় আয়",
];

export const STATS = [
  { value: 180, suffix: "", label: "বিঘা জায়গাজুড়ে প্রকল্প" },
  { value: 3, suffix: "", label: "দিনব্যাপী একক মেলা" },
  { value: 20, suffix: "", label: "জনের জন্য বিশেষ উপহার" },
  { value: 100, suffix: "%", label: "নিরাপদ খাদ্যের অঙ্গীকার" },
];

export const LEARN = [
  {
    no: "০১",
    title: "পরিবারের জন্য শতভাগ নিরাপদ খাদ্য",
    text: "কীভাবে আপনার পরিবারের জন্য ভেজালমুক্ত, শতভাগ নিরাপদ খাদ্য নিশ্চিত করবেন — মাঠ থেকে সরাসরি আপনার টেবিলে।",
    image: "/images/duck-sunset.webp",
  },
  {
    no: "০২",
    title: "হালাল ও বরকতময় ইনকাম",
    text: "সুদের ছায়া ছাড়া, মাটির সাথে সম্পর্ক রেখে কীভাবে এই প্রকল্প থেকে হালাল ও বরকতময় আয় আসবে — সম্পূর্ণ ধারণা সরাসরি।",
    image: "/images/duck-team.webp",
  },
  {
    no: "০৩",
    title: "সম্পূর্ণ প্রজেক্টের সরাসরি ধারণা",
    text: "হবিগঞ্জের আজমিরীগঞ্জে আমাদের সবুজ প্রকল্পের পুরো মডেলটি মেলায় আপনাদের সামনে তুলে ধরা হবে।",
    image: "/images/pond-sunset.webp",
  },
];

export const DAYS = [
  { day: "১৭", month: "নভেম্বর", weekday: "মঙ্গলবার", label: "প্রথম দিন" },
  { day: "১৮", month: "নভেম্বর", weekday: "বুধবার", label: "দ্বিতীয় দিন" },
  { day: "১৯", month: "নভেম্বর", weekday: "বৃহস্পতিবার", label: "তৃতীয় দিন" },
];

export const SPEAKERS = [
  {
    name: "কারী নাজমুল হাসান",
    prefix: "শায়েখ",
    role: "চেয়ারম্যান, প্রবাসী এগ্রো রিসোর্ট",
    bio: "আন্তর্জাতিক কারী ও বহু বিশ্বজয়ী হাফেজের ওস্তাদ।",
    image: "/images/qari-studio.webp",
    hover: "/images/qari-portrait.webp",
    link: "https://www.facebook.com/QariNazmulHasan",
  },
  {
    name: "মোঃ শফিকুল ইসলাম",
    prefix: "জনাব",
    role: "ব্যবস্থাপনা পরিচালক, প্রবাসী এগ্রো রিসোর্ট",
    bio: "“নিরাপদ খাদ্য, সুস্থ জীবন — এটাই হোক আমাদের অঙ্গীকার।”",
    image: "/images/md-speaking.webp",
    hover: "/images/md-poster.webp",
    link: "https://www.facebook.com/ProbashiResortAgro/",
  },
];

export const QARI_GALLERY = [
  { src: "/images/qari-bangladesh.webp", caption: "আন্তর্জাতিক মঞ্চে বাংলাদেশের প্রতিনিধিত্ব" },
  { src: "/images/qari-intl-award.webp", caption: "আন্তর্জাতিক কুরআন প্রতিযোগিতার মঞ্চে" },
  { src: "/images/qari-tv-judge.webp", caption: "টেলিভিশন কুরআন প্রতিযোগিতার বিচারক প্যানেলে" },
  { src: "/images/qari-students.webp", caption: "প্রিয় ছাত্রদের সাথে" },
  { src: "/images/qari-students-group.webp", caption: "হাফেজ ছাত্রদের সাথে" },
];

export const OFFERS = [
  {
    shares: "১০",
    title: "পবিত্র ওমরাহ ও মিশর ভ্রমণ",
    duration: "১০ রাত ১১ দিন",
    icon: "kaaba",
    tone: "gold",
  },
  {
    shares: "৫",
    title: "মালয়েশিয়া ভ্রমণ",
    duration: "৪ রাত ৫ দিন",
    icon: "plane",
    tone: "lime",
  },
  {
    shares: "১",
    title: "গ্র্যান্ড সুলতান হোটেলে অবকাশ",
    duration: "২ রাত ৩ দিন",
    icon: "hotel",
    tone: "cream",
  },
];

export const MOMENTS = [
  { src: "/images/award-plaque.webp", caption: "সম্মাননা প্রদান", span: "wide" },
  { src: "/images/duck-sunset.webp", caption: "হাঁস পালন প্রকল্প পরিদর্শন", span: "tall" },
  { src: "/images/leaders-event.webp", caption: "প্রবাসী পরিবারের অনুষ্ঠানে", span: "" },
  { src: "/images/handover.webp", caption: "প্রকল্পের কাগজপত্র হস্তান্তর", span: "tall" },
  { src: "/images/md-speaking.webp", caption: "অনুষ্ঠানে বক্তব্য", span: "wide" },
  { src: "/images/pond-sunset.webp", caption: "প্রকল্প এলাকায় সূর্যাস্ত", span: "tall" },
  { src: "/images/poster-square.webp", caption: "আমি আসছি, আপনি আসছেন তো?", span: "" },
  { src: "/images/poster-maroon.webp", caption: "একক মেলা — অফিসিয়াল পোস্টার", span: "tall" },
  { src: "/images/poster-flyer.webp", caption: "মেলার উপহার ও অফার", span: "tall" },
];
