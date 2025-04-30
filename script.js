document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('Particles.js loaded successfully');
        });
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectsContainer = document.getElementById('projects-container');
    
    // Load projects from IMDb API
    loadIMDbProjects();
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
    
    // Function to filter projects
    function filterProjects(filter) {
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            const projectType = project.getAttribute('data-type');
            
            if (filter === 'all' || projectType === filter) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
    
    // Function to load projects from IMDb API
    async function loadIMDbProjects() {
        // This is a placeholder for actual IMDb API integration
        // In a real implementation, you would use the IMDb API or a proxy
        
        // Mock data - replace with actual API calls
        const mockVFXProjects = [
            {
                title: "Cosmic Odyssey",
                description: "Feature film visual effects including space environments, alien creatures, and futuristic technology.",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                type: "vfx",
                technologies: ["Maya", "Nuke", "Houdini"],
                imdbId: "tt1234567"
            },
            {
                title: "Neon Dreams",
                description: "Cyberpunk short film with extensive CGI environments and character animation.",
                image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                type: "vfx",
                technologies: ["Blender", "After Effects", "Substance"],
                imdbId: "tt2345678"
            }
        ];
        
        const mockDevOpsProjects = [
            {
                title: "Render Farm Automation",
                description: "Automated cloud-based render farm for visual effects studios with dynamic scaling.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                type: "devops",
                technologies: ["AWS", "Python", "Terraform"]
            },
            {
                title: "Media Asset Pipeline",
                description: "CI/CD pipeline for media assets with automated quality control and versioning.",
                image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                type: "devops",
                technologies: ["Docker", "Kubernetes", "Jenkins"]
            }
        ];
        
        // Combine all projects
        const allProjects = [...mockVFXProjects, ...mockDevOpsProjects];
        
        // Display projects
        displayProjects(allProjects);
    }
    
    // Function to display projects
    function displayProjects(projects) {
        projectsContainer.innerHTML = '';
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-type', project.type);
            
            // Determine if it's an IMDb project
            const isIMDbProject = project.type === 'vfx' && project.imdbId;
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div class="project-tag">
                        ${project.type === 'vfx' ? 'VFX' : 'DevOps'}
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `
                            <span class="tech-badge">${tech}</span>
                        `).join('')}
                    </div>
                    <div class="project-links">
                        ${isIMDbProject ? `
                            <a href="https://www.imdb.com/title/${project.imdbId}" target="_blank" class="project-link project-link-primary">
                                <i class="fab fa-imdb mr-2"></i> IMDb
                            </a>
                        ` : ''}
                        <a href="#" class="project-link project-link-secondary">
                            <i class="fas fa-info-circle mr-2"></i> Details
                        </a>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
        });
        
        // Initialize hover effects
        initProjectHoverEffects();
    }
    
    // Initialize project hover effects
    function initProjectHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const img = this.querySelector('.project-image img');
                img.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                const img = this.querySelector('.project-image img');
                img.style.transform = 'scale(1)';
            });
        });
    }
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});