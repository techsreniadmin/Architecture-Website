
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const projectTypeSelect = document.getElementById('project-type');
    const messageTextarea = document.getElementById('message');
    const fileUpload = document.getElementById('file-upload');
    const submitButton = document.getElementById('submit-btn');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    const dynamicFieldsContainer = document.getElementById('dynamic-fields');

    if (contactForm) {
        // Dynamic fields based on project type
        projectTypeSelect.addEventListener('change', function() {
            updateDynamicFields(this.value);
        });
        
        // Initial call for any pre-selected value
        if (projectTypeSelect.value) {
            updateDynamicFields(projectTypeSelect.value);
        }
        
        // Function to update dynamic fields based on project type
        function updateDynamicFields(projectType) {
            // Clear existing fields first
            dynamicFieldsContainer.innerHTML = '';
            
            // Common fields for all project types
            let dynamicHTML = `
                <div class="mb-3 form-field slide-down">
                    <label for="project-budget" class="form-label">Estimated Budget</label>
                    <select class="form-select" id="project-budget" name="project-budget">
                        <option value="" selected disabled>Select budget range</option>
                        <option value="below-50k">Below $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-250k">$100,000 - $250,000</option>
                        <option value="250k-500k">$250,000 - $500,000</option>
                        <option value="above-500k">Above $500,000</option>
                    </select>
                </div>
                
                <div class="mb-3 form-field slide-down">
                    <label for="timeline" class="form-label">Expected Timeline</label>
                    <select class="form-select" id="timeline" name="timeline">
                        <option value="" selected disabled>Select timeline</option>
                        <option value="less-3-months">Less than 3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="6-12-months">6-12 months</option>
                        <option value="more-12-months">More than 12 months</option>
                    </select>
                </div>
            `;
            
            // Project-specific fields
            if (projectType === 'residential') {
                dynamicHTML += `
                    <div class="mb-3 form-field slide-down">
                        <label for="property-type" class="form-label">Property Type</label>
                        <select class="form-select" id="property-type" name="property-type">
                            <option value="" selected disabled>Select property type</option>
                            <option value="single-family">Single Family Home</option>
                            <option value="multi-family">Multi-Family Residence</option>
                            <option value="apartment">Apartment/Condo</option>
                            <option value="vacation-home">Vacation Home</option>
                        </select>
                    </div>
                    
                    <div class="mb-3 form-field slide-down">
                        <label for="project-scope" class="form-label">Project Scope</label>
                        <select class="form-select" id="project-scope" name="project-scope">
                            <option value="" selected disabled>Select project scope</option>
                            <option value="new-construction">New Construction</option>
                            <option value="renovation">Renovation</option>
                            <option value="addition">Addition</option>
                            <option value="interior-design">Interior Design Only</option>
                        </select>
                    </div>
                    
                    <div class="mb-3 form-field slide-down">
                        <label for="square-footage" class="form-label">Square Footage</label>
                        <input type="number" class="form-control" id="square-footage" name="square-footage" placeholder="Enter approximate square footage">
                    </div>
                `;
            } else if (projectType === 'commercial') {
                dynamicHTML += `
                    <div class="mb-3 form-field slide-down">
                        <label for="business-type" class="form-label">Business Type</label>
                        <select class="form-select" id="business-type" name="business-type">
                            <option value="" selected disabled>Select business type</option>
                            <option value="office">Office Space</option>
                            <option value="retail">Retail</option>
                            <option value="restaurant">Restaurant/Cafe</option>
                            <option value="hotel">Hotel/Hospitality</option>
                            <option value="mixed-use">Mixed-Use</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="mb-3 form-field slide-down">
                        <label for="project-scope" class="form-label">Project Scope</label>
                        <select class="form-select" id="project-scope" name="project-scope">
                            <option value="" selected disabled>Select project scope</option>
                            <option value="new-construction">New Construction</option>
                            <option value="renovation">Renovation</option>
                            <option value="tenant-improvement">Tenant Improvement</option>
                            <option value="facade">Facade Renovation</option>
                        </select>
                    </div>
                    
                    <div class="mb-3 form-field slide-down">
                        <label for="square-footage" class="form-label">Square Footage</label>
                        <input type="number" class="form-control" id="square-footage" name="square-footage" placeholder="Enter approximate square footage">
                    </div>
                    
                    <div class="mb-3 form-field slide-down">
                        <label for="occupancy" class="form-label">Expected Occupancy</label>
                        <input type="number" class="form-control" id="occupancy" name="occupancy" placeholder="Number of occupants">
                    </div>
                `;
            } else if (projectType === 'landscape') {
                dynamicHTML += `
                    <div class="mb-3 form-field slide-down">
                        <label for="property-type" class="form-label">Property Type</label>
                        <select class="form-select" id="property-type" name="property-type">
                            <option value="" selected disabled>Select property type</option>
                            <option value="residential">Residential Property</option>
                            <option value="commercial">Commercial Property</option>
                            <option value="public">Public Space</option>
                        </select>
                    </div>
                    
                    <div class="mb-3 form-field slide-down">
                        <label for="land-size" class="form-label">Land Size</label>
                        <input type="text" class="form-control" id="land-size" name="land-size" placeholder="Approximate size (e.g., 1/4 acre, 10,000 sq ft)">
                    </div>
                    
                    <div class="mb-3 form-field slide-down">
                        <label for="landscape-elements" class="form-label">Desired Landscape Elements</label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="garden" id="element-garden" name="landscape-elements[]">
                            <label class="form-check-label" for="element-garden">Garden/Planting Design</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="hardscape" id="element-hardscape" name="landscape-elements[]">
                            <label class="form-check-label" for="element-hardscape">Hardscape (Patio, Walkways)</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="water" id="element-water" name="landscape-elements[]">
                            <label class="form-check-label" for="element-water">Water Features</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="lighting" id="element-lighting" name="landscape-elements[]">
                            <label class="form-check-label" for="element-lighting">Outdoor Lighting</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="structures" id="element-structures" name="landscape-elements[]">
                            <label class="form-check-label" for="element-structures">Outdoor Structures (Pergola, Gazebo)</label>
                        </div>
                    </div>
                `;
            } else if (projectType === 'cultural') {
                dynamicHTML += `
                    <div class="mb-3 form-field slide-down">
                        <label for="cultural-type" class="form-label">Facility Type</label>
                        <select class="form-select" id="cultural-type" name="cultural-type">
                            <option value="" selected disabled>Select facility type</option>
                            <option value="museum">Museum</option>
                            <option value="gallery">Art Gallery</option>
                            <option value="theater">Theater/Performance Space</option>
                            <option value="library">Library</option>
                            <option value="community">Community Center</option>
                            <option value="educational">Educational Institution</option>
                            <option value="religious">Religious Building</option>
                        </select>
                    </div>
                    
                    <div class="mb-3 form-field slide-down">
                        <label for="project-scope" class="form-label">Project Scope</label>
                        <select class="form-select" id="project-scope" name="project-scope">
                            <option value="" selected disabled>Select project scope</option>
                            <option value="new-construction">New Construction</option>
                            <option value="renovation">Renovation/Restoration</option>
                            <option value="expansion">Expansion</option>
                            <option value="adaptive-reuse">Adaptive Reuse</option>
                        </select>
                    </div>
                    
                    <div class="mb-3 form-field slide-down">
                        <label for="public-access" class="form-label">Public Access Requirements</label>
                        <textarea class="form-control" id="public-access" name="public-access" rows="3" placeholder="Describe any specific accessibility needs or public usage requirements"></textarea>
                    </div>
                `;
            }
            
            // Add the dynamic fields to the container
            dynamicFieldsContainer.innerHTML = dynamicHTML;
            
            // Add animation class to each field
            const formFields = dynamicFieldsContainer.querySelectorAll('.form-field');
            formFields.forEach((field, index) => {
                // Stagger the animations
                setTimeout(() => {
                    field.classList.add('slide-down');
                }, index * 100);
            });
        }
        
        // Form validation
        function validateForm() {
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
            }
            
            // Validate project type
            if (!projectTypeSelect.value) {
                projectTypeSelect.classList.add('is-invalid');
                isValid = false;
            } else {
                projectTypeSelect.classList.remove('is-invalid');
            }
            
            // Validate message
            if (!messageTextarea.value.trim() || messageTextarea.value.length < 10) {
                messageTextarea.classList.add('is-invalid');
                isValid = false;
            } else {
                messageTextarea.classList.remove('is-invalid');
            }
            
            return isValid;
        }
        
        // Input event listeners for real-time validation
        nameInput.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
        
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value.trim() && emailRegex.test(this.value)) {
                this.classList.remove('is-invalid');
            }
        });
        
        projectTypeSelect.addEventListener('change', function() {
            if (this.value) {
                this.classList.remove('is-invalid');
            }
        });
        
        messageTextarea.addEventListener('input', function() {
            if (this.value.trim() && this.value.length >= 10) {
                this.classList.remove('is-invalid');
            }
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide any previous alert messages
            formSuccess.classList.add('d-none');
            formError.classList.add('d-none');
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
            
            // Collect all form data including dynamic fields
            const formData = new FormData(contactForm);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                // Handle arrays (like checkboxes)
                if (key.endsWith('[]')) {
                    const cleanKey = key.slice(0, -2);
                    if (!formDataObj[cleanKey]) {
                        formDataObj[cleanKey] = [];
                    }
                    formDataObj[cleanKey].push(value);
                } else {
                    formDataObj[key] = value;
                }
            });
            
            console.log('Form data:', formDataObj);
            
            // Simulate form submission (in a real app, this would be an API call)
            setTimeout(function() {
                // 90% chance of success for demo purposes
                const isSuccess = Math.random() < 0.9;
                
                if (isSuccess) {
                    // Show success message
                    formSuccess.classList.remove('d-none');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset dynamic fields
                    dynamicFieldsContainer.innerHTML = '';
                } else {
                    // Show error message
                    formError.classList.remove('d-none');
                }
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
                
                // Scroll to the form top to see the message
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        });
    }
    
    // Map Initialization
    const mapContainer = document.getElementById('project-map');
    
    if (mapContainer) {
        // Initialize map
        const map = L.map('project-map').setView([49.2827, -123.1207], 4);
        
        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add project markers
        const projectsWithLocations = projects.filter(project => project.location);
        
        projectsWithLocations.forEach(project => {
            const { coordinates } = project.location;
            
            const marker = L.marker(coordinates).addTo(map);
            
            // Create popup content
            const popupContent = `
                <div class="map-popup">
                    <h5>${project.title}</h5>
                    <p>${project.location.name}</p>
                    <p class="text-muted small">${project.location.address}</p>
                    <a href="projects.html?id=${project.id}" class="btn btn-sm btn-primary mt-2">View Project</a>
                </div>
            `;
            
            marker.bindPopup(popupContent);
        });
        
        // Make map responsive
        window.addEventListener('resize', function() {
            map.invalidateSize();
        });
    }
});
