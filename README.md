# probashiagromela.com — প্রবাসী এগ্রো রিসোর্ট ৩ দিনব্যাপী একক মেলা

Next.js 16 (App Router, static export) · React 19 · Tailwind CSS v4 · Framer Motion · Lenis smooth scroll — শুধু JavaScript, TypeScript নেই।

## চালানো

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # পুরো static সাইট তৈরি হবে out/ ফোল্ডারে
```

## হোস্টিং (Cloudflare Pages / Netlify / cPanel)

- **Cloudflare Pages:** Build command `npm run build`, Output directory `out`
- **cPanel / যেকোনো হোস্টিং:** `npm run build` করে `out/` ফোল্ডারের সব ফাইল `public_html`-এ আপলোড করুন

## কনটেন্ট বদলানো

সব লেখা, ফোন নম্বর, তারিখ, অফার, ছবির তালিকা এক ফাইলে: **`data/site.js`**

- মেলা শুরুর সময় (কাউন্টডাউন): `EVENT_START` — এখন সকাল ১০টা (ঢাকা সময়) ধরা আছে
- ছবি: `public/images/` (সব WebP-তে optimize করা)
- ভিডিও: `VIDEOS` (লিংক ও শিরোনাম)
- রেজিস্ট্রেশন ফর্ম যে WhatsApp নম্বরে যাবে: `WHATSAPP`

## ফোল্ডার

```
app/          layout.js (SEO, ফন্ট, Event schema), page.js, globals.css (রং/থিম)
components/   প্রতিটি সেকশন আলাদা ফাইলে (Hero, Days, Speakers, Offers ...)
data/site.js  সব কনটেন্ট
public/       ছবি, robots.txt, sitemap.xml
```

## অ্যানিমেশন যা আছে

প্রিলোডার কাউন্টার · শব্দ ধরে মাস্ক রিভিল · হিরো প্যারালাক্স · স্ক্রল-স্ক্রাব টেক্সট · sticky stacking কার্ড · কার্সর-ফলো প্রিভিউ ছবি ·
3D tilt স্পিকার কার্ড · pinned horizontal গ্যালারি · spotlight অফার কার্ড · clip-path ইমেজ রিভিল · shared-layout লাইটবক্স (সোয়াইপ সহ) ·
ম্যাগনেটিক বাটন · লাইভ কাউন্টডাউন। `prefers-reduced-motion` চালু থাকলে অ্যানিমেশন কমে যায়।
