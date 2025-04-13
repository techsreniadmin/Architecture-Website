
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import ProjectMap from '@/components/ProjectMap';

const Contact = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl">
              Interested in working with us? Fill out the form below or reach out directly.
              Our team is ready to discuss your vision and bring it to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContactForm />
            <ProjectMap />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
