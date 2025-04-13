
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Github, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">ARCHIFY</h3>
            <p className="text-muted-foreground mb-4">
              Award-winning architectural design firm creating thoughtful, sustainable spaces since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Residential Design</li>
              <li className="text-muted-foreground">Commercial Architecture</li>
              <li className="text-muted-foreground">Landscape Planning</li>
              <li className="text-muted-foreground">Interior Design</li>
              <li className="text-muted-foreground">Sustainable Solutions</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>123 Design Street</p>
              <p>Toronto, ON M5V 2K6</p>
              <p>Canada</p>
              <p className="pt-2">
                <a href="mailto:hello@archify.com" className="hover:text-primary transition-colors">
                  hello@archify.com
                </a>
              </p>
              <p>
                <a href="tel:+14165551234" className="hover:text-primary transition-colors">
                  +1 (416) 555-1234
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} Archify. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              aria-label="Scroll to top"
            >
              Back to top <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
