
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Zap, 
  Youtube, 
  Instagram, 
  Twitter, 
  MessageCircle,
  Mail,
  Heart
} from "lucide-react";

const Footer = () => {
  const handleSocialClick = (platform: string) => {
    const urls = {
      youtube: "https://youtube.com/@fftoolspro",
      instagram: "https://instagram.com/fftoolspro",
      twitter: "https://twitter.com/fftoolspro",
      discord: "https://discord.gg/fftoolspro"
    };
    
    const url = urls[platform as keyof typeof urls];
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:support@fftoolspro.com";
  };

  const handlePremiumClick = () => {
    // Scroll to tools section or show premium modal
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToolClick = (toolName: string) => {
    console.log(`Opening ${toolName} tool`);
    // Here you can add navigation to specific tool pages
  };

  return (
    <footer className="bg-secondary/50 backdrop-blur border-t border-border/50">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 ff-gradient rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="font-orbitron font-bold text-xl ff-gradient-text">
                FF ToolsPro+
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Platform tools gaming terlengkap untuk Free Fire. Tingkatkan skill dan raih victory royale!
            </p>
            <div className="flex space-x-3">
              <Button 
                size="icon" 
                variant="outline" 
                className="hover:text-primary"
                onClick={() => handleSocialClick('youtube')}
              >
                <Youtube className="w-4 h-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="hover:text-primary"
                onClick={() => handleSocialClick('instagram')}
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="hover:text-primary"
                onClick={() => handleSocialClick('twitter')}
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="hover:text-primary"
                onClick={() => handleSocialClick('discord')}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Tools</h3>
            <div className="space-y-2 text-sm">
              <button 
                onClick={() => handleToolClick('Sensitivity Calculator')}
                className="block text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Sensitivity Calculator
              </button>
              <button 
                onClick={() => handleToolClick('Headshot Trainer')}
                className="block text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Headshot Trainer
              </button>
              <button 
                onClick={() => handleToolClick('Rank Calculator')}
                className="block text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Rank Calculator
              </button>
              <button 
                onClick={() => handleToolClick('Squad Analyzer')}
                className="block text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Squad Analyzer
              </button>
              <button 
                onClick={() => handleToolClick('Weapon Stats')}
                className="block text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Weapon Stats
              </button>
            </div>
          </div>
          
          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <div className="space-y-2 text-sm">
              <button 
                onClick={() => console.log('Opening Gaming Guides')}
                className="block text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Gaming Guides
              </button>
              <button 
                onClick={() => console.log('Opening Pro Player Tips')}
                className="block text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Pro Player Tips
              </button>
              <button 
                onClick={() => console.log('Opening Game Updates')}
                className="block text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Game Updates
              </button>
              <button 
                onClick={() => console.log('Opening Community')}
                className="block text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Community
              </button>
              <button 
                onClick={() => console.log('Opening Support')}
                className="block text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Support
              </button>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <button 
                onClick={handleEmailClick}
                className="flex items-center space-x-2 text-sm hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">support@fftoolspro.com</span>
              </button>
              <Button 
                className="w-full ff-gradient hover:opacity-90 text-black font-semibold"
                onClick={handlePremiumClick}
              >
                Join Premium
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 FF ToolsPro+. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for FF Gamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
