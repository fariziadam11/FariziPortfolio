const skills = [
  // Frontend
  { 
    name: 'HTML & CSS', 
    level: 90, 
    icon: '🌐', 
    category: 'frontend',
    description: 'Proficient in creating responsive layouts and modern CSS techniques including Flexbox, Grid, and CSS animations. Experienced in building mobile-first designs and implementing cross-browser compatibility.',
    barColor: 'bg-gradient-to-r from-orange-500 to-pink-500',
    projects: ['Personal Portfolio', 'E-commerce Website', 'Company Landing Page'],
    relatedSkills: ['SASS/SCSS', 'Bootstrap', 'Tailwind CSS', 'Responsive Design']
  },
  { 
    name: 'JavaScript', 
    level: 85, 
    icon: '📜', 
    category: 'frontend',
    description: 'Strong knowledge of ES6+ features, asynchronous programming, and DOM manipulation. Experienced with modern JavaScript practices including Promises, async/await, and functional programming concepts.',
    barColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    projects: ['Task Management App', 'Weather Dashboard', 'Interactive Data Visualization'],
    relatedSkills: ['TypeScript', 'jQuery', 'React', 'Vue.js']
  },
  { 
    name: 'React', 
    level: 80, 
    icon: '⚛️', 
    category: 'frontend',
    description: 'Experience with hooks, context API, and state management solutions like Redux. Proficient in building reusable components and optimizing performance in React applications.',
    barColor: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    projects: ['Personal Portfolio', 'E-commerce Dashboard', 'Social Media App'],
    relatedSkills: ['Redux', 'React Router', 'Next.js', 'Styled Components']
  },
  { 
    name: 'Tailwind CSS', 
    level: 85, 
    icon: '🎨', 
    category: 'frontend',
    description: 'Utility-first CSS framework for rapid UI development. Experienced in creating custom designs while maintaining consistency using Tailwind\'s configuration system.',
    barColor: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    projects: ['Personal Portfolio', 'Admin Dashboard', 'Marketing Website'],
    relatedSkills: ['CSS', 'Responsive Design', 'UI/UX', 'PostCSS']
  },
  
  // Backend
  { 
    name: 'PHP', 
    level: 75, 
    icon: '🐘', 
    category: 'backend',
    description: 'Server-side scripting language for web applications. Experienced in building secure and scalable web applications with PHP, including authentication systems and API integrations.',
    barColor: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    projects: ['CMS System', 'E-commerce Backend', 'RESTful API'],
    relatedSkills: ['Laravel', 'Symfony', 'Composer', 'PHPUnit']
  },
  { 
    name: 'Laravel', 
    level: 70, 
    icon: '🔺', 
    category: 'backend',
    description: 'PHP framework for web application development with MVC architecture. Proficient in using Laravel\'s features including Eloquent ORM, Blade templating, and middleware system.',
    barColor: 'bg-gradient-to-r from-red-500 to-pink-500',
    projects: ['Blog Platform', 'Inventory Management System', 'Customer Portal'],
    relatedSkills: ['PHP', 'Eloquent ORM', 'Blade', 'Laravel Mix']
  },
  { 
    name: 'FastAPI', 
    level: 65, 
    icon: '🚀', 
    category: 'backend',
    description: 'Modern Python web framework for building APIs with high performance. Experienced in creating RESTful APIs with automatic documentation using OpenAPI.',
    barColor: 'bg-gradient-to-r from-green-400 to-teal-500',
    projects: ['Data Analytics API', 'Microservice Architecture', 'Real-time Dashboard Backend'],
    relatedSkills: ['Python', 'Pydantic', 'SQLAlchemy', 'Async Programming']
  },
  { 
    name: 'Node.js', 
    level: 70, 
    icon: '🟢', 
    category: 'backend',
    description: 'JavaScript runtime for server-side applications. Proficient in building scalable backend services and RESTful APIs using Express.js and other Node.js frameworks.',
    barColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
    projects: ['Real-time Chat Application', 'Payment Processing Service', 'Content Management API'],
    relatedSkills: ['Express.js', 'Socket.io', 'JWT Authentication', 'Microservices']
  },
  
  // Database
  { 
    name: 'MySQL', 
    level: 75, 
    icon: '💾', 
    category: 'database',
    description: 'Relational database management system. Experienced in designing efficient database schemas, writing complex queries, and optimizing database performance.',
    barColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
    projects: ['E-commerce Platform', 'Content Management System', 'Analytics Dashboard'],
    relatedSkills: ['SQL', 'Database Design', 'Stored Procedures', 'Indexing']
  },
  { 
    name: 'MongoDB', 
    level: 65, 
    icon: '🍃', 
    category: 'database',
    description: 'NoSQL document database for modern applications. Proficient in designing document schemas, implementing data validation, and using aggregation pipelines for complex data operations.',
    barColor: 'bg-gradient-to-r from-green-500 to-green-700',
    projects: ['Social Media Platform', 'Content Recommendation System', 'User Analytics Service'],
    relatedSkills: ['NoSQL', 'Mongoose', 'Atlas', 'Data Modeling']
  },
  
  // Tools & Others
  { 
    name: 'Git', 
    level: 80, 
    icon: '📂', 
    category: 'tools',
    description: 'Version control system for tracking changes in code. Experienced in collaborative development workflows, branching strategies, and resolving merge conflicts.',
    barColor: 'bg-gradient-to-r from-orange-500 to-red-500',
    projects: ['All Development Projects', 'Open Source Contributions', 'Team Collaboration'],
    relatedSkills: ['GitHub', 'GitLab', 'CI/CD', 'Branching Strategies']
  },
  { 
    name: 'Docker', 
    level: 60, 
    icon: '🐳', 
    category: 'tools',
    description: 'Containerization platform for application deployment. Proficient in creating Docker images, managing containers, and setting up multi-container applications with Docker Compose.',
    barColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
    projects: ['Microservices Architecture', 'Development Environments', 'Continuous Integration Pipeline'],
    relatedSkills: ['Containerization', 'Docker Compose', 'Kubernetes', 'DevOps']
  },
  { 
    name: 'UI/UX Design', 
    level: 70, 
    icon: '🎨', 
    category: 'design',
    description: 'Creating user-centered designs with focus on usability and aesthetics. Experienced in wireframing, prototyping, and implementing modern design principles.',
    barColor: 'bg-gradient-to-r from-purple-400 to-pink-500',
    projects: ['E-commerce Redesign', 'Mobile App Interface', 'Design System Development'],
    relatedSkills: ['Figma', 'Adobe XD', 'Wireframing', 'User Research']
  },
  { 
    name: 'TypeScript', 
    level: 75, 
    icon: '🔥', 
    category: 'frontend',
    description: 'Strongly typed programming language that builds on JavaScript. Experienced in using TypeScript to build robust and maintainable applications with fewer runtime errors.',
    barColor: 'bg-gradient-to-r from-blue-600 to-blue-800',
    projects: ['Enterprise Web Application', 'React Component Library', 'Node.js Backend Services'],
    relatedSkills: ['JavaScript', 'React', 'Angular', 'Type Systems']
  }
];

export default skills;