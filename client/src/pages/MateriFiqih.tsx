import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import SEO from "@/components/SEO";
import { KUA_NAME } from "@/const";
import { trpc } from "@/lib/trpc";
import { BookOpen, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { getCategoryIllustration } from "@/lib/categoryIllustrations";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, hoverScale, hoverLift } from "@/lib/animations";

export default function MateriFiqih() {
  const { data: categories, isLoading } = trpc.categories.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Materi Fiqih" 
        description="Pelajari berbagai topik fiqih Islam untuk kehidupan sehari-hari. Materi lengkap tentang Thaharah, Shalat, Zakat, Puasa, Haji, Muamalah, dan Munakahat."
        keywords="materi fiqih, thaharah, shalat, zakat, puasa, haji, muamalah, munakahat, fiqih islam"
      />
      <Header />

      {/* Hero Section with Islamic Pattern */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-12 md:py-16 overflow-hidden"
      >
        {/* Islamic Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0 L100 50 L50 100 L0 50 Z M25 25 L50 50 L75 25 M25 75 L50 50 L75 75" stroke="#059669" strokeWidth="2" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
          </svg>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 px-4">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Materi Fiqih Lengkap</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              Materi Fiqih Dasar
            </h1>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Pelajari berbagai topik fiqih Islam untuk kehidupan sehari-hari Anda. Setiap kategori berisi penjelasan lengkap dan contoh praktis.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 py-8 md:py-12 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div className="px-4 mb-6">
              <BackButton to="/" />
            </div>

            {isLoading && (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {!isLoading && categories && categories.length > 0 && (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={staggerItem}
                    whileHover={{ ...hoverLift, scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full group hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-emerald-300 overflow-hidden bg-white cursor-pointer">
                    {/* Ilustrasi Kategori */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100">
                      <img 
                        src={getCategoryIllustration(category.slug)} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML += '<div class="w-full h-full flex items-center justify-center"><div class="w-20 h-20 bg-emerald-600/20 rounded-full flex items-center justify-center"><svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg></div></div>';
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      {/* Islamic Corner Pattern */}
                      <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                          <path d="M0 0 L100 0 L100 100 Z" fill="currentColor"/>
                        </svg>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-bold text-emerald-800 group-hover:text-emerald-600 transition-colors">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="mt-2 text-gray-600 line-clamp-2">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <Link href={`/materi/${category.id}`}>
                          <Button variant="default" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Pelajari Materi
                          </Button>
                        </Link>
                        <Link href={`/tanya-jawab?category=${category.id}`}>
                          <Button variant="outline" className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                            Lihat Pertanyaan
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="bg-accent/30 rounded-lg p-6 md:p-8 text-center space-y-4">
              <h3 className="text-xl md:text-2xl font-bold">Punya Pertanyaan?</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Jika Anda memiliki pertanyaan spesifik tentang fiqih, jangan ragu untuk mengajukannya kepada kami.
              </p>
              <Link href="/ajukan-pertanyaan">
                <Button size="lg">Ajukan Pertanyaan</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2024 {KUA_NAME}. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
