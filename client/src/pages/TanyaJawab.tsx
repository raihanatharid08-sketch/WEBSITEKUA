import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { KUA_NAME } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, MessageCircle, CheckCircle2, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useSearch } from "wouter";
import { useState, useMemo } from "react";

export default function TanyaJawab() {
  const searchParams = useSearch();
  const urlCategoryId = new URLSearchParams(searchParams).get("category");
  
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategoryId || "all");
  const [filterAnswered, setFilterAnswered] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: categories } = trpc.categories.list.useQuery();
  
  const queryFilters = useMemo(() => {
    const filters: { categoryId?: number; isAnswered?: boolean; isPublished: boolean } = { isPublished: true };
    if (selectedCategory !== "all") {
      filters.categoryId = parseInt(selectedCategory);
    }
    if (filterAnswered === "answered") {
      filters.isAnswered = true;
    } else if (filterAnswered === "unanswered") {
      filters.isAnswered = false;
    }
    return filters;
  }, [selectedCategory, filterAnswered]);

  const { data: questions, isLoading } = trpc.questions.listPublished.useQuery(queryFilters);

  // Filter questions by search query
  const filteredQuestions = useMemo(() => {
    if (!questions) return [];
    if (!searchQuery.trim()) return questions;
    
    const query = searchQuery.toLowerCase();
    return questions.filter((q) => 
      q.questionText.toLowerCase().includes(query) ||
      q.name.toLowerCase().includes(query)
    );
  }, [questions, searchQuery]);

  const getCategoryName = (categoryId: number) => {
    return categories?.find((c) => c.id === categoryId)?.name || "Umum";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <SEO 
        title="Tanya Jawab Fiqih" 
        description="Jelajahi pertanyaan dan jawaban seputar fiqih Islam. Ajukan pertanyaan Anda dan dapatkan jawaban dari ustadz terpercaya."
        keywords="tanya jawab fiqih, pertanyaan fiqih, jawaban ustadz, konsultasi fiqih, fatwa islam"
      />
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Pertanyaan Saya</h2>
                <p className="text-sm md:text-base text-muted-foreground mt-2">
                  Lihat pertanyaan yang telah Anda ajukan dan jawabannya
                </p>
              </div>
              <Link href="/ajukan-pertanyaan">
                <Button className="gap-2 w-full sm:w-auto">
                  <MessageCircle className="w-4 h-4" />
                  Ajukan Pertanyaan
                </Button>
              </Link>
            </div>

            {/* Search */}
            <div className="relative px-4">
              <Input
                placeholder="Cari pertanyaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <MessageCircle className="w-4 h-4 absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 px-4">
              <div className="flex-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={filterAnswered} onValueChange={setFilterAnswered}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="answered">Sudah Dijawab</SelectItem>
                    <SelectItem value="unanswered">Belum Dijawab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Questions List */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {!isLoading && filteredQuestions && filteredQuestions.length > 0 && (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <Card key={question.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant="secondary">{getCategoryName(question.categoryId)}</Badge>
                            {question.isAnswered ? (
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
                          <CardTitle className="text-lg md:text-xl">{question.questionText}</CardTitle>
                          <p className="text-xs md:text-sm text-muted-foreground mt-2">
                            Ditanyakan oleh {question.name} • {new Date(question.createdAt).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/pertanyaan/${question.id}`}>
                        <Button variant="link" className="px-0">
                          {question.isAnswered ? "Lihat Jawaban" : "Lihat Detail"} →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && (!filteredQuestions || filteredQuestions.length === 0) && (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? "Tidak ada pertanyaan yang cocok dengan pencarian" : "Belum ada pertanyaan"}
                  </p>
                  <Link href="/ajukan-pertanyaan">
                    <Button className="mt-4">Ajukan Pertanyaan Pertama</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container text-center text-muted-foreground text-sm">
          <p>&copy; 2024 {KUA_NAME}. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
