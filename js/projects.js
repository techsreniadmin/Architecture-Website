
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // DOM elements
    const projectsContainer = document.getElementById('projects-container');
    const searchInput = document.getElementById('project-search');
    const filterButtons = document.querySelectorAll('.btn-filter');
    const yearFiltersContainer = document.getElementById('year-filters');
    const noResultsMessage = document.getElementById('no-results');
    const projectDetailSection = document.getElementById('project-detail-section');
    const projectsSection = document.getElementById('projects-section');
    
    // Track current filter state
    let currentFilters = {
        search: '',
        type: 'all',
        years: []
    };
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const projectType = urlParams.get('type');
    
    if (projectType) {
        currentFilters.type = projectType;
        
        // Update active filter button
        filterButtons.forEach(button => {
            if (button.dataset.filter === projectType) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Initialize year filters
    const years = getProjectYears();
    
    years.forEach(year => {
        const yearButton = document.createElement('button');
        yearButton.className = 'btn btn-filter year-filter';
        yearButton.dataset.year = year;
        yearButton.textContent = year;
        
        yearButton.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                currentFilters.years.push(year);
            } else {
                currentFilters.years = currentFilters.years.filter(y => y !== year);
            }
            
            filterProjects();
        });
        
        yearFiltersContainer.appendChild(yearButton);
    });
    
    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter state
            currentFilters.type = filter;
            
            // Update URL parameter without reloading page
            const url = new URL(window.location);
            if (filter === 'all') {
                url.searchParams.delete('type');
            } else {
                url.searchParams.set('type', filter);
            }
            window.history.pushState({}, '', url);
            
            filterProjects();
        });
    });
    
    // Search input handler
    searchInput.addEventListener('input', function() {
        currentFilters.search = this.value.toLowerCase();
        filterProjects();
    });
    
    // Handle single project view
    function displayProjectDetail(projectId) {
        const project = projects.find(p => p.id === parseInt(projectId));
        
        if (!project) {
            window.location.href = 'projects.html';
            return;
        }
        
        // Hide projects section and show detail section
        if (projectsSection) projectsSection.classList.add('d-none');
        if (projectDetailSection) {
            projectDetailSection.classList.remove('d-none');
            
            projectDetailSection.innerHTML = `
                <div class="container">
                    <div class="mb-4">
                        <a href="projects.html" class="btn btn-outline-secondary">
                            <i class="fas fa-arrow-left me-2"></i>Back to Projects
                        </a>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-8">
                            <img src="${project.image}" alt="${project.title}" class="img-fluid rounded shadow-sm mb-4">
                            
                            <h1 class="mb-3">${project.title}</h1>
                            
                            <div class="d-flex align-items-center mb-4">
                                <span class="project-tag me-3">${formatProjectType(project.type)}</span>
                                <span class="text-muted">${project.year}</span>
                            </div>
                            
                            <p class="lead mb-4">${project.description}</p>
                            
                            <div class="project-details mb-5">
                                <h3 class="h4 mb-4">Project Details</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
                                
                                <p>Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
                            </div>
                        </div>
                        
                        <div class="col-lg-4">
                            <div class="project-info-card p-4 bg-light rounded shadow-sm mb-4">
                                <h3 class="h5 mb-4">Project Information</h3>
                                
                                <div class="mb-3">
                                    <strong>Client:</strong>
                                    <p>Acme Corporation</p>
                                </div>
                                
                                <div class="mb-3">
                                    <strong>Location:</strong>
                                    <p>${project.location ? project.location.name : 'N/A'}</p>
                                </div>
                                
                                <div class="mb-3">
                                    <strong>Year:</strong>
                                    <p>${project.year}</p>
                                </div>
                                
                                <div class="mb-3">
                                    <strong>Type:</strong>
                                    <p>${formatProjectType(project.type)}</p>
                                </div>
                                
                                <div>
                                    <strong>Address:</strong>
                                    <p>${project.location ? project.location.address : 'N/A'}</p>
                                </div>
                            </div>
                            
                            <div class="related-projects">
                                <h3 class="h5 mb-3">Related Projects</h3>
                                
                                <div class="related-projects-list">
                                    ${getRelatedProjects(project.id, project.type, 3).map(rp => `
                                        <div class="related-project-item mb-3">
                                            <a href="projects.html?id=${rp.id}" class="d-flex align-items-center text-decoration-none">
                                                <img src="${rp.image}" alt="${rp.title}" class="img-fluid rounded" style="width: 70px; height: 70px; object-fit: cover;">
                                                <div class="ms-3">
                                                    <h4 class="h6 mb-1">${rp.title}</h4>
                                                    <span class="small text-muted">${rp.year}</span>
                                                </div>
                                            </a>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    // Get related projects
    function getRelatedProjects(currentId, type, count = 3) {
        // Get projects of the same type, excluding current project
        const sameTypeProjects = projects.filter(p => p.type === type && p.id !== currentId);
        
        // If not enough projects of same type, get other projects
        if (sameTypeProjects.length < count) {
            const otherProjects = projects.filter(p => p.type !== type && p.id !== currentId);
            return [...sameTypeProjects, ...otherProjects].slice(0, count);
        }
        
        return sameTypeProjects.slice(0, count);
    }
    
    // Filter and display projects
    function filterProjects() {
        let filteredProjects = [...projects];
        
        // Apply type filter
        if (currentFilters.type !== 'all') {
            filteredProjects = filteredProjects.filter(project => project.type === currentFilters.type);
        }
        
        // Apply search filter
        if (currentFilters.search) {
            filteredProjects = filteredProjects.filter(project => 
                project.title.toLowerCase().includes(currentFilters.search) || 
                project.description.toLowerCase().includes(currentFilters.search)
            );
        }
        
        // Apply year filter
        if (currentFilters.years.length > 0) {
            filteredProjects = filteredProjects.filter(project => currentFilters.years.includes(project.year));
        }
        
        // Clear projects container
        if (projectsContainer) {
            projectsContainer.innerHTML = '';
            
            // Show/hide no results message
            if (filteredProjects.length === 0) {
                noResultsMessage.classList.remove('d-none');
            } else {
                noResultsMessage.classList.add('d-none');
                
                // Render filtered projects
                filteredProjects.forEach(project => {
                    const projectCol = document.createElement('div');
                    projectCol.className = 'col-md-6 col-lg-4 mb-4';
                    
                    projectCol.innerHTML = `
                        <div class="project-card h-100">
                            <div class="position-relative overflow-hidden">
                                <img src="${project.image}" alt="${project.title}" class="img-fluid w-100">
                                <div class="position-absolute top-0 start-0 w-100 h-100 bg-gradient-overlay"></div>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h3 class="h5 mb-0">${project.title}</h3>
                                    <small class="text-muted">${project.year}</small>
                                </div>
                                <p class="text-muted mb-3">${project.description}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="project-tag">${formatProjectType(project.type)}</span>
                                    <a href="projects.html?id=${project.id}" class="project-detail-link">Details <i class="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    projectsContainer.appendChild(projectCol);
                });
            }
        }
    }
    
    // Check if we need to display a single project or the project list
    if (projectId) {
        displayProjectDetail(projectId);
    } else {
        // Make sure projects section is visible and detail section is hidden
        if (projectsSection) projectsSection.classList.remove('d-none');
        if (projectDetailSection) projectDetailSection.classList.add('d-none');
        
        // Initial project display
        filterProjects();
    }
});
