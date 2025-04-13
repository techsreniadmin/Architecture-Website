
// Project data
const projects = [
    {
        id: 1,
        title: "Glass Pavilion Residence",
        description: "Minimalist glass and concrete residence with seamless indoor-outdoor living spaces.",
        year: 2023,
        type: "residential",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        location: {
            name: "Vancouver, Canada",
            coordinates: [49.2827, -123.1207],
            address: "123 Pacific Drive, Vancouver, BC"
        }
    },
    {
        id: 2,
        title: "Urban Office Tower",
        description: "Sustainable 30-story commercial building with green terraces and energy-efficient design.",
        year: 2022,
        type: "commercial",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop",
        location: {
            name: "Toronto, Canada",
            coordinates: [43.6532, -79.3832],
            address: "888 Bay Street, Toronto, ON"
        }
    },
    {
        id: 3,
        title: "Hillside Retreat",
        description: "Eco-friendly vacation home nestled in the mountains with panoramic views and natural materials.",
        year: 2023,
        type: "residential",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
        location: {
            name: "Whistler, Canada",
            coordinates: [50.1162, -122.9535],
            address: "456 Alpine Way, Whistler, BC"
        }
    },
    {
        id: 4,
        title: "Botanical Gardens Pavilion",
        description: "Organic-shaped pavilion with living roof and sustainable water management systems.",
        year: 2021,
        type: "landscape",
        image: "https://images.unsplash.com/photo-1572623264528-40a7b4fcae1d?w=600&h=400&fit=crop",
        location: {
            name: "Montreal, Canada",
            coordinates: [45.5017, -73.5673],
            address: "789 Jardin Boulevard, Montreal, QC"
        }
    },
    {
        id: 5,
        title: "Contemporary Art Museum",
        description: "Bold, geometric museum space with dynamic exhibition areas and innovative lighting design.",
        year: 2020,
        type: "cultural",
        image: "https://images.unsplash.com/photo-1535398274249-8d92a8c0ad3d?w=600&h=400&fit=crop",
        location: {
            name: "Ottawa, Canada",
            coordinates: [45.4215, -75.6972],
            address: "100 Culture Street, Ottawa, ON"
        }
    },
    {
        id: 6,
        title: "Waterfront Apartments",
        description: "Mixed-use residential complex with terraced apartments, retail spaces, and waterfront access.",
        year: 2022,
        type: "residential",
        image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600&h=400&fit=crop",
        location: {
            name: "Halifax, Canada",
            coordinates: [44.6488, -63.5752],
            address: "555 Harbour Road, Halifax, NS"
        }
    },
    {
        id: 7,
        title: "Timber Innovation Center",
        description: "Research facility showcasing sustainable mass timber construction and advanced wood technologies.",
        year: 2021,
        type: "commercial",
        image: "https://images.unsplash.com/photo-1542513217-0b0eedf7005d?w=600&h=400&fit=crop",
        location: {
            name: "Calgary, Canada",
            coordinates: [51.0447, -114.0719],
            address: "200 Innovation Drive, Calgary, AB"
        }
    },
    {
        id: 8,
        title: "Community Park Revitalization",
        description: "Urban park transformation with native planting, water features, and multi-functional public spaces.",
        year: 2020,
        type: "landscape",
        image: "https://images.unsplash.com/photo-1552868124-6c2e4de13c95?w=600&h=400&fit=crop",
        location: {
            name: "Winnipeg, Canada",
            coordinates: [49.8951, -97.1384],
            address: "300 Park Avenue, Winnipeg, MB"
        }
    },
    {
        id: 9,
        title: "Historical Theater Renovation",
        description: "Careful restoration of a 1920s theater with modern upgrades while preserving historical elements.",
        year: 2019,
        type: "cultural",
        image: "https://images.unsplash.com/photo-1503883704855-c061f6c4eee4?w=600&h=400&fit=crop",
        location: {
            name: "Quebec City, Canada",
            coordinates: [46.8139, -71.2080],
            address: "123 Heritage Square, Quebec City, QC"
        }
    },
    {
        id: 10,
        title: "Mountain Chalet",
        description: "Contemporary wooden chalet with floor-to-ceiling windows and sustainable heating solutions.",
        year: 2019,
        type: "residential",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&h=400&fit=crop",
        location: {
            name: "Banff, Canada",
            coordinates: [51.1784, -115.5708],
            address: "789 Mountain View Road, Banff, AB"
        }
    },
    {
        id: 11,
        title: "Tech Company Headquarters",
        description: "Flexible, open-concept office space with collaborative zones, green walls, and wellness areas.",
        year: 2018,
        type: "commercial",
        image: "https://images.unsplash.com/photo-1534512756722-5982582a53a6?w=600&h=400&fit=crop",
        location: {
            name: "Vancouver, Canada",
            coordinates: [49.2765, -123.1277],
            address: "500 Tech Boulevard, Vancouver, BC"
        }
    },
    {
        id: 12,
        title: "Coastal Walking Path",
        description: "Elevated boardwalk along the coastline with viewing platforms, native landscaping, and interpretive elements.",
        year: 2018,
        type: "landscape",
        image: "https://images.unsplash.com/photo-1533548441511-9b486cc58809?w=600&h=400&fit=crop",
        location: {
            name: "Victoria, Canada",
            coordinates: [48.4284, -123.3656],
            address: "Ocean Way, Victoria, BC"
        }
    }
];

// Function to get featured projects
function getFeaturedProjects() {
    return projects.slice(0, 6);
}

// Function to format project type
function formatProjectType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

// Function to get unique project years
function getProjectYears() {
    return [...new Set(projects.map(project => project.year))].sort((a, b) => b - a);
}
