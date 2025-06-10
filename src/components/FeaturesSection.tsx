
import { Card } from "@/components/ui/card";
import { 
  Smartphone, 
  Zap, 
  Shield, 
  Users, 
  Cloud, 
  Download,
  Star,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Multi-Device Support",
    description: "Kompatibel dengan semua device Android dan iOS untuk pengalaman gaming optimal"
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Tools selalu update dengan patch terbaru Free Fire untuk akurasi maksimal"
  },
  {
    icon: Shield,
    title: "100% Safe",
    description: "Semua tools aman digunakan dan tidak melanggar terms of service Free Fire"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Dikembangkan bersama komunitas pro player untuk hasil terbaik"
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description: "Sinkronisasi setting dan progress di semua device yang kamu gunakan"
  },
  {
    icon: Download,
    title: "Offline Mode",
    description: "Beberapa tools bisa digunakan offline tanpa koneksi internet"
  },
  {
    icon: Star,
    title: "Premium Features",
    description: "Akses fitur exclusive dan advanced tools untuk member premium"
  },
  {
    icon: Globe,
    title: "Global Servers",
    description: "Server tersebar di seluruh dunia untuk performa dan speed optimal"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold">
            Kenapa Pilih <span className="ff-gradient-text">FF ToolsPro+</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Platform tools gaming terpercaya dengan fitur-fitur canggih untuk meningkatkan skill bermain
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 bg-card/30 backdrop-blur border-border/30 hover:bg-card/50 hover:border-primary/30 transition-all duration-300 text-center group"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
