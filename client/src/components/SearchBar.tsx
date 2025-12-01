import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: results, isLoading } = trpc.search.global.useQuery(
    { query },
    { enabled: query.length >= 2 }
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (type: string, id: number) => {
    setShowResults(false);
    setQuery("");
    
    if (type === "question") {
      setLocation(`/pertanyaan/${id}`);
    } else if (type === "material") {
      // Get category slug from results
      const material = results?.materials.find(m => m.id === id);
      if (material) {
        setLocation(`/materi/${material.categoryId}`);
      }
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari pertanyaan atau materi..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          className="pl-10 pr-4"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && query.length >= 2 && results && (
        <div className="absolute top-full mt-2 w-full bg-background border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.questions.length === 0 && results.materials.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Tidak ada hasil ditemukan
            </div>
          ) : (
            <>
              {/* Questions */}
              {results.questions.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                    Pertanyaan ({results.questions.length})
                  </div>
                  {results.questions.map((q) => (
                    <button
                      key={`q-${q.id}`}
                      onClick={() => handleResultClick("question", q.id)}
                      className="w-full text-left px-3 py-2 hover:bg-accent rounded-md transition-colors"
                    >
                      <div className="font-medium text-sm line-clamp-1">
                        {q.questionText}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {q.categoryName} • {q.askerName}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Materials */}
              {results.materials.length > 0 && (
                <div className="p-2 border-t">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                    Materi ({results.materials.length})
                  </div>
                  {results.materials.map((m) => (
                    <button
                      key={`m-${m.id}`}
                      onClick={() => handleResultClick("material", m.id)}
                      className="w-full text-left px-3 py-2 hover:bg-accent rounded-md transition-colors"
                    >
                      <div className="font-medium text-sm line-clamp-1">
                        {m.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {m.categoryName}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
