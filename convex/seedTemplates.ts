import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedTemplates = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx, args) => {
    // Check if templates already exist
    const existingTemplates = await ctx.db.query("templates").collect();

    if (existingTemplates.length > 0) {
      console.log("Templates already exist, skipping seed");
      return null;
    }

    const templates = [
      {
        name: "Modern Professional",
        description:
          "Clean, modern resume with elegant typography and professional layout. Perfect for tech professionals and creative roles.",
        category: "modern",
        difficulty: "beginner" as const,
        tags: ["professional", "clean", "modern", "tech"],
        latexCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage[utf8]{inputenc}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}

% Define colors
\\definecolor{primary}{RGB}{54, 69, 79}
\\definecolor{accent}{RGB}{41, 128, 185}

% Custom section formatting
\\titleformat{\\section}{\\color{primary}\\Large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{12pt}{6pt}

\\begin{document}

{\\color{primary}\\Huge\\bfseries John Developer}\\\\[4pt]
{\\color{accent}\\large Software Engineer}\\\\[8pt]
\\textbf{Email:} john.developer@email.com | 
\\textbf{Phone:} (555) 123-4567 | 
\\textbf{LinkedIn:} linkedin.com/in/johndeveloper

\\section*{Professional Summary}
Passionate software engineer with 5+ years of experience building scalable web applications. 
Expertise in full-stack development with strong problem-solving skills and a commitment to writing clean, maintainable code.

\\section*{Technical Skills}
\\textbf{Languages:} JavaScript, TypeScript, Python, Java, SQL\\\\
\\textbf{Frameworks:} React, Node.js, Express, Django, Spring Boot\\\\
\\textbf{Databases:} PostgreSQL, MongoDB, Redis\\\\
\\textbf{Tools:} Docker, AWS, Git, Jenkins, Kubernetes

\\section*{Professional Experience}

\\textbf{Senior Software Engineer} \\hfill \\textit{TechCorp Inc. | 2021 - Present}
\\begin{itemize}[leftmargin=*,noitemsep]
  \\item Led development of microservices architecture serving 1M+ users
  \\item Improved application performance by 40\\% through code optimization
  \\item Mentored 3 junior developers and conducted code reviews
  \\item Implemented CI/CD pipelines reducing deployment time by 60\\%
\\end{itemize}

\\textbf{Software Engineer} \\hfill \\textit{StartupXYZ | 2019 - 2021}
\\begin{itemize}[leftmargin=*,noitemsep]
  \\item Built responsive web applications using React and Node.js
  \\item Designed and implemented RESTful APIs handling 10K+ requests/day
  \\item Collaborated with design team to create intuitive user interfaces
\\end{itemize}

\\section*{Education}
\\textbf{Bachelor of Science in Computer Science} \\hfill \\textit{State University | 2019}\\\\
\\textit{Magna Cum Laude, GPA: 3.8/4.0}

\\section*{Projects}
\\textbf{E-commerce Platform} - Full-stack application with React frontend and Node.js backend\\\\
\\textbf{Task Management App} - Mobile-first web app with real-time collaboration features

\\end{document}`,
        author: "ResumeForge Team",
        isPublic: true,
        downloadCount: 0,
        rating: 4.8,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Academic Research",
        description:
          "Traditional academic resume format ideal for professors, researchers, and PhD candidates. Includes sections for publications and research.",
        category: "academic",
        difficulty: "intermediate" as const,
        tags: ["academic", "research", "publications", "traditional"],
        latexCode: `\\documentclass[11pt]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage[utf8]{inputenc}
\\usepackage{enumitem}
\\usepackage{bibentry}
\\usepackage{url}

\\begin{document}

\\begin{center}
{\\Large\\textbf{Dr. Jane Research, PhD}}\\\\[6pt]
Department of Computer Science\\\\
Research University\\\\
\\texttt{jane.research@university.edu} | (555) 987-6543\\\\
ORCID: 0000-0000-0000-0000
\\end{center}

\\section*{Research Interests}
Machine Learning, Natural Language Processing, Computer Vision, Artificial Intelligence

\\section*{Education}
\\textbf{Ph.D. in Computer Science} \\hfill \\textit{Research University, 2020}\\\\
Dissertation: "Advanced Deep Learning Techniques for Natural Language Understanding"\\\\
Advisor: Prof. John Smith\\\\

\\textbf{M.S. in Computer Science} \\hfill \\textit{Tech Institute, 2016}\\\\
\\textbf{B.S. in Computer Science} \\hfill \\textit{State College, 2014}

\\section*{Academic Positions}
\\textbf{Assistant Professor} \\hfill \\textit{Research University | 2020 - Present}\\\\
Department of Computer Science

\\textbf{Postdoctoral Researcher} \\hfill \\textit{National Lab | 2020 - 2021}\\\\
Machine Learning Research Division

\\section*{Publications}

\\subsection*{Journal Articles}
\\begin{enumerate}
\\item Research, J., Smith, A. (2023). "Novel Approaches to Deep Learning Architecture." 
      \\textit{Journal of Machine Learning Research}, 24(5), 123-145.
\\item Research, J., et al. (2022). "Improving Natural Language Processing with Attention Mechanisms." 
      \\textit{Computational Linguistics}, 48(2), 267-289.
\\end{enumerate}

\\subsection*{Conference Papers}
\\begin{enumerate}
\\item Research, J., Brown, B. (2023). "Advanced Computer Vision Techniques." 
      \\textit{Proceedings of ICML 2023}, pp. 456-467.
\\item Research, J. (2022). "Deep Learning for Text Analysis." 
      \\textit{Proceedings of NeurIPS 2022}, pp. 1234-1245.
\\end{enumerate}

\\section*{Grants and Funding}
\\textbf{NSF Research Grant} (\\$250,000) \\hfill \\textit{2022 - 2025}\\\\
"Advancing AI through Novel Deep Learning Architectures"

\\section*{Teaching Experience}
\\textbf{CS 101: Introduction to Programming} \\hfill \\textit{Fall 2021, Spring 2022}\\\\
\\textbf{CS 405: Machine Learning} \\hfill \\textit{Fall 2022, Spring 2023}

\\section*{Professional Service}
\\begin{itemize}[leftmargin=*]
\\item Reviewer: ICML, NeurIPS, ICLR (2021-Present)
\\item Program Committee Member: AAAI 2023
\\item Editorial Board: Journal of AI Research (2022-Present)
\\end{itemize}

\\end{document}`,
        author: "ResumeForge Team",
        isPublic: true,
        downloadCount: 0,
        rating: 4.6,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Creative Designer",
        description:
          "Eye-catching resume design for creative professionals. Features unique layout and typography perfect for designers and artists.",
        category: "creative",
        difficulty: "advanced" as const,
        tags: ["creative", "design", "artistic", "unique"],
        latexCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[margin=0.5in]{geometry}
\\usepackage[utf8]{inputenc}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{tikz}
\\usepackage{fontawesome}

% Define colors
\\definecolor{primary}{RGB}{34, 34, 34}
\\definecolor{accent}{RGB}{255, 107, 107}
\\definecolor{light}{RGB}{248, 248, 248}

% Custom section formatting
\\titleformat{\\section}{\\color{accent}\\Large\\bfseries}{}{0em}{}
\\titlespacing*{\\section}{0pt}{16pt}{8pt}

\\begin{document}

% Header with creative layout
\\begin{tikzpicture}[remember picture,overlay]
  \\fill[accent] (current page.north west) rectangle ([yshift=-2cm]current page.north east);
\\end{tikzpicture}

\\vspace{0.5cm}
{\\color{white}\\Huge\\bfseries Alex Creative}\\\\[4pt]
{\\color{white}\\large Visual Designer \\& Creative Director}

\\vspace{1cm}

\\begin{minipage}[t]{0.6\\textwidth}
\\section*{Creative Vision}
Passionate visual designer with 7+ years of experience creating compelling brand identities and digital experiences. 
Specializing in user-centered design that drives engagement and delivers measurable business results.

\\section*{Core Competencies}
\\begin{itemize}[leftmargin=*,noitemsep]
\\item Brand Identity \\& Logo Design
\\item User Experience (UX) Design  
\\item User Interface (UI) Design
\\item Print \\& Digital Media
\\item Creative Direction
\\item Team Leadership
\\end{itemize}

\\section*{Professional Experience}

\\textbf{Creative Director} \\hfill \\textit{2021 - Present}\\\\
\\textsl{Innovation Agency}
\\begin{itemize}[leftmargin=*,noitemsep]
\\item Led creative team of 8 designers and developers
\\item Increased client satisfaction by 35\\% through innovative design solutions
\\item Managed brand redesigns for Fortune 500 companies
\\end{itemize}

\\textbf{Senior Visual Designer} \\hfill \\textit{2018 - 2021}\\\\
\\textsl{Digital Studio}
\\begin{itemize}[leftmargin=*,noitemsep]
\\item Created brand identities for 50+ startups and SMBs
\\item Designed award-winning mobile apps with 1M+ downloads
\\item Collaborated with development teams on user experience
\\end{itemize}

\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.35\\textwidth}

\\section*{Contact}
\\faEnvelope\\space alex.creative@email.com\\\\
\\faPhone\\space (555) 234-5678\\\\
\\faLinkedin\\space linkedin.com/in/alexcreative\\\\
\\faBehance\\space behance.net/alexcreative\\\\
\\faGlobe\\space alexcreative.com

\\section*{Technical Skills}
\\textbf{Design Tools}\\\\
Adobe Creative Suite\\\\
Figma, Sketch\\\\
Principle, InVision\\\\

\\textbf{Development}\\\\
HTML5, CSS3\\\\
JavaScript (ES6+)\\\\
React, Vue.js\\\\

\\textbf{3D \\& Motion}\\\\
Cinema 4D\\\\
After Effects\\\\
Blender

\\section*{Education}
\\textbf{BFA Visual Design}\\\\
\\textsl{Art Institute}\\\\
\\textit{Summa Cum Laude}\\\\
\\textit{2016}

\\section*{Awards}
\\textbf{Webby Award}\\\\
\\textsl{Best Mobile App UI}\\\\
\\textit{2022}

\\textbf{Awwwards}\\\\
\\textsl{Site of the Day}\\\\
\\textit{2021}

\\end{minipage}

\\end{document}`,
        author: "ResumeForge Team",
        isPublic: true,
        downloadCount: 0,
        rating: 4.9,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Classic Professional",
        description:
          "Timeless, traditional resume format that works well for corporate environments and conservative industries.",
        category: "classic",
        difficulty: "beginner" as const,
        tags: ["traditional", "corporate", "conservative", "timeless"],
        latexCode: `\\documentclass[letterpaper,11pt]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage[utf8]{inputenc}
\\usepackage{enumitem}

\\begin{document}

\\begin{center}
{\\Large\\textbf{ROBERT PROFESSIONAL}}\\\\[6pt]
123 Main Street, City, State 12345\\\\
(555) 123-4567 | robert.professional@email.com
\\end{center}

\\section*{OBJECTIVE}
Experienced business professional seeking a senior management position where I can utilize my 
proven track record in operations management, team leadership, and strategic planning to drive 
organizational growth and success.

\\section*{PROFESSIONAL EXPERIENCE}

\\textbf{Operations Manager} \\hfill \\textbf{2019 - Present}\\\\
\\textit{Global Corporation, City, State}
\\begin{itemize}
\\item Manage daily operations for department of 25+ employees
\\item Increased operational efficiency by 30\\% through process improvements
\\item Reduced costs by \\$500K annually while maintaining quality standards
\\item Led cross-functional projects with budgets exceeding \\$2M
\\end{itemize}

\\textbf{Assistant Operations Manager} \\hfill \\textbf{2016 - 2019}\\\\
\\textit{Regional Company, City, State}
\\begin{itemize}
\\item Supervised team of 12 specialists in quality assurance and logistics
\\item Implemented new inventory management system reducing waste by 25\\%
\\item Coordinated with suppliers and vendors to ensure timely delivery
\\item Trained and mentored new employees on company procedures
\\end{itemize}

\\textbf{Operations Specialist} \\hfill \\textbf{2014 - 2016}\\\\
\\textit{Local Business, City, State}
\\begin{itemize}
\\item Analyzed operational data to identify improvement opportunities
\\item Prepared detailed reports for senior management review
\\item Assisted in developing standard operating procedures
\\end{itemize}

\\section*{EDUCATION}

\\textbf{Master of Business Administration (MBA)} \\hfill \\textbf{2014}\\\\
\\textit{State University, City, State}\\\\
Concentration: Operations Management

\\textbf{Bachelor of Science in Business Administration} \\hfill \\textbf{2012}\\\\
\\textit{City College, City, State}\\\\
Magna Cum Laude, GPA: 3.7/4.0

\\section*{SKILLS}
\\begin{itemize}
\\item Project Management: PMP Certified, Agile/Scrum methodologies
\\item Software: Microsoft Office Suite, SAP, Salesforce, Tableau
\\item Leadership: Team building, performance management, conflict resolution
\\item Analysis: Data analysis, process improvement, cost reduction strategies
\\end{itemize}

\\section*{CERTIFICATIONS}
\\begin{itemize}
\\item Project Management Professional (PMP) - 2018
\\item Six Sigma Green Belt - 2017
\\item Lean Manufacturing Certificate - 2016
\\end{itemize}

\\end{document}`,
        author: "ResumeForge Team",
        isPublic: true,
        downloadCount: 0,
        rating: 4.5,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    // Insert all templates
    for (const template of templates) {
      await ctx.db.insert("templates", template);
    }

    console.log(`Seeded ${templates.length} templates`);
    return null;
  },
});
