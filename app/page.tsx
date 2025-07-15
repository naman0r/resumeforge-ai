"use client";

import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Sidebar from "@/app/Sidebar";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        <h1 className="text-lg font-bold">ResumeForge</h1>
        <UserButton />
      </header>
      <main className="flex h-[calc(100vh-65px)]">
        <Authenticated>
          <Sidebar />
          <div className="flex-1 p-4">
            <h2 className="text-2xl font-bold mb-4">Resume Editor</h2>
            {/* This is where the resume editor will go */}
          </div>
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  );
}

function SignInForm() {
  return (
    <div className="flex flex-col gap-8 w-96 mx-auto items-center justify-center">
      <h1 className="text-4xl font-bold text-center">Welcome to ResumeForge</h1>
      <p>Log in to start building your perfect resume.</p>
      <SignInButton mode="modal">
        <button className="bg-foreground text-background px-4 py-2 rounded-md">
          Sign in
        </button>
      </SignInButton>
    </div>
  );
}
