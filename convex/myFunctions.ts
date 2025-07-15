import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// User Management Functions

export const createUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .unique();

    if (existingUser) {
      // Update last active time
      await ctx.db.patch(existingUser._id, {
        lastActiveAt: Date.now(),
      });
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      userId: args.userId,
      email: args.email,
      name: args.name,
      subscription: "free",
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });

    return userId;
  },
});

export const getUser = query({
  args: {
    userId: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("users"),
      userId: v.string(),
      email: v.string(),
      name: v.string(),
      subscription: v.union(v.literal("free"), v.literal("pro")),
      hasOpenRouterKey: v.boolean(),
      createdAt: v.number(),
      lastActiveAt: v.number(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .unique();

    if (!user) return null;

    return {
      _id: user._id,
      userId: user.userId,
      email: user.email,
      name: user.name,
      subscription: user.subscription,
      hasOpenRouterKey: !!user.openRouterApiKey,
      createdAt: user.createdAt,
      lastActiveAt: user.lastActiveAt,
    };
  },
});

export const updateOpenRouterKey = mutation({
  args: {
    userId: v.string(),
    apiKey: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      openRouterApiKey: args.apiKey,
    });

    return null;
  },
});

// Template Management Functions

export const getPublicTemplates = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  returns: v.array(
    v.object({
      _id: v.id("templates"),
      name: v.string(),
      description: v.string(),
      category: v.string(),
      difficulty: v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("advanced"),
      ),
      tags: v.array(v.string()),
      thumbnailUrl: v.optional(v.string()),
      author: v.string(),
      downloadCount: v.number(),
      rating: v.number(),
      createdAt: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("templates")
      .withIndex("by_public", (q) => q.eq("isPublic", true));

    if (args.category) {
      query = ctx.db
        .query("templates")
        .withIndex("by_category", (q) => q.eq("category", args.category))
        .filter((q) => q.eq(q.field("isPublic"), true));
    }

    const templates = await query.order("desc").take(args.limit || 20);

    return templates.map((template) => ({
      _id: template._id,
      name: template.name,
      description: template.description,
      category: template.category,
      difficulty: template.difficulty,
      tags: template.tags,
      thumbnailUrl: template.thumbnailUrl,
      author: template.author,
      downloadCount: template.downloadCount,
      rating: template.rating,
      createdAt: template.createdAt,
    }));
  },
});

export const getTemplateById = query({
  args: {
    templateId: v.id("templates"),
  },
  returns: v.union(
    v.object({
      _id: v.id("templates"),
      name: v.string(),
      description: v.string(),
      category: v.string(),
      difficulty: v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("advanced"),
      ),
      tags: v.array(v.string()),
      latexCode: v.string(),
      thumbnailUrl: v.optional(v.string()),
      author: v.string(),
      downloadCount: v.number(),
      rating: v.number(),
      createdAt: v.number(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);

    if (!template || !template.isPublic) {
      return null;
    }

    return {
      _id: template._id,
      name: template.name,
      description: template.description,
      category: template.category,
      difficulty: template.difficulty,
      tags: template.tags,
      latexCode: template.latexCode,
      thumbnailUrl: template.thumbnailUrl,
      author: template.author,
      downloadCount: template.downloadCount,
      rating: template.rating,
      createdAt: template.createdAt,
    };
  },
});

export const incrementTemplateDownload = mutation({
  args: {
    templateId: v.id("templates"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);

    if (template) {
      await ctx.db.patch(args.templateId, {
        downloadCount: template.downloadCount + 1,
      });
    }

    return null;
  },
});

// Resume Management Functions

export const createResume = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    templateId: v.optional(v.id("templates")),
    latexCode: v.optional(v.string()),
  },
  returns: v.id("resumes"),
  handler: async (ctx, args) => {
    let initialLatexCode = args.latexCode;

    // If creating from template, get the template code
    if (args.templateId && !initialLatexCode) {
      const template = await ctx.db.get(args.templateId);
      if (template && template.isPublic) {
        initialLatexCode = template.latexCode;
        // Increment download count
        await ctx.db.patch(args.templateId, {
          downloadCount: template.downloadCount + 1,
        });
      }
    }

    if (!initialLatexCode) {
      // Default minimal LaTeX template
      initialLatexCode = `\\documentclass[letterpaper,11pt]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage[utf8]{inputenc}
\\usepackage{enumitem}

\\begin{document}

\\section*{Your Name}
\\textit{Your Title}\\\\
Email: your.email@example.com | Phone: (123) 456-7890

\\section*{Experience}
\\textbf{Job Title} \\hfill \\textit{Company Name}\\\\
\\textit{Date Range}
\\begin{itemize}[leftmargin=*]
  \\item Achievement or responsibility
  \\item Another achievement
\\end{itemize}

\\section*{Education}
\\textbf{Degree} \\hfill \\textit{University Name}\\\\
\\textit{Graduation Date}

\\section*{Skills}
Programming Languages, Technologies, etc.

\\end{document}`;
    }

    // At this point, initialLatexCode is guaranteed to be a string
    const finalLatexCode: string = initialLatexCode;

    const resumeId = await ctx.db.insert("resumes", {
      userId: args.userId,
      title: args.title,
      templateId: args.templateId,
      latexCode: finalLatexCode,
      compilationStatus: "draft",
      version: 1,
      isPrivate: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create initial version
    await ctx.db.insert("resumeVersions", {
      resumeId,
      userId: args.userId,
      version: 1,
      latexCode: finalLatexCode,
      changelog: "Initial version",
      createdAt: Date.now(),
    });

    return resumeId;
  },
});

