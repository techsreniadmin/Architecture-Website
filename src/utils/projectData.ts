
export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'residential' | 'commercial' | 'landscape' | 'cultural';
  year: number;
  image: string;
  featured: boolean;
  location?: {
    name: string;
    coordinates: [number, number]; // [latitude, longitude]
    address: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Glass Pavilion Residence",
    description: "Minimalist residential design with expansive glass walls blending indoor and outdoor living spaces.",
    type: "residential",
    year: 2022,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    featured: true,
    location: {
      name: "Vancouver",
      coordinates: [49.2827, -123.1207],
      address: "1234 Pacific Avenue, Vancouver, BC"
    }
  },
  {
    id: 2,
    title: "Urban Sky Tower",
    description: "Mixed-use skyscraper with sustainable features and innovative structural design.",
    type: "commercial",
    year: 2023,
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    featured: true,
    location: {
      name: "Toronto",
      coordinates: [43.6532, -79.3832],
      address: "100 King Street West, Toronto, ON"
    }
  },
  {
    id: 3,
    title: "Waterfront Park Plaza",
    description: "Public space renovation featuring native landscaping and sustainable water management.",
    type: "landscape",
    year: 2021,
    image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
    featured: true,
    location: {
      name: "Montreal",
      coordinates: [45.5017, -73.5673],
      address: "800 René-Lévesque Blvd, Montreal, QC"
    }
  },
  {
    id: 4,
    title: "Contemporary Art Museum",
    description: "Bold geometric forms create dynamic spaces for exhibiting contemporary art collections.",
    type: "cultural",
    year: 2020,
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    featured: false,
    location: {
      name: "Ottawa",
      coordinates: [45.4215, -75.6972],
      address: "380 Sussex Drive, Ottawa, ON"
    }
  },
  {
    id: 5,
    title: "Eco-Friendly Office Campus",
    description: "Corporate headquarters with zero-carbon footprint and biophilic design principles.",
    type: "commercial",
    year: 2022,
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
    featured: false,
    location: {
      name: "Calgary",
      coordinates: [51.0447, -114.0719],
      address: "225 6 Ave SW, Calgary, AB"
    }
  },
  {
    id: 6,
    title: "Oceanfront Villa",
    description: "Luxury residence with cantilevered terraces designed to maximize ocean views.",
    type: "residential",
    year: 2021,
    image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4",
    featured: false,
    location: {
      name: "Victoria",
      coordinates: [48.4284, -123.3656],
      address: "128 Dallas Rd, Victoria, BC"
    }
  },
  {
    id: 7,
    title: "Urban Renewal Gardens",
    description: "Conversion of post-industrial site into public gardens with sculpture installations.",
    type: "landscape",
    year: 2020,
    image: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a",
    featured: false,
    location: {
      name: "Winnipeg",
      coordinates: [49.8951, -97.1384],
      address: "55 Waterfront Drive, Winnipeg, MB"
    }
  },
  {
    id: 8,
    title: "Historical Library Renovation",
    description: "Careful restoration and modernization of a heritage library building.",
    type: "cultural",
    year: 2023,
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb",
    featured: true,
    location: {
      name: "Quebec City",
      coordinates: [46.8139, -71.2080],
      address: "43 Rue De Buade, Quebec City, QC"
    }
  },
  {
    id: 9,
    title: "Geometric Lakeside Cottage",
    description: "Weekend retreat featuring angular forms and natural materials.",
    type: "residential",
    year: 2023,
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    featured: false,
    location: {
      name: "Muskoka",
      coordinates: [45.0792, -79.3058],
      address: "1001 Lake Shore Road, Muskoka, ON"
    }
  },
  {
    id: 10,
    title: "Downtown Business Hub",
    description: "Modern office tower with flexible workspaces and community amenities.",
    type: "commercial",
    year: 2021,
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
    featured: false,
    location: {
      name: "Edmonton",
      coordinates: [53.5461, -113.4938],
      address: "10060 Jasper Ave, Edmonton, AB"
    }
  },
  {
    id: 11,
    title: "Waterfall Pavilion",
    description: "Visitor center for national park with structures integrated into natural landscape.",
    type: "landscape",
    year: 2022,
    image: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764",
    featured: false,
    location: {
      name: "Banff",
      coordinates: [51.1784, -115.5708],
      address: "Banff National Park, AB"
    }
  },
  {
    id: 12,
    title: "Modern Concert Hall",
    description: "Performing arts venue with acoustically engineered spaces and dramatic exterior.",
    type: "cultural",
    year: 2020,
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
    featured: false,
    location: {
      name: "Halifax",
      coordinates: [44.6488, -63.5752],
      address: "1505 Barrington St, Halifax, NS"
    }
  }
];

export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByType = (type: string): Project[] => {
  if (type === 'all') return projects;
  return projects.filter(project => project.type === type);
};

export const getProjectsByYear = (year: number): Project[] => {
  return projects.filter(project => project.year === year);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const searchProjects = (query: string): Project[] => {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) || 
    project.description.toLowerCase().includes(lowercaseQuery)
  );
};
