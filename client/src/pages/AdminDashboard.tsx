import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";
import { KUA_NAME, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, MessageCircle, CheckCircle2, Clock, User, Calendar, LogOut, Settings, Trash2, Users } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, hoverLift } from "@/lib/animations";

export default function AdminDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const utils = trpc.useUtils();
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const { data: pendingQuestions, isLoading: pendingLoading } = trpc.admin.questions.list.useQuery(
    { isAnswered: false },
    { enabled: !!user && user.role === "admin" }
  );

  const { data: answeredQuestions, isLoading: answeredLoading } = trpc.admin.questions.list.useQuery(
    { isAnswered: true },
    { enabled: !!user && user.role === "admin" }
  );

  const { data: selectedQuestionData } = trpc.admin.questions.getById.useQuery(
    { id: selectedQuestion! },
    { enabled: !!selectedQuestion }
  );

  const deleteMutation = trpc.admin.deleteQuestion.useMutation({
    onSuccess: () => {
      toast.success("Pertanyaan berhasil dihapus!");
      setDeleteConfirmId(null);
      utils.admin.questions.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menghapus pertanyaan");
    },
  });

  const answerMutation = trpc.admin.questions.answer.useMutation({
    onSuccess: () => {
      toast.success("Jawaban berhasil disimpan!");
      setSelectedQuestion(null);
      setAnswerText("");
      utils.admin.questions.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menyimpan jawaban");
    },
  });

  const handleAnswer = () => {
    if (!selectedQuestion || !answerText.trim()) {
      toast.error("Jawaban tidak boleh kosong");
      return;
    }

    answerMutation.mutate({
      questionId: selectedQuestion,
      answerText: answerText.trim(),
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Anda harus login untuk mengakses halaman admin</CardDescription>
          </CardHeader>
          <CardContent>
            <a href={getLoginUrl()}>
              <Button className="w-full">Login</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Akses Ditolak</CardTitle>
            <CardDescription>Anda tidak memiliki akses ke halaman admin</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Kembali ke Beranda</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
            <div className="px-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h2>
                  <p className="text-sm md:text-base text-muted-foreground mt-2">
                    Kelola pertanyaan dan jawaban fiqih
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                    {user.name || user.email}
                  </span>
                  <Link href="/admin/users">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Users className="w-4 h-4" />
                      <span className="hidden sm:inline">Kelola User</span>
                    </Button>
                  </Link>
                  <Link href="/admin/settings">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Settings className="w-4 h-4" />
                      <span className="hidden sm:inline">Pengaturan</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => logout()} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="pending" className="space-y-6">
              <TabsList>
                <TabsTrigger value="pending" className="gap-2">
                  <Clock className="w-4 h-4" />
                  Belum Dijawab
                  {pendingQuestions && pendingQuestions.length > 0 && (
                    <Badge variant="secondary">{pendingQuestions.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="answered" className="gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Sudah Dijawab
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {pendingLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : pendingQuestions && pendingQuestions.length > 0 ? (
                  pendingQuestions.map((question) => (
                    <Card key={question.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{question.questionText}</CardTitle>
                            <CardDescription className="flex flex-col gap-2 mt-2">
                              <div className="flex items-center gap-4 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {question.name}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(question.createdAt).toLocaleDateString("id-ID")}
                                </span>
                              </div>
                              {question.email && (
                                <div className="text-sm text-primary font-medium">
                                  📧 {question.email}
                                </div>
                              )}
                            </CardDescription>
                          </div>
                          <Button onClick={() => setSelectedQuestion(question.id)}>
                            Jawab
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Semua pertanyaan sudah dijawab!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="answered" className="space-y-4">
                {answeredLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : answeredQuestions && answeredQuestions.length > 0 ? (
                  answeredQuestions.map((question) => (
                    <Card key={question.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <Badge className="mb-2 bg-green-600 hover:bg-green-700">Terjawab</Badge>
                            <CardTitle className="text-lg">{question.questionText}</CardTitle>
                            <CardDescription className="flex flex-col gap-2 mt-2">
                              <div className="flex items-center gap-4 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {question.name}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(question.createdAt).toLocaleDateString("id-ID")}
                                </span>
                              </div>
                              {question.email && (
                                <div className="text-sm text-primary font-medium">
                                  📧 {question.email}
                                </div>
                              )}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/pertanyaan/${question.id}`}>
                              <Button variant="outline">Lihat</Button>
                            </Link>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => setDeleteConfirmId(question.id)}
                              disabled={deleteMutation.isPending}
                            >
                              {deleteMutation.isPending && deleteConfirmId === question.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Belum ada pertanyaan yang dijawab
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Answer Dialog */}
      <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Jawab Pertanyaan</DialogTitle>
            <DialogDescription>
              Berikan jawaban yang jelas dan berdasarkan dalil yang shahih
            </DialogDescription>
          </DialogHeader>

          {selectedQuestionData && (
            <div className="space-y-6">
              <div className="bg-accent/30 rounded-lg p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Pertanyaan dari {selectedQuestionData.name}</p>
                <p className="font-medium">{selectedQuestionData.questionText}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Jawaban</Label>
                <Textarea
                  id="answer"
                  placeholder="Tulis jawaban Anda di sini (mendukung Markdown)"
                  rows={10}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  {answerText.length} karakter
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setSelectedQuestion(null)}>
                  Batal
                </Button>
                <Button onClick={handleAnswer} disabled={answerMutation.isPending}>
                  {answerMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Jawaban"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pertanyaan ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Batal
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (deleteConfirmId) {
                  deleteMutation.mutate({ questionId: deleteConfirmId });
                }
              }}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2024 {KUA_NAME}. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
