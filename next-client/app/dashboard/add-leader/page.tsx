"use client";

import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { FormRow, FormRowSelect } from "../../../components";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";

const leaderCategories = [
  "Pastoral Staff",
  "Church Elders",
  "Department Heads",
  "General Workers"
];

const initialState = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  position: "",
  category: leaderCategories[0],
};

export default function AddLeader() {
  const [values, setValues] = useState(initialState);
  const { addLeader, isLoading, user } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, position, category } = values;

    if (!name || !email || !password || !position || !category) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const result = await addLeader(values);
    if (result.success) {
      setValues(initialState); // Clear form on success
    }
  };

  // Extra safety check - only show this page if they are an admin
  if (user?.role !== 'superadmin' && user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800">Access Denied. You do not have permission to view this page.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 text-xl">
            <FaUserPlus />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Add Staff / Leader</h2>
            <p className="text-slate-500 mt-1 text-sm">Create an account and assign them to a specific leadership category.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Category Selection */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Leadership Category</h3>
            <div className="max-w-md">
              <FormRowSelect
                name="category"
                labelText="Assign to Section"
                value={values.category}
                handleChange={handleChange}
                list={leaderCategories}
              />
              <p className="text-xs text-slate-500 mt-2">
                This determines where this person will appear on the public Contact page.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormRow
              type="text"
              name="name"
              labelText="First Name *"
              value={values.name}
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="lastname"
              labelText="Last Name"
              value={values.lastname}
              handleChange={handleChange}
            />
            <FormRow
              type="email"
              name="email"
              labelText="Email Address *"
              value={values.email}
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="position"
              labelText="Specific Title / Position *"
              value={values.position}
              handleChange={handleChange}
            />
          </div>

          <div className="border-t border-slate-100 pt-6 mt-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Security</h3>
            <div className="max-w-md">
              <FormRow
                type="text"
                name="password"
                labelText="Temporary Password *"
                value={values.password}
                handleChange={handleChange}
              />
              <p className="text-xs text-slate-500 mt-2">
                Provide this temporary password to the new leader. They can change it once they log in.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center gap-2"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}