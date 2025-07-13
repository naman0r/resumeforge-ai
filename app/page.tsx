import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  FileText,
  Zap,
  Code,
  Download,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-mono">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">ResumeForge AI</h1>
            </div>
            <div>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-4">
                  <Link href="/dashboard">
                    <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                      Dashboard
                    </button>
                  </Link>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-blue-300 border border-blue-500/20 mb-8">
              <Sparkles className="h-4 w-4" />
              AI-Powered LaTeX Resume Builder
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
              Make Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Perfect Resume
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-8 text-xl leading-8 text-slate-300 max-w-3xl mx-auto">
              Create stunning, ATS-friendly resumes with the power of LaTeX and
              AI. Professional typesetting meets intelligent optimization.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <SignedIn>
                <Link href="/dashboard">
                  <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl shadow-blue-500/25">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl shadow-blue-500/25">
                    Start Building
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignInButton>
              </SignedOut>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 px-8 py-4 text-lg font-semibold text-white hover:bg-slate-700/50 transition-all duration-200">
                <FileText className="h-5 w-5" />
                View Examples
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose ResumeForge AI?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Professional-grade resume creation with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative rounded-2xl bg-slate-800/50 p-8 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  LaTeX Precision
                </h3>
                <p className="text-slate-300">
                  Professional typesetting with LaTeX ensures your resume looks
                  perfect, with precise formatting that stands out from the
                  crowd.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative rounded-2xl bg-slate-800/50 p-8 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-600 mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  AI Optimization
                </h3>
                <p className="text-slate-300">
                  Smart AI analyzes your content and optimizes it for ATS
                  systems, ensuring your resume gets past automated filters.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative rounded-2xl bg-slate-800/50 p-8 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 mb-4">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Instant Export
                </h3>
                <p className="text-slate-300">
                  Export your resume to PDF instantly, with professional
                  formatting that looks amazing both on screen and in print.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Preview Section */}
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              LaTeX Meets Modern UI
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Professional typesetting with an intuitive interface
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-slate-400 text-sm ml-4">resume.tex</span>
              </div>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{enumitem}

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{John Developer}}\\\\
\\vspace{2mm}
Software Engineer | Full Stack Developer\\\\
john.developer@email.com | (555) 123-4567
\\end{center}

\\section*{Experience}
\\textbf{Senior Software Engineer} - Tech Company \\hfill 2021 - Present
\\begin{itemize}[leftmargin=*]
  \\item Led development of microservices architecture
  \\item Improved system performance by 40\\%
  \\item Mentored 5 junior developers
\\end{itemize}

\\end{document}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                Stand Out From the Crowd
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      ATS-Optimized
                    </h3>
                    <p className="text-slate-300">
                      Our AI ensures your resume passes through Applicant
                      Tracking Systems
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Professional Quality
                    </h3>
                    <p className="text-slate-300">
                      LaTeX typesetting delivers publication-quality results
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Version Control
                    </h3>
                    <p className="text-slate-300">
                      Track changes and maintain multiple versions of your
                      resume
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Join thousands of professionals who've upgraded their
                    resumes
                  </p>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                        Create Your Resume
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                        Go to Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </Link>
                  </SignedIn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
