
import { useEffect, useRef, useState } from 'react';
import { Project, projects } from '../utils/projectData';
import { MapPin } from 'lucide-react';

// This component simulates a map with markers
// In a real implementation, you would use a library like Leaflet or Google Maps
const ProjectMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Map markers positioning
  const getMarkerPosition = (coordinates: [number, number]) => {
    // This is a simple projection to convert lat/long to x/y position
    // In a real map implementation, this would be handled by the mapping library
    const [lat, lng] = coordinates;
    
    // Normalize the coordinates to fit in our container
    // These calculations are simplified for demonstration purposes
    const x = ((lng + 180) / 360) * 100; // Convert longitude to percentage across the map
    const y = ((90 - lat) / 180) * 100;  // Convert latitude to percentage down the map
    
    return { x, y };
  };

  const handleMarkerClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closePopup = () => {
    setSelectedProject(null);
  };

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm h-full">
      <h3 className="text-2xl font-bold mb-6">Our Locations</h3>
      
      <div 
        ref={mapRef} 
        className="relative w-full h-[400px] md:h-[500px] bg-secondary rounded-lg overflow-hidden"
      >
        {/* Map Background (simulated) */}
        {mapLoaded ? (
          <img 
            src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=1200&h=800&fit=crop" 
            alt="Map background" 
            className="w-full h-full object-cover opacity-50"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        )}
        
        {/* Project markers */}
        {mapLoaded && projects.filter(p => p.location).map(project => {
          if (!project.location) return null;
          
          const position = getMarkerPosition(project.location.coordinates);
          
          return (
            <button
              key={project.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-transform hover:scale-110"
              style={{ 
                left: `${position.x}%`, 
                top: `${position.y}%`,
              }}
              onClick={() => handleMarkerClick(project)}
              aria-label={`View ${project.title} location`}
            >
              <MapPin size={30} className="text-primary drop-shadow-md" fill={project.id === selectedProject?.id ? "currentColor" : "transparent"} />
            </button>
          );
        })}
        
        {/* Location popup */}
        {selectedProject && selectedProject.location && (
          <div 
            className="absolute z-20 bg-white p-4 rounded-lg shadow-lg w-64 transform -translate-x-1/2 -translate-y-full mb-2"
            style={{
              left: `${getMarkerPosition(selectedProject.location.coordinates).x}%`,
              top: `${getMarkerPosition(selectedProject.location.coordinates).y - 5}%`,
            }}
          >
            <button 
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              onClick={closePopup}
              aria-label="Close popup"
            >
              ×
            </button>
            <h4 className="font-bold mb-1">{selectedProject.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{selectedProject.location.name}</p>
            <p className="text-xs text-muted-foreground">{selectedProject.location.address}</p>
          </div>
        )}

        {/* Map explanation */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-md text-xs text-muted-foreground max-w-[200px]">
          This is a simulated map. In a real implementation, you would integrate with Google Maps, Mapbox, or another mapping service.
        </div>
      </div>
    </div>
  );
};

export default ProjectMap;
