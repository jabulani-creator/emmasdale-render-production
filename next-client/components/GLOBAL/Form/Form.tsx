"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { submitContactForm } from "../../../app/actions/contactActions";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const purposeOptions = [
  { value: "prayer", label: "Prayer & Praise" },
  { value: "baptism", label: "Baptism & Bible Study" },
  { value: "membership", label: "Church Membership Transfer" },
  { value: "visitation", label: "Pastoral Visitation" },
  { value: "wedding", label: "Wedding / Pre-marital" },
  { value: "general", label: "General Inquiry" }
];

export const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      purpose: "prayer",
      // Dynamic fields
      prayerRequest: "",
      praiseReport: "",
      address: "",
      city: "",
      birthday: "",
      maritalStatus: "single",
      membershipType: "transfer",
      previousChurch: "",
      testimony: "",
      preferredDate: "",
      message: "",
    }
  });

  const selectedPurpose = watch("purpose");

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      // 1. Extract core fields
      const { firstName, lastName, email, phone, purpose, message, ...rest } = data;
      
      // 2. Package all other fields into additionalInfo
      const payload = {
        firstName,
        lastName,
        email,
        phone,
        purpose,
        message,
        additionalInfo: rest
      };

      // 3. Convert to FormData for the server action
      const formData = new FormData();
      formData.append("firstName", payload.firstName);
      formData.append("lastName", payload.lastName);
      formData.append("email", payload.email);
      formData.append("phone", payload.phone);
      formData.append("purpose", payload.purpose);
      if (payload.message) formData.append("message", payload.message);
      formData.append("additionalInfo", JSON.stringify(payload.additionalInfo));

      const response = await submitContactForm(formData);
      
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Request submitted successfully! We will be in touch.");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">How can we help?</h3>
        <p className="text-slate-500">Select a category below, and the form will adjust to get you the right help.</p>
      </div>
      
      {/* 1. CORE PROFILE INFO */}
      <div className="mb-8 pb-8 border-b border-slate-100">
        <h4 className="text-sm font-bold tracking-widest uppercase text-teal-600 mb-4">Your Profile</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">First Name *</label>
            <input
              {...register("firstName", { required: "First name is required" })}
              className={`w-full px-4 py-3 bg-slate-50 border ${errors.firstName ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-teal-500`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Last Name *</label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              className={`w-full px-4 py-3 bg-slate-50 border ${errors.lastName ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-teal-500`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Phone *</label>
            <input
              {...register("phone", { required: "Phone number is required" })}
              className={`w-full px-4 py-3 bg-slate-50 border ${errors.phone ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-teal-500`}
            />
          </div>
        </div>
      </div>

      {/* 2. REQUEST TYPE */}
      <div className="mb-8 pb-8 border-b border-slate-100">
        <h4 className="text-sm font-bold tracking-widest uppercase text-teal-600 mb-4">Request Details</h4>
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">I am contacting the church for...</label>
          <select
            {...register("purpose")}
            className="w-full px-4 py-3 bg-teal-50 border border-teal-200 text-teal-900 font-semibold rounded-xl focus:ring-2 focus:ring-teal-500 appearance-none"
          >
            {purposeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* --- DYNAMIC FIELDS BASED ON PURPOSE --- */}

        {selectedPurpose === "prayer" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">My Prayer Request is:</label>
              <textarea {...register("prayerRequest")} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">My Praise Report is (Optional):</label>
              <textarea {...register("praiseReport")} rows={2} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 resize-none" />
            </div>
          </div>
        )}

        {(selectedPurpose === "baptism" || selectedPurpose === "membership") && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Physical Address</label>
                <input {...register("address")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                <input {...register("city")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Birthday</label>
                <input type="date" {...register("birthday")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Marital Status</label>
                <select {...register("maritalStatus")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            {selectedPurpose === "membership" && (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">I would like to join through:</label>
                  <select {...register("membershipType")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <option value="transfer">Transfer from another SDA church</option>
                    <option value="profession">Profession of Faith (Previously baptized)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Name & City of Previous Church</label>
                  <input {...register("previousChurch")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
              </>
            )}

            {selectedPurpose === "baptism" && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">In a few sentences, share your commitment to Jesus:</label>
                <textarea {...register("testimony")} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none" />
              </div>
            )}
          </div>
        )}

        {(selectedPurpose === "visitation" || selectedPurpose === "wedding") && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Physical Address / Venue</label>
                <input {...register("address")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date</label>
                <input type="date" {...register("preferredDate")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Reason / Details</label>
              <textarea {...register("message")} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none" />
            </div>
          </div>
        )}

        {selectedPurpose === "general" && (
          <div className="animate-fade-in">
            <label className="block text-sm font-bold text-slate-700 mb-2">How can we help you today?</label>
            <textarea {...register("message")} rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none" />
          </div>
        )}

      </div>

      {/* SUBMIT BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <FaPaperPlane />
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
        
        <button
          type="button"
          onClick={() => reset()}
          className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <FaTimes />
          Clear
        </button>
      </div>
    </form>
  );
};
