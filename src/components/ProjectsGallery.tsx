
import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Project, projects } from '../utils/projectData';
import { Link, useSearchParams } from 'react-router-dom';

const ProjectsGallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const projectTypes = ['all', 'residential', 'commercial', 'landscape', 'cultural'];
  const projectYears = [...new Set(projects.map(project => project.year))].sort((a, b) => b - a);

  useEffect(() => {
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    
    if (type) {
      setSelectedType(type);
    }
    
    if (id) {
      const projectId = parseInt(id);
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setFilteredProjects([project]);
        return;
      }
    }
    
    applyFilters();
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [selectedType, searchQuery, selectedYears]);

  const applyFilters = () => {
    let result = [...projects];
    
    // Apply type filter
    if (selectedType !== 'all') {
      result = result.filter(project => project.type === selectedType);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query)
      );
    }
    
    // Apply year filter
    if (selectedYears.length > 0) {
      result = result.filter(project => selectedYears.includes(project.year));
    }
    
    setFilteredProjects(result);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setSearchParams(params => {
      if (type === 'all') {
        params.delete('type');
      } else {
        params.set('type', type);
      }
      return params;
    });
  };

  const handleYearToggle = (year: number) => {
    setSelectedYears(prev => {
      if (prev.includes(year)) {
        return prev.filter(y => y !== year);
      } else {
        return [...prev, year];
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Projects</h2>
          
          {/* Search and filter controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="input-field pl-10 w-full"
              />
            </div>
            
            <button 
              onClick={toggleFilters}
              className="md:hidden flex items-center gap-2 px-4 py-3 border rounded-md"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
          
          <div className={`md:flex gap-6 ${isFiltersOpen ? 'block' : 'hidden md:flex'}`}>
            {/* Type filter */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-sm font-medium mb-2">Project Type</h3>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Year filter */}
            <div>
              <h3 className="text-sm font-medium mb-2">Year</h3>
              <div className="flex flex-wrap gap-2">
                {projectYears.map(year => (
                  <button
                    key={year}
                    onClick={() => handleYearToggle(year)}
                    className={`filter-btn ${selectedYears.includes(year) ? 'active' : ''}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div key={project.id} className="project-card animate-fade-in">
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
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsGallery;
