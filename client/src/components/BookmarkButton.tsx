import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

interface BookmarkButtonProps {
  questionId: number;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function BookmarkButton({ questionId, variant = "outline", size = "sm" }: BookmarkButtonProps) {
  const utils = trpc.useUtils();
  
  const { data: bookmarkStatus } = trpc.bookmarks.check.useQuery({ questionId });
  
  const toggleBookmark = trpc.bookmarks.toggle.useMutation({
    onSuccess: (data) => {
      utils.bookmarks.check.invalidate({ questionId });
      utils.bookmarks.list.invalidate();
      toast.success(data.bookmarked ? "Pertanyaan disimpan" : "Bookmark dihapus");
    },
    onError: () => {
      toast.error("Gagal menyimpan bookmark");
    },
  });

  const handleToggle = () => {
    toggleBookmark.mutate({ questionId });
  };

  const isBookmarked = bookmarkStatus?.bookmarked || false;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      disabled={toggleBookmark.isPending}
      className="gap-2"
    >
      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
      {size !== "icon" && (isBookmarked ? "Tersimpan" : "Simpan")}
    </Button>
  );
}
