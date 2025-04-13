
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectsGallery from '@/components/ProjectsGallery';

const Projects = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <ProjectsGallery />
      </main>
      <Footer />
    </>
  );
};

export default Projects;
