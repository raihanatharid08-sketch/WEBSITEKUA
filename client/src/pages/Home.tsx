import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { KUA_NAME, KUA_WHATSAPP, KUA_EMAIL } from "@/const";
import { BookOpen, MessageCircle, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import FadeIn from "@/components/FadeIn";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, hoverScale, hoverLift, floating } from "@/lib/animations";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO />
      <Header />

        {/* Hero Section with Islamic Design */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"
        >
          {/* Islamic Geometric Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="islamic-stars" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                  <circle cx="60" cy="60" r="40" fill="none" stroke="#059669" strokeWidth="2"/>
                  <path d="M60 20 L70 50 L100 50 L75 70 L85 100 L60 80 L35 100 L45 70 L20 50 L50 50 Z" fill="#059669" opacity="0.3"/>
                  <circle cx="60" cy="60" r="15" fill="none" stroke="#059669" strokeWidth="1.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#islamic-stars)"/>
            </svg>
          </div>
          
          {/* Decorative Mosque Silhouette */}
          <div className="absolute bottom-0 left-0 right-0 opacity-5">
            <svg viewBox="0 0 1200 300" className="w-full h-32 md:h-48" preserveAspectRatio="none">
              <path d="M0 300 L0 200 Q200 150 400 200 L400 300 M400 200 Q500 180 600 200 L600 300 M600 200 Q800 150 1000 200 L1000 300 M1000 200 Q1100 180 1200 200 L1200 300" fill="#059669"/>
              <ellipse cx="200" cy="150" rx="40" ry="60" fill="#059669"/>
              <ellipse cx="600" cy="130" rx="50" ry="80" fill="#047857"/>
              <ellipse cx="1000" cy="150" rx="40" ry="60" fill="#059669"/>
              <rect x="590" y="60" width="20" height="70" fill="#047857"/>
            </svg>
          </div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6 px-4">
            <FadeIn>
              {/* Bismillah Decoration */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6 border border-emerald-200">
                <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span className="text-sm md:text-base font-semibold text-emerald-800">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
                <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-700 bg-clip-text text-transparent leading-tight mb-4">
                Tanya Jawab Fiqih Islam
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-base md:text-lg text-muted-foreground px-2">
                Dapatkan jawaban fiqih dari ustadz terpercaya untuk kehidupan sehari-hari Anda
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
              <Link href="/ajukan-pertanyaan">
                <Button size="lg" className="gap-2 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                  <MessageCircle className="w-5 h-5" />
                  Ajukan Pertanyaan
                </Button>
              </Link>
              <Link href="/materi">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto border-2 hover:border-primary shadow-lg">
                  <BookOpen className="w-5 h-5" />
                  Pelajari Materi
                </Button>
              </Link>
              </div>
            </FadeIn>
          </div>
        </div>      </motion.section>

      {/* Contact Info Section */}
      <section className="py-8 md:py-12 bg-white border-b relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="50" cy="50" r="10" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600">
            <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
              <motion.div
                variants={staggerItem}
                whileHover={{ ...hoverLift, ...hoverScale }}
                className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 shadow-md hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-emerald-300 group cursor-pointer"
              >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">Lokasi</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Kecamatan Pecalungan, Batang, Jawa Tengah
                    </p>
                  </div>
                </motion.div>
              <motion.div
                variants={staggerItem}
                whileHover={{ ...hoverLift, ...hoverScale }}
                className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 shadow-md hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-emerald-300 group cursor-pointer"
              >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">WhatsApp</h4>
                    <a href={`https://wa.me/${KUA_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline break-all">
                      +{KUA_WHATSAPP}
                    </a>
                  </div>
                </motion.div>
              <motion.div
                variants={staggerItem}
                whileHover={{ ...hoverLift, ...hoverScale }}
                className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 shadow-md hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-emerald-300 group cursor-pointer"
              >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">Email</h4>
                    <a href={`mailto:${KUA_EMAIL}`} className="text-xs text-primary hover:underline break-all">
                      {KUA_EMAIL}
                    </a>
                  </div>
                </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container">
          <FadeIn>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 px-4 bg-gradient-to-r from-primary to-green-700 bg-clip-text text-transparent">Layanan Kami</h3>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <FadeIn delay={0.1}>
              <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-white to-primary/5 h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Materi Fiqih Lengkap</CardTitle>
                  <CardDescription>
                    Pelajari fiqih dasar dari Thaharah, Shalat, Zakat, Puasa, Haji, Muamalah, hingga Munakahat
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/materi">
                    <Button variant="link" className="px-0 text-primary font-semibold">
                      Lihat Materi →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-white to-primary/5 h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Tanya Jawab Ustadz</CardTitle>
                  <CardDescription>
                    Ajukan pertanyaan fiqih Anda dan dapatkan jawaban dari ustadz yang berpengalaman
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/ajukan-pertanyaan">
                    <Button variant="link" className="px-0 text-primary font-semibold">
                      Ajukan Pertanyaan →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-white to-primary/5 h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Lokasi KUA</CardTitle>
                  <CardDescription>
                    Temukan lokasi kantor KUA kami dan hubungi kami melalui WhatsApp atau email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/lokasi">
                    <Button variant="link" className="px-0 text-primary font-semibold">
                      Lihat Lokasi →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-primary/5">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-green-700 bg-clip-text text-transparent">
                Testimoni Jamaah
              </h2>
              <p className="text-muted-foreground">
                Apa kata mereka yang telah menggunakan layanan kami
              </p>
            </div>
          </FadeIn>
          <TestimonialsCarousel />
          <FadeIn delay={0.3}>
            <div className="text-center mt-8">
              <Link href="/beri-testimoni">
                <Button size="lg" variant="outline" className="border-2 hover:border-primary shadow-lg">
                  Beri Testimoni
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-r from-primary via-green-600 to-primary overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white rounded-full" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 px-4">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Butuh Bantuan Segera?</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-white/90">
                Hubungi kami langsung melalui WhatsApp atau email untuk pertanyaan mendesak
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="gap-2 bg-white text-primary hover:bg-white/90 shadow-xl">
                  <a href={`https://wa.me/${KUA_WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2 border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl">
                  <a href={`mailto:${KUA_EMAIL}`}>
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-background/80 backdrop-blur">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 {KUA_NAME}. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
