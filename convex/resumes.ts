import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      // Return empty array if not authenticated
      return [];
    }

    const resumes = await ctx.db
      .query("resumes")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();

    return resumes;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    latexContent: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Must be logged in to create a resume");
    }

    const resumeId = await ctx.db.insert("resumes", {
      userId: identity.subject,
      title: args.title,
      slug: args.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      latexContent: args.latexContent,
      isPublic: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return resumeId;
  },
});
