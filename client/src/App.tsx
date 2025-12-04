import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import MateriFiqih from "./pages/MateriFiqih";
import DetailMateri from "./pages/DetailMateri";
import AjukanPertanyaan from "./pages/AjukanPertanyaan";
import TanyaJawab from "./pages/TanyaJawab";
import DetailPertanyaan from "./pages/DetailPertanyaan";
import Lokasi from "./pages/Lokasi";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSettings from "./pages/AdminSettings";
import AdminUsers from "./pages/AdminUsers";
import Bookmarks from "./pages/Bookmarks";
import BeriTestimoni from "./pages/BeriTestimoni";
import UserLogin from "./pages/UserLogin";
import ProtectedRoute from "./components/ProtectedRoute";

function Router() {
  // Public routes - dapat diakses tanpa login
  // Protected routes - memerlukan login (bookmark, ajukan pertanyaan, testimoni)
  return (
    <Switch>
      {/* Auth routes */}
      <Route path={"/login"} component={UserLogin} />
      <Route path={"/admin/login"} component={AdminLogin} />
      
      {/* Public routes - bisa diakses tanpa login */}
      <Route path={"/"} component={Home} />
      <Route path="/materi-fiqih" component={MateriFiqih} />
      <Route path="/materi" component={MateriFiqih} />
      <Route path="/materi/:id" component={DetailMateri} />
      <Route path="/tanya-jawab" component={TanyaJawab} />
      <Route path="/pertanyaan/:id" component={DetailPertanyaan} />
      <Route path="/lokasi" component={Lokasi} />
      
      {/* Protected routes - memerlukan login */}
      <Route path="/ajukan-pertanyaan">
        <ProtectedRoute>
          <AjukanPertanyaan />
        </ProtectedRoute>
      </Route>
      <Route path={"/bookmarks"}>
        <ProtectedRoute>
          <Bookmarks />
        </ProtectedRoute>
      </Route>
      <Route path={"/beri-testimoni"}>
        <ProtectedRoute>
          <BeriTestimoni />
        </ProtectedRoute>
      </Route>
      
      {/* Admin routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/admin/users" component={AdminUsers} />
      
      {/* 404 */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
