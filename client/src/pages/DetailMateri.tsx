import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { KUA_NAME } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "wouter";
import { Streamdown } from "streamdown";

export default function DetailMateri() {
  const params = useParams();
  const categoryId = parseInt(params.id || "0");

  const { data: category, isLoading: categoryLoading } = trpc.categories.getById.useQuery(
    { id: categoryId },
    { enabled: categoryId > 0 }
  );

  const { data: materials, isLoading: materialsLoading } = trpc.categories.getMaterials.useQuery(
    { categoryId },
    { enabled: categoryId > 0 }
  );

  const isLoading = categoryLoading || materialsLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 px-4">
            <BackButton to="/materi" label="Kembali ke Daftar Materi" />

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : category ? (
              <div className="space-y-8">
                {/* Category Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold">{category.name}</h2>
                      <p className="text-muted-foreground mt-2">{category.description}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Materials Content */}
                {materials && materials.length > 0 ? (
                  <div className="space-y-8">
                    {materials.map((material, index) => (
                      <Card key={material.id}>
                        <CardHeader>
                          <CardTitle className="text-2xl flex items-center gap-3">
                            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            {material.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="prose prose-sm max-w-none">
                            <Streamdown>{material.content}</Streamdown>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Materi untuk kategori ini sedang dalam proses penyusunan
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Related Questions CTA */}
                <Card className="bg-accent/30">
                  <CardContent className="py-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">Punya Pertanyaan?</h3>
                    <p className="text-muted-foreground">
                      Lihat pertanyaan terkait atau ajukan pertanyaan baru tentang {category.name}
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                      <Link href={`/tanya-jawab?category=${categoryId}`}>
                        <Button variant="outline">Lihat Pertanyaan Terkait</Button>
                      </Link>
                      <Link href="/ajukan-pertanyaan">
                        <Button>Ajukan Pertanyaan</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-destructive">Kategori tidak ditemukan</p>
                  <Link href="/materi">
                    <Button className="mt-4">Kembali</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
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
