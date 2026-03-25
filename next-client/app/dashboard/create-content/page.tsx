"use client";

import { useState } from "react";
import { FormRow, FormRowSelect } from "../../../components";
import { useDataStore } from "../../../store/useDataStore";
import { createHealthPostAction } from "../../actions/healthActions";
import toast from "react-hot-toast";
import { FaPlusCircle } from "react-icons/fa";

const contentTypes = ["News Post", "Event", "Health Tip", "Bulletin", "Sermon/Livestream"];

export default function CreateContent() {
  const [contentType, setContentType] = useState(contentTypes[0]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Unified state for all possible fields
  const [values, setValues] = useState({
    title: "",
    desc: "",
    date: "",
    time: "",
    speaker: "",
    location: "",
    youtubeLink: "",
    sermonCategory: "Divine Service",
    isLive: false,
    photo: null as File | null,
    pdf: null as File | null,
  });

  const { createPost, createEvent, createBulleting, createSermon } = useDataStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValues({ ...values, [e.target.name]: e.target.files[0] });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };

  const clearForm = () => {
    setValues({
      title: "",
      desc: "",
      date: "",
      time: "",
      speaker: "",
      location: "",
      youtubeLink: "",
      sermonCategory: "Divine Service",
      isLive: false,
      photo: null,
      pdf: null,
    });
    // Reset file inputs visually
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input: any) => input.value = "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formdata = new FormData();

      if (contentType === "News Post") {
        if (!values.title || !values.desc) return toast.error("Title and Description required");
        formdata.append("title", values.title);
        formdata.append("desc", values.desc);
        if (values.photo) formdata.append("postPhoto", values.photo);
        await createPost(formdata);
        clearForm();
      } 
      
      else if (contentType === "Event") {
        if (!values.title || !values.desc) return toast.error("Title and Description required");
        formdata.append("eventTitle", values.title);
        formdata.append("eventDesc", values.desc);
        formdata.append("eventDate", values.date);
        formdata.append("eventTime", values.time);
        formdata.append("eventSpeaker", values.speaker);
        formdata.append("eventLocation", values.location);
        if (values.photo) formdata.append("eventPhoto", values.photo);
        await createEvent(formdata);
        clearForm();
      } 
      
      else if (contentType === "Health Tip") {
        if (!values.title || !values.desc) return toast.error("Title and Description required");
        formdata.append("healthTitle", values.title);
        formdata.append("healthDesc", values.desc);
        if (values.photo) formdata.append("healthPhoto", values.photo);
        
        const response = await createHealthPostAction(formdata);
        if (response?.error) throw new Error(response.error);
        toast.success("Health tip created successfully!");
        clearForm();
      } 
      
      else if (contentType === "Bulletin") {
        if (!values.date || !values.pdf) return toast.error("Date and PDF required");
        formdata.append("name", values.date);
        formdata.append("pdf", values.pdf);
        await createBulleting(formdata);
        clearForm();
      }

      else if (contentType === "Sermon/Livestream") {
        if (!values.title || !values.youtubeLink) return toast.error("Title and YouTube Link required");
        
        const sermonData = {
          title: values.title,
          speaker: values.speaker || "Emmasdale SDA Church",
          youtubeLink: values.youtubeLink,
          category: values.sermonCategory,
          isLive: values.isLive,
          date: values.date || new Date().toISOString()
        };

        await createSermon(sermonData);
        toast.success("Sermon/Livestream published successfully!");
        clearForm();
      }

    } catch (error: any) {
      toast.error(error.message || "Failed to create content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 text-xl">
            <FaPlusCircle />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Publish Content</h2>
            <p className="text-slate-500 mt-1 text-sm">Select a content type below to publish to the church website.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Content Type Selector */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
            <FormRowSelect
              name="contentType"
              labelText="What would you like to create?"
              value={contentType}
              handleChange={(e) => {
                setContentType(e.target.value);
                clearForm();
              }}
              list={contentTypes}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SHARED FIELDS: Title (Used by Post, Event, Health, Sermon) */}
            {contentType !== "Bulletin" && (
              <div className="md:col-span-2">
                <FormRow
                  type="text"
                  name="title"
                  labelText="Title *"
                  value={values.title}
                  handleChange={handleChange}
                />
              </div>
            )}

            {/* BULLETIN FIELD: Date as Title */}
            {contentType === "Bulletin" && (
              <div className="md:col-span-2">
                <FormRow
                  type="date"
                  name="date"
                  labelText="Bulletin Date *"
                  value={values.date}
                  handleChange={handleChange}
                />
              </div>
            )}

            {/* SHARED FIELDS: Description (Used by Post, Event, Health) */}
            {(contentType !== "Bulletin" && contentType !== "Sermon/Livestream") && (
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Description / Message *</label>
                <textarea
                  name="desc"
                  value={values.desc}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[150px]"
                  placeholder="Write your content here..."
                />
              </div>
            )}

            {/* SERMON SPECIFIC FIELDS */}
            {contentType === "Sermon/Livestream" && (
              <>
                <FormRow type="text" name="youtubeLink" labelText="YouTube Link *" value={values.youtubeLink} handleChange={handleChange} />
                <FormRow type="text" name="speaker" labelText="Speaker" value={values.speaker} handleChange={handleChange} />
                <FormRow type="date" name="date" labelText="Date" value={values.date} handleChange={handleChange} />
                
                <FormRowSelect
                  name="sermonCategory"
                  labelText="Category"
                  value={values.sermonCategory}
                  handleChange={handleChange}
                  list={["Divine Service", "Sabbath School", "AY Program", "Special Event"]}
                />

                <div className="md:col-span-2 mt-4 bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isLive"
                    name="isLive"
                    checked={values.isLive}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 border-gray-300"
                  />
                  <label htmlFor="isLive" className="font-bold text-amber-900 cursor-pointer">
                    Set as Current Live Stream
                  </label>
                  <span className="text-xs text-amber-700 ml-2">(This will display the video in the main player at the top of the Media page)</span>
                </div>
              </>
            )}

            {/* EVENT SPECIFIC FIELDS */}
            {contentType === "Event" && (
              <>
                <FormRow type="date" name="date" labelText="Event Date" value={values.date} handleChange={handleChange} />
                <FormRow type="time" name="time" labelText="Event Time" value={values.time} handleChange={handleChange} />
                <FormRow type="text" name="location" labelText="Location" value={values.location} handleChange={handleChange} />
                <FormRow type="text" name="speaker" labelText="Speaker / Host" value={values.speaker} handleChange={handleChange} />
              </>
            )}
          </div>

          {/* FILE UPLOAD SECTION */}
          {contentType !== "Sermon/Livestream" && (
            <div className="border-t border-slate-100 pt-6 mt-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                {contentType === "Bulletin" ? "Upload PDF Document" : "Upload Featured Image"}
              </h3>
              
              {contentType === "Bulletin" ? (
                <input
                  type="file"
                  name="pdf"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
              ) : (
                <input
                  type="file"
                  name="photo"
                  accept=".jpg,.png,.jpeg,.webp"
                  onChange={handleFileChange}
                  className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
              )}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? "Publishing..." : `Publish ${contentType}`}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}