
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle initial scroll state
    handleScroll();
    
    // Back to top functionality
    const backToTopLinks = document.querySelectorAll('.back-to-top');
    
    backToTopLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Render featured projects
    const featuredProjectsContainer = document.getElementById('featured-projects-container');
    
    if (featuredProjectsContainer) {
        const featuredProjects = getFeaturedProjects();
        
        featuredProjects.forEach(project => {
            const projectCol = document.createElement('div');
            projectCol.className = 'col-md-6 col-lg-4';
            
            projectCol.innerHTML = `
                <div class="project-card">
                    <div class="position-relative overflow-hidden">
                        <img src="${project.image}" alt="${project.title}" class="img-fluid">
                        <div class="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-t from-dark to-transparent opacity-0 transition"></div>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h3 class="h5 mb-0">${project.title}</h3>
                            <small class="text-muted">${project.year}</small>
                        </div>
                        <p class="text-muted mb-3">${project.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="project-tag">${formatProjectType(project.type)}</span>
                            <a href="projects.html?id=${project.id}" class="project-detail-link">View Details <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            `;
            
            featuredProjectsContainer.appendChild(projectCol);
        });
    }
});
