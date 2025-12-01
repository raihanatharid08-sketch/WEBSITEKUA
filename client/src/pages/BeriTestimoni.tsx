import { useState } from "react";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import SEO from "@/components/SEO";
import { KUA_NAME } from "@/const";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function BeriTestimoni() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);

  const createTestimonial = trpc.testimonials.create.useMutation({
    onSuccess: () => {
      toast.success("Testimoni berhasil dikirim dan menunggu persetujuan admin");
      setName("");
      setContent("");
      setRating(5);
    },
    onError: (error) => {
      toast.error(error.message || "Gagal mengirim testimoni");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Silakan login terlebih dahulu");
      return;
    }

    if (!name.trim() || !content.trim()) {
      toast.error("Nama dan testimoni harus diisi");
      return;
    }

    if (content.length < 10) {
      toast.error("Testimoni minimal 10 karakter");
      return;
    }

    createTestimonial.mutate({ name, content, rating });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO title={`Beri Testimoni - ${KUA_NAME}`} description="Bagikan pengalaman Anda menggunakan layanan KUA" />
        <Header />
        
        <main className="flex-1 py-8 md:py-12">
          <div className="container max-w-2xl">
            <BackButton />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Login Diperlukan</CardTitle>
                <CardDescription>
                  Anda harus login terlebih dahulu untuk memberikan testimoni
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href={getLoginUrl()}>Login Sekarang</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title={`Beri Testimoni - ${KUA_NAME}`} description="Bagikan pengalaman Anda menggunakan layanan KUA" />
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-2xl">
          <BackButton />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Beri Testimoni</CardTitle>
              <CardDescription>
                Bagikan pengalaman Anda menggunakan layanan {KUA_NAME}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Anda</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        onMouseEnter={() => setHoveredStar(i + 1)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            i < (hoveredStar || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rating} dari 5 bintang
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Testimoni Anda</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Ceritakan pengalaman Anda..."
                    rows={6}
                    required
                    minLength={10}
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimal 10 karakter ({content.length}/10)
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={createTestimonial.isPending}
                >
                  {createTestimonial.isPending ? "Mengirim..." : "Kirim Testimoni"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Testimoni Anda akan ditampilkan setelah disetujui oleh admin
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

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
