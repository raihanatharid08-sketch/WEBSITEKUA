import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEO from "@/components/SEO";
import { KUA_NAME } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, Shield } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: () => {
      toast.success("Login berhasil! Mengalihkan ke dashboard...");
      setTimeout(() => {
        setLocation("/admin");
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message || "Login gagal. Periksa email dan password Anda.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error("Email dan password harus diisi");
      return;
    }

    loginMutation.mutate({ email: email.trim(), password: password.trim() });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Login Admin" 
        description="Halaman login untuk admin KUA Pecalungan"
      />
      {/* Simple Header */}
      <header className="border-b py-4">
        <div className="container">
          <div className="flex items-center justify-center gap-2">
            <img src="/logo-kua.png" alt="Logo KUA" className="w-16 h-16 object-contain" />
            <h1 className="font-bold text-lg">{KUA_NAME}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Login Admin</CardTitle>
            <CardDescription>
              Masuk sebagai ustadz untuk mengelola pertanyaan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ustadz@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2024 {KUA_NAME}. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
