"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Plus, FileText, Calendar } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user, isLoaded: userLoaded } = useUser();
  const resumes = useQuery(api.resumes.list);
  const createResume = useMutation(api.resumes.create);
  const [creating, setCreating] = useState(false);

  // Debug info
  console.log("Clerk user:", user);
  console.log("Resumes query result:", resumes);

  if (!userLoaded) {
    return <div className="p-8">Loading user...</div>;
  }

  if (!user) {
    return <div className="p-8">Please sign in to view your resumes.</div>;
  }

  if (resumes === undefined) {
    return <div className="p-8">Loading resumes...</div>;
  }

  const handleCreate = async () => {
    setCreating(true);
    try {
      const id = await createResume({
        title: "Untitled Resume",
        latexContent:
          "\\documentclass{article}\n\\begin{document}\nYour Resume Here\n\\end{document}",
      });
      console.log("Created resume with ID:", id);
    } catch (error) {
      console.error("Error creating resume:", error);
      alert("Error creating resume. Check console.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            {creating ? "Creating..." : "New Resume"}
          </button>
        </div>

        {resumes.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No resumes
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new resume.
            </p>
            <div className="mt-6">
              <button
                onClick={handleCreate}
                disabled={creating}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Create Resume
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume: any) => (
              <div
                key={resume._id}
                className="cursor-pointer rounded-lg border bg-white p-6 shadow-sm hover:shadow-md"
              >
                <h3 className="font-semibold">{resume.title}</h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
