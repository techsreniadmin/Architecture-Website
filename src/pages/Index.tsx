
import Hero from '@/components/Hero';
import FeaturedProjects from '@/components/FeaturedProjects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProjects />
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Innovative Design for Modern Living</h2>
                <p className="text-muted-foreground mb-4">
                  At Archify, we believe that thoughtful design has the power to transform spaces and enhance quality of life. Our award-winning team combines innovative thinking with sustainable practices to create architecture that inspires.
                </p>
                <p className="text-muted-foreground mb-6">
                  From residential homes to commercial developments and cultural institutions, we bring a unique perspective to each project, considering not just the space itself but how it interacts with its environment and serves its users.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-primary rounded-full"></span>
                    Sustainable and environmentally responsible design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-primary rounded-full"></span>
                    Human-centered spaces that enhance wellbeing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-primary rounded-full"></span>
                    Innovative solutions to complex spatial challenges
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden rounded-md">
                  <img 
                    src="https://images.unsplash.com/photo-1486718448742-163732cd1544?w=500&h=500&fit=crop" 
                    alt="Architectural design sketch" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-md">
                  <img 
                    src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&h=500&fit=crop" 
                    alt="Interior design" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-md">
                  <img 
                    src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=500&fit=crop" 
                    alt="Building exterior" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-md">
                  <img 
                    src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=500&h=500&fit=crop" 
                    alt="Modern architecture" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
