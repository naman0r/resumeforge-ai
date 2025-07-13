import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),
  resumes: defineTable({
    userId: v.string(),
    title: v.string(),
    slug: v.string(),
    latexContent: v.string(),
    pdfUrl: v.optional(v.string()),
    isPublic: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_slug", ["slug"])
    .index("by_user_slug", ["userId", "slug"]),

  templates: defineTable({
    name: v.string(),
    description: v.string(),
    latexContent: v.string(),
    category: v.string(),
    thumbnailUrl: v.optional(v.string()),
    isPublic: v.boolean(),
    authorId: v.optional(v.string()),
  })
    .index("by_category", ["category"])
    .index("by_author", ["authorId"]),

  resumeVersions: defineTable({
    resumeId: v.id("resumes"),
    version: v.number(),
    latexContent: v.string(),
    changeDescription: v.optional(v.string()),
    createdAt: v.number(),
    createdBy: v.string(),
  }).index("by_resume", ["resumeId"]),
});
