import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import SEO from "@/components/SEO";
import { KUA_NAME } from "@/const";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, Shield, Activity } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import TestimonialsApproval from "@/components/TestimonialsApproval";

export default function AdminSettings() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Get admin logs
  const { data: logs, isLoading: logsLoading } = trpc.admin.logs.useQuery(undefined, {
    enabled: user?.role === "admin",
  });

  // Change password mutation (placeholder - akan diimplementasikan nanti)
  const changePasswordMutation = trpc.admin.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Password berhasil diubah");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      toast.error(error.message || "Gagal mengubah password");
    },
  });

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Password tidak cocok");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password minimal 8 karakter");
      return;
    }
    changePasswordMutation.mutate({ newPassword });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    setLocation("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Pengaturan Admin" 
        description="Pengaturan dan log aktivitas admin"
      />
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6 px-4">
            <BackButton to="/admin" label="Kembali ke Dashboard" />

            <div className="space-y-2">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Pengaturan Admin
              </h2>
              <p className="text-muted-foreground">
                Kelola pengaturan akun dan lihat aktivitas admin
              </p>
            </div>

            <Tabs defaultValue="password" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="password">Ubah Password</TabsTrigger>
                <TabsTrigger value="logs">Log Aktivitas</TabsTrigger>
                <TabsTrigger value="testimonials">Testimoni</TabsTrigger>
              </TabsList>

              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Ubah Password Admin</CardTitle>
                    <CardDescription>
                      Ubah password untuk meningkatkan keamanan akun
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Password Baru</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimal 8 karakter"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ketik ulang password baru"
                      />
                    </div>
                    <Button
                      onClick={handleChangePassword}
                      disabled={changePasswordMutation.isPending || !newPassword || !confirmPassword}
                    >
                      {changePasswordMutation.isPending && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      Ubah Password
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logs">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Log Aktivitas Admin
                    </CardTitle>
                    <CardDescription>
                      Riwayat aktivitas admin untuk audit trail
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {logsLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : logs && logs.length > 0 ? (
                      <div className="space-y-4">
                        {logs.map((log) => (
                          <div key={log.id} className="border-b pb-4 last:border-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">
                                  {log.action === "LOGIN" && "Login Admin"}
                                  {log.action === "ANSWER_QUESTION" && "Menjawab Pertanyaan"}
                                  {log.action === "CHANGE_PASSWORD" && "Mengubah Password"}
                                </p>
                                {log.details && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {log.action === "ANSWER_QUESTION" && `ID Pertanyaan: ${JSON.parse(log.details).questionId}`}
                                    {log.action === "LOGIN" && `Email: ${JSON.parse(log.details).email}`}
                                  </p>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(log.createdAt).toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        Belum ada log aktivitas
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials">
                <TestimonialsApproval />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-auto">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2024 {KUA_NAME}. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
