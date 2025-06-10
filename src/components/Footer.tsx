
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
              <Button size="icon" variant="outline" className="hover:text-primary">
                <Youtube className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="hover:text-primary">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="hover:text-primary">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="hover:text-primary">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Tools</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Sensitivity Calculator
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Headshot Trainer
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Rank Calculator
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Squad Analyzer
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Weapon Stats
              </a>
            </div>
          </div>
          
          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Gaming Guides
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Pro Player Tips
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Game Updates
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Community
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Support
              </a>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">support@fftoolspro.com</span>
              </div>
              <Button className="w-full ff-gradient hover:opacity-90 text-black font-semibold">
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
