import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { KUA_NAME, KUA_WHATSAPP } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function AjukanPertanyaan() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [questionText, setQuestionText] = useState("");

  const { data: categories, isLoading: categoriesLoading } = trpc.categories.list.useQuery();
  const submitMutation = trpc.questions.submit.useMutation({
    onSuccess: () => {
      toast.success("Pertanyaan berhasil dikirim! Kami akan segera menjawabnya.");
      setName("");
      setCategoryId("");
      setQuestionText("");
      setTimeout(() => setLocation("/tanya-jawab"), 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Gagal mengirim pertanyaan. Silakan coba lagi.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Nama harus diisi");
      return;
    }
    if (!categoryId) {
      toast.error("Kategori harus dipilih");
      return;
    }
    if (!questionText.trim()) {
      toast.error("Pertanyaan harus diisi");
      return;
    }

    submitMutation.mutate({
      name: name.trim(),
      email: undefined,
      categoryId: parseInt(categoryId),
      questionText: questionText.trim(),
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Ajukan Pertanyaan" 
        description="Ajukan pertanyaan fiqih Anda kepada ustadz kami. Dapatkan jawaban yang tepat dan terpercaya untuk masalah fiqih sehari-hari."
        keywords="ajukan pertanyaan fiqih, konsultasi ustadz, tanya fiqih, pertanyaan islam"
      />
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
            <div className="space-y-4 text-center px-4">
              <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold">Ajukan Pertanyaan Fiqih</h2>
              <p className="text-sm md:text-lg text-muted-foreground">
                Sampaikan pertanyaan fiqih Anda dan kami akan menjawabnya secepatnya
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Form Pertanyaan</CardTitle>
                <CardDescription>
                  Isi form di bawah ini dengan lengkap. Pertanyaan Anda akan dijawab oleh ustadz kami.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori Fiqih *</Label>
                    <Select value={categoryId} onValueChange={setCategoryId} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesLoading ? (
                          <div className="p-4 text-center">
                            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                          </div>
                        ) : (
                          categories?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="question">Pertanyaan *</Label>
                    <Textarea
                      id="question"
                      placeholder="Tulis pertanyaan fiqih Anda di sini"
                      rows={6}
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      {questionText.length} karakter
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      "Kirim Pertanyaan"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="bg-accent/30 rounded-lg p-6 text-center space-y-4">
              <h3 className="text-lg md:text-xl font-bold">Butuh Jawaban Cepat?</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Untuk pertanyaan mendesak, hubungi kami langsung via WhatsApp
              </p>
              <a href={`https://wa.me/${KUA_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Phone className="w-4 h-4" />
                  Hubungi via WhatsApp
                </Button>
              </a>
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
