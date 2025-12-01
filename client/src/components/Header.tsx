import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useAuth } from "@/_core/hooks/useAuth";
import { KUA_NAME } from "@/const";
import { Menu, Shield, Bookmark, LogOut, User } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      toast.success("Logout berhasil");
      window.location.href = "/login";
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <User className="w-4 h-4" />
          {user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <User className="mr-2 h-4 w-4" />
          {user?.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const NavLinks = ({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) => (
    <>
      <Link href="/materi" onClick={onNavigate}>
        <Button 
          variant={isActive("/materi") ? "default" : "ghost"}
          size={mobile ? "default" : "sm"}
          className={mobile ? "w-full justify-start" : ""}
        >
          Materi Fiqih
        </Button>
      </Link>
      <Link href="/tanya-jawab" onClick={onNavigate}>
        <Button 
          variant={isActive("/tanya-jawab") ? "default" : "ghost"}
          size={mobile ? "default" : "sm"}
          className={mobile ? "w-full justify-start" : ""}
        >
          Tanya Jawab
        </Button>
      </Link>
      <Link href="/lokasi" onClick={onNavigate}>
        <Button 
          variant={isActive("/lokasi") ? "default" : "ghost"}
          size={mobile ? "default" : "sm"}
          className={mobile ? "w-full justify-start" : ""}
        >
          Lokasi
        </Button>
      </Link>

      {user && (
        <Link href="/bookmarks" onClick={onNavigate}>
          <Button 
            variant={isActive("/bookmarks") ? "default" : "ghost"}
            className={mobile ? "w-full justify-start gap-2" : "gap-2"}
          >
            <Bookmark className="w-4 h-4" />
            Tersimpan
          </Button>
        </Link>
      )}
      {user?.role === "admin" && (
        <Link href="/admin" onClick={onNavigate}>
          <Button 
            variant={isActive("/admin") ? "default" : "ghost"}
            className={mobile ? "w-full justify-start gap-2" : "gap-2"}
          >
            <Shield className="w-4 h-4" />
            Admin
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/logo-kua.png" alt="Logo KUA" className="w-16 h-16 object-contain" />
            <div className="hidden sm:block">
              <h1 className="font-bold text-base lg:text-lg">{KUA_NAME}</h1>
            </div>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 lg:gap-2 items-center">
          <NavLinks />
          {user && <UserMenu />}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="default" size="sm" className="gap-2">
              <Menu className="h-4 w-4" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
            <SheetDescription className="sr-only">
              Navigasi utama website KUA Pecalungan
            </SheetDescription>
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/" onClick={() => setOpen(false)}>
                <div className="flex items-center gap-2 mb-6">
                  <img src="/logo-kua.png" alt="Logo KUA" className="w-16 h-16 object-contain" />
                  <h2 className="font-bold text-sm">{KUA_NAME}</h2>
                </div>
              </Link>
              <NavLinks mobile onNavigate={() => setOpen(false)} />
              {user && (
                <>
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm font-medium px-2 mb-2">Akun</p>
                    <p className="text-xs text-muted-foreground px-2 mb-2">{user.email}</p>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 text-red-600"
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
