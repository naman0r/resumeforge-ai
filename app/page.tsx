"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {
  Code,
  Zap,
  Download,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Authenticated>
        <AuthenticatedApp />
      </Authenticated>
      <Unauthenticated>
        <LandingPage />
      </Unauthenticated>
    </>
  );
}

function AuthenticatedApp() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 border-b border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ResumeForge Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <h1 className="text-lg font-bold">ResumeForge AI</h1>
        </div>
        <UserButton />
      </header>
      <main className="flex h-[calc(100vh-65px)]">
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-6">Resume Editor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">New Resume</h3>
              <p className="text-muted-foreground mb-4">
                Start with a LaTeX template
              </p>
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                Create Resume
              </button>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Browse Templates</h3>
              <p className="text-muted-foreground mb-4">
                Explore professional LaTeX templates
              </p>
              <button className="w-full border border-input px-4 py-2 rounded-md hover:bg-accent">
                View Gallery
              </button>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">AI Optimization</h3>
              <p className="text-muted-foreground mb-4">
                Tailor your resume for specific jobs
              </p>
              <button className="w-full border border-input px-4 py-2 rounded-md hover:bg-accent">
                Optimize Resume
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ResumeForge Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ResumeForge AI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <SignInButton mode="modal">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2">
              Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered LaTeX Resume Builder
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Make Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Perfect Resume
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Create stunning, ATS-friendly resumes with the power of LaTeX and
            AI. Professional typesetting meets intelligent optimization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-lg font-semibold flex items-center gap-2 justify-center">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </SignInButton>
            <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 text-lg font-semibold">
              View Examples
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose ResumeForge Section */}
      <section className="px-6 lg:px-8 py-20 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose ResumeForge AI?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Professional-grade resume creation with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                LaTeX Precision
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Professional typesetting with LaTeX ensures your resume looks
                perfect with precise formatting that stands out from the crowd.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                AI Optimization
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Smart AI analyzes job descriptions and optimizes your resume for
                specific positions using your own OpenRouter API key.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <div className="bg-emerald-100 dark:bg-emerald-900 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Instant Export
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Export your resume to PDF instantly with professional formatting
                that looks amazing both on screen and in print.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LaTeX Meets Modern UI Section */}
      <section className="px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              LaTeX Meets Modern UI
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Professional typesetting with an intuitive interface
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-slate-400 text-sm">resume.tex</span>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 font-mono text-sm">
              <div className="text-green-400">\\documentclass[article]</div>
              <div className="text-blue-400">
                \\usepackage[margin=0.75in]&#123;geometry&#125;
              </div>
              <div className="text-purple-400">
                \\usepackage[utf8]&#123;inputenc&#125;
              </div>
              <div className="text-slate-400"></div>
              <div className="text-yellow-400">\\begin&#123;document&#125;</div>
              <div className="text-slate-400"></div>
              <div className="text-cyan-400">
                \\section*&#123;John Developer&#125;
              </div>
              <div className="text-slate-300">
                Software Engineer | Full Stack Developer\\\\
              </div>
              <div className="text-slate-300">
                📧 john@example.com | 📱 (555) 123-4567
              </div>
              <div className="text-slate-400"></div>
              <div className="text-cyan-400">
                \\section*&#123;Experience&#125;
              </div>
              <div className="text-slate-300">
                \\textbf&#123;Senior Software Engineer&#125; \\hfill
                \\textit&#123;Tech Company&#125;
              </div>
              <div className="text-slate-300">\\begin&#123;itemize&#125;</div>
              <div className="text-slate-300">
                {" "}
                \\item Led development of microservices architecture
              </div>
              <div className="text-slate-300">
                {" "}
                \\item Improved system performance by 40\\%
              </div>
              <div className="text-slate-300">\\end&#123;itemize&#125;</div>
              <div className="text-slate-400"></div>
              <div className="text-yellow-400">\\end&#123;document&#125;</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stand Out Section */}
      <section className="px-6 lg:px-8 py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="mx-auto max-w-4xl text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Stand Out From the Crowd
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                ATS-Optimized
              </div>
              <p className="text-blue-100">
                Our AI ensures your resume passes through Applicant Tracking
                Systems with ease
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                Professional Quality
              </div>
              <p className="text-blue-100">
                LaTeX typesetting delivers publication-quality results that
                impress recruiters
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                Version Control
              </div>
              <p className="text-blue-100">
                Track changes and maintain multiple versions of your resume for
                different opportunities
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Join thousands of professionals who've upgraded their careers with
              ResumeForge AI
            </p>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-lg font-semibold flex items-center gap-2 mx-auto">
                Start Building Your Resume
                <ArrowRight className="w-5 h-5" />
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="ResumeForge Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">ResumeForge AI</span>
          </div>
          <p className="text-slate-400 mb-6">
            Professional LaTeX resume builder with AI optimization
          </p>
          <p className="text-slate-500 text-sm">
            © 2024 ResumeForge AI. Built with LaTeX, powered by AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
