
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, Zap, Trophy, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-background to-background"></div>
      <div className="container relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-orbitron font-black tracking-tight">
              <span className="ff-gradient-text">FF ToolsPro+</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-rajdhani">
              Ultimate Free Fire Tools Collection
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tingkatkan skill gaming kamu dengan koleksi tools terlengkap untuk Free Fire. 
              Dari sensitivity calculator hingga rank tracker - semua ada di sini!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="ff-gradient hover:opacity-90 text-black font-semibold text-lg px-8 py-6 glow-effect"
            >
              <Zap className="w-5 h-5 mr-2" />
              Mulai Sekarang
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Lihat Tools
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:glow-effect transition-all duration-300">
              <div className="text-center space-y-2">
                <Target className="w-8 h-8 ff-gradient-text mx-auto" />
                <h3 className="font-semibold">Accuracy Tools</h3>
                <p className="text-sm text-muted-foreground">Tingkatkan akurasi</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:glow-effect transition-all duration-300">
              <div className="text-center space-y-2">
                <Zap className="w-8 h-8 ff-gradient-text mx-auto" />
                <h3 className="font-semibold">Sensitivity</h3>
                <p className="text-sm text-muted-foreground">Setting optimal</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:glow-effect transition-all duration-300">
              <div className="text-center space-y-2">
                <Trophy className="w-8 h-8 ff-gradient-text mx-auto" />
                <h3 className="font-semibold">Rank Tracker</h3>
                <p className="text-sm text-muted-foreground">Monitor progress</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:glow-effect transition-all duration-300">
              <div className="text-center space-y-2">
                <Users className="w-8 h-8 ff-gradient-text mx-auto" />
                <h3 className="font-semibold">Team Tools</h3>
                <p className="text-sm text-muted-foreground">Squad optimizer</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
