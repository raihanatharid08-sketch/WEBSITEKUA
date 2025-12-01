import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { KUA_NAME, KUA_ADDRESS, KUA_WHATSAPP, KUA_EMAIL, KUA_MAPS_LINK } from "@/const";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Lokasi() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Lokasi KUA" 
        description="Lokasi dan kontak KUA Kecamatan Pecalungan. Kunjungi kantor kami atau hubungi melalui WhatsApp dan email."
        keywords="lokasi kua pecalungan, alamat kua, kontak kua, kantor kua"
      />
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
            <div className="text-center space-y-4 px-4">
              <MapPin className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold">Lokasi Kantor KUA</h2>
              <p className="text-sm md:text-lg text-muted-foreground">
                Kunjungi kantor kami atau hubungi melalui kontak di bawah ini
              </p>
            </div>

            {/* Map Embed */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.0!2d109.7!3d-6.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMDAuMCJTIDEwOcKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi KUA Pecalungan"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <MapPin className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Alamat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{KUA_ADDRESS}</p>
                  <a href={KUA_MAPS_LINK} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Buka di Google Maps
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Hubungi kami via WhatsApp untuk respon cepat
                  </p>
                  <a href={`https://wa.me/${KUA_WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2">
                      <Phone className="w-4 h-4" />
                      Chat WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Mail className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Kirim email untuk pertanyaan atau informasi
                  </p>
                  <a href={`mailto:${KUA_EMAIL}`}>
                    <Button variant="outline" className="w-full gap-2">
                      <Mail className="w-4 h-4" />
                      Kirim Email
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Office Hours */}
            <Card className="bg-accent/30">
              <CardHeader>
                <CardTitle>Jam Operasional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Senin - Kamis</p>
                    <p className="text-muted-foreground">08:00 - 15:00 WIB</p>
                  </div>
                  <div>
                    <p className="font-semibold">Jumat</p>
                    <p className="text-muted-foreground">08:00 - 11:00 WIB</p>
                  </div>
                  <div>
                    <p className="font-semibold">Sabtu</p>
                    <p className="text-muted-foreground">08:00 - 13:00 WIB</p>
                  </div>
                  <div>
                    <p className="font-semibold">Minggu & Hari Libur</p>
                    <p className="text-muted-foreground">Tutup</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
