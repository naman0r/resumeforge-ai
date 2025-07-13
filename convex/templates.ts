import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Default templates
const DEFAULT_TEMPLATES = [
  {
    name: "Simple Resume",
    description: "Clean and minimal resume template",
    category: "simple",
    latexContent: `\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.75in]{geometry}
\\begin{document}
\\begin{center}
{\\LARGE \\textbf{Your Name}}\\\\
Email: your.email@example.com | Phone: (123) 456-7890
\\end{center}

\\section*{Education}
\\textbf{University Name} \\hfill 2020 - 2024\\\\
Bachelor of Science in Computer Science

\\section*{Experience}
\\textbf{Company Name} - Software Engineer \\hfill 2023 - Present
\\begin{itemize}
  \\item Developed web applications using React and Node.js
  \\item Collaborated with team to deliver projects on time
\\end{itemize}

\\end{document}`,
  },
  // Add more templates here
];

export const seedTemplates = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("templates").take(1);
    if (existing.length > 0) return;

    for (const template of DEFAULT_TEMPLATES) {
      await ctx.db.insert("templates", {
        ...template,
        isPublic: true,
      });
    }
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("templates")
      .filter((q) => q.eq(q.field("isPublic"), true))
      .collect();
  },
});