export const getUserResumes = query({
  args: {
    userId: v.string(),
  },
  returns: v.array(
    v.object({
      _id: v.id("resumes"),
      title: v.string(),
      templateId: v.optional(v.id("templates")),
      compilationStatus: v.union(
        v.literal("draft"),
        v.literal("compiling"),
        v.literal("compiled"),
        v.literal("error"),
      ),
      version: v.number(),
      createdAt: v.number(),
      updatedAt: v.number(),
      lastCompiledAt: v.optional(v.number()),
    }),
  ),
  handler: async (ctx, args) => {
    const resumes = await ctx.db
      .query("resumes")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return resumes.map((resume) => ({
      _id: resume._id,
      title: resume.title,
      templateId: resume.templateId,
      compilationStatus: resume.compilationStatus,
      version: resume.version,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
      lastCompiledAt: resume.lastCompiledAt,
    }));
  },
});

export const getResumeById = query({
  args: {
    resumeId: v.id("resumes"),
    userId: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("resumes"),
      title: v.string(),
      templateId: v.optional(v.id("templates")),
      latexCode: v.string(),
      compilationStatus: v.union(
        v.literal("draft"),
        v.literal("compiling"),
        v.literal("compiled"),
        v.literal("error"),
      ),
      compilationError: v.optional(v.string()),
      version: v.number(),
      createdAt: v.number(),
      updatedAt: v.number(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const resume = await ctx.db.get(args.resumeId);

    if (!resume || resume.userId !== args.userId) {
      return null;
    }

    return {
      _id: resume._id,
      title: resume.title,
      templateId: resume.templateId,
      latexCode: resume.latexCode,
      compilationStatus: resume.compilationStatus,
      compilationError: resume.compilationError,
      version: resume.version,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  },
});

export const updateResume = mutation({
  args: {
    resumeId: v.id("resumes"),
    userId: v.string(),
    title: v.optional(v.string()),
    latexCode: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const resume = await ctx.db.get(args.resumeId);

    if (!resume || resume.userId !== args.userId) {
      throw new Error("Resume not found or access denied");
    }

    const updates: any = {
      updatedAt: Date.now(),
    };

    if (args.title !== undefined) {
      updates.title = args.title;
    }

    if (args.latexCode !== undefined) {
      updates.latexCode = args.latexCode;
      updates.compilationStatus = "draft";
      updates.version = resume.version + 1;

      // Create new version
      await ctx.db.insert("resumeVersions", {
        resumeId: args.resumeId,
        userId: args.userId,
        version: updates.version,
        latexCode: args.latexCode,
        changelog: "Manual edit",
        createdAt: Date.now(),
      });
    }

    await ctx.db.patch(args.resumeId, updates);

    return null;
  },
});

// Template categories helper
export const getTemplateCategories = query({
  args: {},
  returns: v.array(
    v.object({
      category: v.string(),
      count: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_public", (q) => q.eq("isPublic", true))
      .collect();

    const categoryCount: Record<string, number> = {};

    templates.forEach((template) => {
      categoryCount[template.category] =
        (categoryCount[template.category] || 0) + 1;
    });

    return Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
    }));
  },
});
