import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User profiles and settings
  users: defineTable({
    userId: v.string(), // Clerk user ID
    email: v.string(),
    name: v.string(),
    openRouterApiKey: v.optional(v.string()), // Encrypted API key for AI features
    subscription: v.union(v.literal("free"), v.literal("pro")),
    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
    .index("by_user_id", ["userId"])
    .index("by_email", ["email"]),

  // LaTeX resume templates (free gallery)
  templates: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(), // "modern", "classic", "academic", "creative", etc.
    difficulty: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced"),
    ),
    tags: v.array(v.string()), // ["software", "design", "finance", etc.]
    latexCode: v.string(), // The actual LaTeX template code
    thumbnailUrl: v.optional(v.string()), // Preview image
    previewPdfId: v.optional(v.id("_storage")), // Compiled PDF preview
    author: v.string(),
    isPublic: v.boolean(),
    downloadCount: v.number(),
    rating: v.number(), // Average rating 1-5
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_rating", ["rating"])
    .index("by_downloads", ["downloadCount"])
    .index("by_public", ["isPublic"])
    .searchIndex("search_templates", {
      searchField: "name",
      filterFields: ["category", "isPublic", "tags"],
    }),

  // User's personal resumes
  resumes: defineTable({
    userId: v.string(), // Owner of the resume
    title: v.string(),
    templateId: v.optional(v.id("templates")), // Original template if based on one
    latexCode: v.string(), // Current LaTeX source
    compiledPdfId: v.optional(v.id("_storage")), // Latest compiled PDF
    compilationStatus: v.union(
      v.literal("draft"),
      v.literal("compiling"),
      v.literal("compiled"),
      v.literal("error"),
    ),
    compilationError: v.optional(v.string()),
    version: v.number(), // Version number for tracking changes
    isPrivate: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    lastCompiledAt: v.optional(v.number()),
  })
    .index("by_user_id", ["userId"])
    .index("by_template_id", ["templateId"])
    .index("by_status", ["compilationStatus"])
    .searchIndex("search_user_resumes", {
      searchField: "title",
      filterFields: ["userId"],
    }),

  // Version history for resumes
  resumeVersions: defineTable({
    resumeId: v.id("resumes"),
    userId: v.string(),
    version: v.number(),
    latexCode: v.string(),
    compiledPdfId: v.optional(v.id("_storage")),
    changelog: v.optional(v.string()), // What changed in this version
    createdAt: v.number(),
  })
    .index("by_resume_id", ["resumeId"])
    .index("by_user_and_resume", ["userId", "resumeId"])
    .index("by_version", ["resumeId", "version"]),

  // Job descriptions for AI optimization
  jobDescriptions: defineTable({
    userId: v.string(),
    title: v.string(),
    company: v.string(),
    description: v.string(), // Full job description text
    requirements: v.array(v.string()), // Extracted key requirements
    skills: v.array(v.string()), // Required skills
    location: v.optional(v.string()),
    salaryRange: v.optional(v.string()),
    url: v.optional(v.string()), // Original job posting URL
    createdAt: v.number(),
  })
    .index("by_user_id", ["userId"])
    .searchIndex("search_jobs", {
      searchField: "title",
      filterFields: ["userId", "company"],
    }),

  // AI optimization results
  optimizations: defineTable({
    userId: v.string(),
    resumeId: v.id("resumes"),
    jobDescriptionId: v.id("jobDescriptions"),
    originalLatexCode: v.string(),
    optimizedLatexCode: v.string(),
    optimizedPdfId: v.optional(v.id("_storage")),
    aiModel: v.string(), // Which AI model was used
    changes: v.array(
      v.object({
        section: v.string(),
        original: v.string(),
        optimized: v.string(),
        reason: v.string(),
      }),
    ),
    matchScore: v.number(), // How well it matches the job (0-100)
    feedback: v.optional(v.string()), // User feedback on optimization
    applied: v.boolean(), // Whether user applied this optimization
    createdAt: v.number(),
  })
    .index("by_user_id", ["userId"])
    .index("by_resume_id", ["resumeId"])
    .index("by_job_id", ["jobDescriptionId"])
    .index("by_user_and_resume", ["userId", "resumeId"])
    .index("by_match_score", ["matchScore"]),

  // Compilation queue for server-side LaTeX processing
  compilationJobs: defineTable({
    userId: v.string(),
    resumeId: v.id("resumes"),
    latexCode: v.string(),
    status: v.union(
      v.literal("queued"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed"),
    ),
    errorMessage: v.optional(v.string()),
    resultPdfId: v.optional(v.id("_storage")),
    processingStartedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    retryCount: v.number(),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_user_id", ["userId"])
    .index("by_resume_id", ["resumeId"])
    .index("by_created_at", ["createdAt"]),

  // User activity and analytics
  userActivity: defineTable({
    userId: v.string(),
    action: v.string(), // "template_used", "resume_created", "ai_optimized", etc.
    resourceId: v.optional(v.string()), // ID of related resource
    metadata: v.optional(
      v.object({
        templateId: v.optional(v.id("templates")),
        resumeId: v.optional(v.id("resumes")),
        feature: v.optional(v.string()),
      }),
    ),
    createdAt: v.number(),
  })
    .index("by_user_id", ["userId"])
    .index("by_action", ["action"])
    .index("by_created_at", ["createdAt"]),

  // Template ratings and reviews
  templateReviews: defineTable({
    userId: v.string(),
    templateId: v.id("templates"),
    rating: v.number(), // 1-5 stars
    review: v.optional(v.string()),
    helpful: v.number(), // How many found this helpful
    createdAt: v.number(),
  })
    .index("by_template_id", ["templateId"])
    .index("by_user_id", ["userId"])
    .index("by_rating", ["rating"]),

  // Shared resumes (public portfolio feature)
  sharedResumes: defineTable({
    resumeId: v.id("resumes"),
    userId: v.string(),
    shareId: v.string(), // Public share identifier
    title: v.string(),
    description: v.optional(v.string()),
    isPublic: v.boolean(),
    passwordProtected: v.boolean(),
    password: v.optional(v.string()), // Hashed password
    viewCount: v.number(),
    allowDownload: v.boolean(),
    expiresAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_share_id", ["shareId"])
    .index("by_user_id", ["userId"])
    .index("by_resume_id", ["resumeId"])
    .index("by_public", ["isPublic"]),
});
