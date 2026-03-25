"use client";

import { useState, useEffect, use } from "react";
import { FormRow } from "../../../../../components";
import { useDataStore } from "../../../../../store/useDataStore";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditContent({ params }: { params: Promise<{ type: string, id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { type, id } = unwrappedParams;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const { editPost, editEvent, editHealth } = useDataStore();

  const [values, setValues] = useState({
    title: "",
    desc: "",
    date: "",
    time: "",
    speaker: "",
    location: "",
    photo: null as File | null,
  });

  // Fetch the existing content data when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (type === "post") url = `http://localhost:5000/api/v1/posts/${id}`;
        if (type === "event") url = `http://localhost:5000/api/v1/events/${id}`;
        if (type === "health") url = `http://localhost:5000/api/v1/health/${id}`;

        const { data } = await axios.get(url);
        
        if (type === "post" && data) {
          setValues(prev => ({ ...prev, title: data.postTitle, desc: data.postDesc }));
        } else if (type === "event" && data) {
          setValues(prev => ({ 
            ...prev, 
            title: data.eventTitle, 
            desc: data.eventDesc,
            date: data.eventDate ? data.eventDate.split('T')[0] : "",
            time: data.time || "",
            location: data.venue || "",
            speaker: data.speaker || ""
          }));
        } else if (type === "health" && data) {
          setValues(prev => ({ ...prev, title: data.healthTitle, desc: data.healthDesc }));
        }
      } catch (error) {
        toast.error("Failed to load content details");
        router.back();
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [id, type, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValues({ ...values, photo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formdata = new FormData();

      if (type === "post") {
        formdata.append("postTitle", values.title);
        formdata.append("postDesc", values.desc);
        if (values.photo) formdata.append("postPhoto", values.photo);
        await editPost(id, formdata);
        toast.success("Post updated successfully!");
        router.push("/dashboard/all-post");
      } 
      else if (type === "event") {
        formdata.append("eventTitle", values.title);
        formdata.append("eventDesc", values.desc);
        formdata.append("eventDate", values.date);
        formdata.append("time", values.time);
        formdata.append("venue", values.location);
        formdata.append("speaker", values.speaker);
        if (values.photo) formdata.append("eventPhoto", values.photo);
        await editEvent(id, formdata);
        toast.success("Event updated successfully!");
        router.push("/dashboard/all-events");
      } 
      else if (type === "health") {
        formdata.append("healthTitle", values.title);
        formdata.append("healthDesc", values.desc);
        if (values.photo) formdata.append("healthPhoto", values.photo);
        await editHealth(id, formdata);
        toast.success("Health tip updated successfully!");
        router.push("/dashboard/all-health");
      }

    } catch (error: any) {
      toast.error(error.message || "Failed to update content");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="p-10 text-center text-slate-500 font-bold">Loading content details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 text-xl">
            <FaEdit />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 capitalize">Edit {type}</h2>
            <p className="text-slate-500 mt-1 text-sm">Update the details of this content block.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SHARED FIELDS */}
            <div className="md:col-span-2">
              <FormRow
                type="text"
                name="title"
                labelText="Title *"
                value={values.title}
                handleChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Description / Message *</label>
              <textarea
                name="desc"
                value={values.desc}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[150px]"
                placeholder="Write your content here..."
              />
            </div>

            {/* EVENT SPECIFIC FIELDS */}
            {type === "event" && (
              <>
                <FormRow type="date" name="date" labelText="Event Date" value={values.date} handleChange={handleChange} />
                <FormRow type="time" name="time" labelText="Event Time" value={values.time} handleChange={handleChange} />
                <FormRow type="text" name="location" labelText="Location" value={values.location} handleChange={handleChange} />
                <FormRow type="text" name="speaker" labelText="Speaker / Host" value={values.speaker} handleChange={handleChange} />
              </>
            )}
          </div>

          {/* FILE UPLOAD SECTION */}
          <div className="border-t border-slate-100 pt-6 mt-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Update Image (Optional)</h3>
            <p className="text-xs text-slate-500 mb-4">Leave this blank if you want to keep the existing image.</p>
            <input
              type="file"
              name="photo"
              accept=".jpg,.png,.jpeg,.webp"
              onChange={handleFileChange}
              className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}