import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import FadeIn from "./FadeIn";

export default function TestimonialsCarousel() {
  const { data: testimonials, isLoading } = trpc.testimonials.getApproved.useQuery();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Belum ada testimoni</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <FadeIn key={testimonial.id} delay={index * 0.1}>
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 h-full">
            <CardContent className="p-6">
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-muted-foreground mb-4 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-700 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(testimonial.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      ))}
    </div>
  );
}
