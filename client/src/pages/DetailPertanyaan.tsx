import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { KUA_NAME } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, User, Calendar } from "lucide-react";
import BookmarkButton from "@/components/BookmarkButton";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link, useParams } from "wouter";
import { Streamdown } from "streamdown";

export default function DetailPertanyaan() {
  const params = useParams();
  const questionId = parseInt(params.id || "0");
  const { user } = useAuth();

  const { data: questionData, isLoading, error } = trpc.questions.getPublished.useQuery(
    { id: questionId },
    { enabled: questionId > 0 }
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6 px-4">
            <div className="flex justify-between items-center">
              <Link href="/tanya-jawab">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Daftar Pertanyaan
                </Button>
              </Link>
              {user && <BookmarkButton questionId={questionId} />}
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-destructive">Pertanyaan tidak ditemukan</p>
                  <Link href="/tanya-jawab">
                    <Button className="mt-4">Kembali</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : questionData ? (
              <div className="space-y-6">
                {/* Question Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline">{questionData.category?.name}</Badge>
                      <Badge className="bg-green-600 hover:bg-green-700">Terjawab</Badge>
                    </div>
                    <CardTitle className="text-2xl">Pertanyaan</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {questionData.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(questionData.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-base leading-relaxed whitespace-pre-wrap">
                        {questionData.questionText}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Answer Section */}
                {questionData.answers && questionData.answers.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Jawaban Ustadz</h3>
                      {questionData.answers.map((answer) => (
                        <Card key={answer.id} className="bg-accent/30">
                          <CardHeader>
                            <CardDescription>
                              Dijawab pada{" "}
                              {new Date(answer.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="prose prose-sm max-w-none">
                              <Streamdown>{answer.answerText}</Streamdown>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}

                {/* CTA */}
                <Card className="bg-primary/5">
                  <CardContent className="py-8 text-center space-y-4">
                    <h3 className="text-xl font-bold">Punya Pertanyaan Lain?</h3>
                    <p className="text-muted-foreground">
                      Jangan ragu untuk mengajukan pertanyaan fiqih Anda kepada kami
                    </p>
                    <Link href="/ajukan-pertanyaan">
                      <Button>Ajukan Pertanyaan</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ) : null}
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
