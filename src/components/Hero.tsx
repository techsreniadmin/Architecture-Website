
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
          alt="Modern architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-white">
        <div 
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Crafting Spaces<br />Defining Experiences
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Award-winning architectural design studio focused on creating thoughtful, sustainable spaces that inspire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/projects" 
              className="btn-primary bg-white text-foreground hover:bg-white/90"
            >
              View Our Work
            </Link>
            <Link 
              to="/contact" 
              className="btn-primary bg-transparent border border-white hover:bg-white/10"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
