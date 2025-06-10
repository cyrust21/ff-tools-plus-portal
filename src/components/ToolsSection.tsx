import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Crosshair, 
  Settings, 
  Trophy, 
  Users, 
  Gamepad2, 
  Zap, 
  Star,
  TrendingUp,
  Shield,
  Sword,
  Headphones
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    id: 1,
    title: "Sensitivity Calculator",
    description: "Hitung sensitivity yang perfect untuk device kamu",
    icon: Settings,
    category: "Settings",
    popular: true,
    features: ["All devices", "DPI converter", "Export settings"],
    route: "/sensitivity-calculator"
  },
  {
    id: 2,
    title: "Headshot Trainer",
    description: "Latih kemampuan headshot dengan simulator interaktif",
    icon: Target,
    category: "Training",
    popular: true,
    features: ["Practice mode", "Score tracking", "Different targets"],
    route: null
  },
  {
    id: 3,
    title: "Rank Calculator",
    description: "Hitung berapa match yang dibutuhkan untuk naik rank",
    icon: Trophy,
    category: "Ranking",
    popular: false,
    features: ["All ranks", "RP calculator", "Season tracker"],
    route: "/rank-calculator"
  },
  {
    id: 4,
    title: "Crosshair Designer",
    description: "Buat dan customize crosshair sesuai keinginan",
    icon: Crosshair,
    category: "Visual",
    popular: false,
    features: ["Custom colors", "Size adjuster", "Preview mode"],
    route: null
  },
  {
    id: 5,
    title: "Squad Analyzer",
    description: "Analisis performa tim dan strategi terbaik",
    icon: Users,
    category: "Team",
    popular: true,
    features: ["Team stats", "Role optimizer", "Strategy tips"],
    route: null
  },
  {
    id: 6,
    title: "Weapon Stats",
    description: "Database lengkap stats semua weapon di FF",
    icon: Sword,
    category: "Database",
    popular: false,
    features: ["All weapons", "Damage chart", "Compare tools"],
    route: null
  },
  {
    id: 7,
    title: "Audio Optimizer",
    description: "Setting audio optimal untuk competitive gaming",
    icon: Headphones,
    category: "Audio",
    popular: false,
    features: ["EQ presets", "Direction audio", "Footstep enhance"],
    route: null
  },
  {
    id: 8,
    title: "Performance Monitor",
    description: "Monitor FPS, ping, dan performa device real-time",
    icon: TrendingUp,
    category: "Performance",
    popular: true,
    features: ["Real-time stats", "Optimization tips", "Device compare"],
    route: null
  }
];

const ToolsSection = () => {
  const navigate = useNavigate();

  const handleToolLaunch = (tool: typeof tools[0]) => {
    console.log(`Launching ${tool.title}...`);
    if (tool.route) {
      navigate(tool.route);
    } else {
      alert(`${tool.title} akan segera tersedia!`);
    }
  };

  const handleViewAllTools = () => {
    console.log('View all tools clicked');
    alert('Semua tools akan segera tersedia!');
  };

  return (
    <section id="tools" className="py-20 px-4">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold ff-gradient-text">
            Gaming Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Koleksi tools terlengkap untuk meningkatkan performa Free Fire kamu
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={tool.id} 
                className="group relative p-6 bg-card/50 backdrop-blur border-border/50 hover:glow-effect hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                {tool.popular && (
                  <Badge className="absolute -top-2 -right-2 ff-gradient text-black">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg ff-gradient flex items-center justify-center group-hover:animate-glow-pulse">
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {tool.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full group-hover:ff-gradient group-hover:text-black transition-all duration-300"
                      variant="outline"
                      onClick={() => handleToolLaunch(tool)}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Launch Tool
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="ff-gradient hover:opacity-90 text-black font-semibold"
            onClick={handleViewAllTools}
          >
            Lihat Semua Tools
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
