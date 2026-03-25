"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [values, setValues] = useState(initialState);
  const router = useRouter();
  const { user, isLoading, loginUser } = useAuthStore();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.error("Please provide all values");
      return;
    }
    const currentUser = { email, password };
    loginUser(currentUser);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        // Redirect logic based on role
        if (user.role === 'superadmin' || user.role === 'admin') {
          // Superadmins/Admins go to requests landing page
          router.push("/dashboard/requests"); 
        } else {
          // Department Heads go directly to their Ministry page builder
          router.push("/dashboard/add-ministry");
        }
      }, 1500); // Reduced delay for better UX
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      
      {/* Left Side: Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?auto=format&fit=crop&w=2000&q=80" 
            alt="Church Background" 
            fill 
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white w-full">
          <h1 className="text-5xl font-extrabold mb-6">Welcome Back.</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Access the leadership dashboard to manage ministries, update church events, and connect with the congregation.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Leader Login
            </h2>
            <p className="text-slate-500">
              Enter your credentials to access the secure dashboard.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-slate-50 focus:bg-white"
                placeholder="leader@emmasdale.org"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-slate-50 focus:bg-white"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>
            
            <div className="mt-8 text-center border-t border-slate-100 pt-6">
              <p className="text-slate-500 text-sm">
                If you do not have an account, please contact the Church Clerk or Administration to request access.
              </p>
            </div>
          </form>

        </div>
      </div>

    </div>
  );
}