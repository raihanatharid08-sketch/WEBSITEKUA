import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import SEO from "@/components/SEO";
import { KUA_NAME } from "@/const";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, Bookmark, CheckCircle2, Clock } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Bookmarks() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: bookmarks, isLoading } = trpc.bookmarks.list.useQuery(undefined, {
    enabled: !!user,
  });

  const { data: categories } = trpc.categories.list.useQuery();

  const getCategoryName = (categoryId: number) => {
    return categories?.find((c) => c.id === categoryId)?.name || "Umum";
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Pertanyaan Tersimpan" 
        description="Daftar pertanyaan fiqih yang Anda simpan"
      />
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 px-4">
            <BackButton />

            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <Bookmark className="w-8 h-8 text-primary fill-current" />
                Pertanyaan Tersimpan
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Pertanyaan fiqih yang telah Anda simpan
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : bookmarks && bookmarks.length > 0 ? (
              <div className="space-y-4">
                {bookmarks.map((bookmark) => (
                  <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant="secondary">{getCategoryName(bookmark.categoryId)}</Badge>
                            {bookmark.isAnswered ? (
                              <Badge className="gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Dijawab
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="gap-1">
                                <Clock className="w-3 h-3" />
                                Menunggu
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg md:text-xl">{bookmark.questionText}</CardTitle>
                          <p className="text-xs md:text-sm text-muted-foreground mt-2">
                            Disimpan pada {new Date(bookmark.createdAt).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/pertanyaan/${bookmark.questionId}`}>
                        <Button variant="link" className="px-0">
                          {bookmark.isAnswered ? "Lihat Jawaban" : "Lihat Detail"} →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Anda belum menyimpan pertanyaan apapun
                  </p>
                  <Link href="/tanya-jawab">
                    <Button>Jelajahi Pertanyaan</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-auto">
        <div className="container text-center text-muted-foreground text-sm">
          <p>&copy; 2024 {KUA_NAME}. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
