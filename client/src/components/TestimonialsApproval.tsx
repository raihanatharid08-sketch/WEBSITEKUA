import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

export default function TestimonialsApproval() {
  const utils = trpc.useUtils();
  
  const { data: pendingTestimonials, isLoading } = trpc.testimonials.getPending.useQuery();
  
  const approveMutation = trpc.testimonials.approve.useMutation({
    onSuccess: () => {
      toast.success("Testimoni berhasil disetujui");
      utils.testimonials.getPending.invalidate();
      utils.testimonials.getApproved.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menyetujui testimoni");
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!pendingTestimonials || pendingTestimonials.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Testimoni Menunggu Persetujuan</CardTitle>
          <CardDescription>
            Belum ada testimoni yang menunggu persetujuan
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimoni Menunggu Persetujuan</CardTitle>
        <CardDescription>
          {pendingTestimonials.length} testimoni menunggu persetujuan Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="border rounded-lg p-4 space-y-3">
              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm">"{testimonial.content}"</p>

              {/* Author & Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-green-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(testimonial.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={() => approveMutation.mutate({ id: testimonial.id })}
                  disabled={approveMutation.isPending}
                  className="gap-2"
                >
                  {approveMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Setujui
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
