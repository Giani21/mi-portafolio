export const content = {
  es: {
    profile: {
      name: "Gianfranco Andreachi",
      role: "Desarrollador Full-Stack",
      description: "Diseño aplicaciones escalables y optimizo la experiencia de usuario, transformando requerimientos de negocio en soluciones digitales eficientes.",
      buttonContact: "Iniciar Contacto",
      buttonStack: "Ver Tecnologías"
    },
    ui: {
      projectsTitle: "Proyectos",
      projectsSubtitle: "Recientes",
      stackTitle: "Stack",
      stackSubtitle: "Tecnológico",
      totalEntries: "ENTRADAS_TOTALES",
      accessRepo: "Repositorio",
      demoLive: "Ver Demo", // Nuevo botón
      status: "Estado",
      systemModules: "Módulos del Sistema",
      footerRights: "Todos los derechos reservados",
      footerConnect: "Conectar",
      footerNav: "Navegación",
      serverStatus: "SISTEMAS ONLINE"
    },
    projects: [
      {
        id: 1,
        title: "DualEat",
        subtitle: "Ingeniería FoodTech",
        description: "Plataforma gastronómica multiplataforma que conecta restaurantes y usuarios en casa.",
        tags: ["React", "Node.js", "Redis", "WebSockets"],
        link: "https://github.com/Giani2110/DualEat-Web",
        // Pone aquí la ruta a tu imagen real, ej: "/projects/dualeat.jpg"
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", 
        status: "Producción",
      },
      {
        id: 2,
        title: "HyperG",
        subtitle: "Desarrollo Web",
        description: "Plataforma virtual para gamers, ofrece catálogo de juegos y servicios en línea.",
        tags: ["React", "Tailwind", "MySQL", "Prisma"],
        link: "https://github.com/Giani2110/HyperG",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
        status: "Beta_v1.2",
      },
      {
        id: 3,
        title: "MarketingReportes",
        subtitle: "Marketing & Analytics",
        description: "Sistema para empresas de marketing, genera reportes automáticos de productos.",
        tags: ["TypeScript", "Prisma", "Rest APIs"],
        link: "https://github.com/Giani2110/MarketingReportes",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        status: "Estable",
      },
    ]
  },
  en: {
    profile: {
      name: "Gianfranco Andreachi",
      role: "Full-Stack Engineer",
      description: "I design scalable applications and optimize user experience, transforming business requirements into efficient digital solutions.",
      buttonContact: "Start_Contact",
      buttonStack: "View_Stack"
    },
    ui: {
      projectsTitle: "Recent",
      projectsSubtitle: "Projects",
      stackTitle: "Tech",
      stackSubtitle: "Stack",
      totalEntries: "TOTAL_ENTRIES",
      accessRepo: "Repository",
      demoLive: "Live Demo", // Nuevo botón
      status: "Status",
      systemModules: "System Modules",
      footerRights: "All rights reserved",
      footerConnect: "Connect",
      footerNav: "Navigation",
      serverStatus: "SYSTEMS ONLINE"
    },
    projects: [
      {
        id: 1,
        title: "DualEat",
        subtitle: "FoodTech Engineering",
        description: "Cross-platform dining solution connecting restaurants with home users.",
        tags: ["React", "Node.js", "Redis", "WebSockets"],
        link: "https://github.com/Giani2110/DualEat-Web",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        status: "Production",
      },
      {
        id: 2,
        title: "HyperG",
        subtitle: "Web Development",
        description: "Virtual gamer platform offering a game catalog and online services.",
        tags: ["React", "Tailwind", "MySQL", "Prisma"],
        link: "https://github.com/Giani2110/HyperG",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
        status: "Beta_v1.2",
      },
      {
        id: 3,
        title: "MarketingReports",
        subtitle: "Marketing & Analytics",
        description: "Analytics system for marketing firms, generating automated product reports.",
        tags: ["TypeScript", "Prisma", "Rest APIs"],
        link: "https://github.com/Giani2110/MarketingReportes",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        status: "Stable",
      },
    ]
  }
};

export const skills = [
  { 
    category: "Frontend",
    iconName: "FaReact", 
    items: ["React", "Tailwind CSS", "TypeScript", "HTML5", "CSS3", "JavaScript"] 
  },
  { 
    category: "Backend",
    iconName: "FaNodeJs",
    items: ["Node.js", "Express.js", "MySQL", "Redis", "REST APIs"] 
  },
  { 
    category: "UX/UI",
    iconName: "FaPalette",
    items: ["Figma", "Adobe Photoshop", "Adobe Illustrator"] 
  },
  { 
    category: "DevOps",
    iconName: "FaRocket",
    items: ["Git", "GitHub", "GitLab", "Docker"] 
  },
  { 
    category: "Tooling",
    iconName: "FaCogs",
    items: ["VS Code", "Postman", "npm", "Yarn"] 
  },
];

export const social = {
  email: "gianfranco.uqz@gmail.com",
  linkedin: "https://www.linkedin.com/in/gianfranco-andreachi-a42043260/",
  github: "https://github.com/Giani2110",
};