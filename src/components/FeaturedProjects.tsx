
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Project, getFeaturedProjects } from '../utils/projectData';
import { ArrowRight } from 'lucide-react';

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const projects = getFeaturedProjects();
    setFeaturedProjects(projects);

    // Initialize all projects as not visible
    const initialVisibility = projects.reduce((acc, project) => {
      acc[project.id] = false;
      return acc;
    }, {} as { [key: number]: boolean });
    
    setVisibleProjects(initialVisibility);

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.id.split('-')[1]);
            setVisibleProjects(prev => ({ ...prev, [projectId]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all project elements
    setTimeout(() => {
      projects.forEach((project) => {
        const element = document.getElementById(`project-${project.id}`);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our showcase of innovative architectural designs spanning residential, 
            commercial, cultural, and landscape projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div 
              key={project.id}
              id={`project-${project.id}`}
              className={`project-card transition-all duration-700 transform ${
                visibleProjects[project.id] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative overflow-hidden group">
                <img 
                  src={`${project.image}?w=600&h=400&fit=crop`} 
                  alt={project.title}
                  className="project-image transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                </div>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm px-3 py-1 bg-secondary rounded-full">
                    {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                  </span>
                  <Link 
                    to={`/projects?id=${project.id}`} 
                    className="text-primary flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
