"use client";

import { useState } from "react";
import Wrapper from "../../../app/assets/wrappers/DashboardFormPage";
import { createMinistryAction } from "../../actions/ministryActions";

export default function AddMinistry() {
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });
  
  // Basic Ministry State
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    slug: "",
    themeColor: "teal",
  });

  // Hero Section State
  const [hero, setHero] = useState({
    image: "",
    logo: "",
    motto: "",
    description: "",
  });

  // Contact Info State
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    meetingTime: "",
    meetingLocation: "",
    facebook: "",
    instagram: "",
  });

  // Dynamic Content Blocks
  // For simplicity in the MVP, we allow adding standard 'text' blocks.
  const [blocks, setBlocks] = useState<any[]>([]);

  const addTextBlock = () => {
    setBlocks([
      ...blocks,
      {
        blockType: "text",
        order: blocks.length + 1,
        data: { heading: "", content: "", imageAlign: "none", imageUrl: "" },
      },
    ]);
  };

  const addBannerCtaBlock = () => {
    setBlocks([
      ...blocks,
      {
        blockType: "bannerCta",
        order: blocks.length + 1,
        data: { heading: "", subheading: "", buttonText: "", buttonLink: "", backgroundColor: "bg-slate-900" },
      },
    ]);
  };

  const handleBlockChange = (index: number, field: string, value: string) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].data[field] = value;
    setBlocks(updatedBlocks);
  };

  const removeBlock = (index: number) => {
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!basicInfo.name || !basicInfo.slug) {
      setStatus({ ...status, error: "Ministry Name and Slug are required." });
      return;
    }

    setStatus({ loading: true, error: "", success: "" });

    const payload = {
      ...basicInfo,
      hero,
      contentBlocks: blocks,
      contact: {
        email: contact.email,
        phone: contact.phone,
        meetingTime: contact.meetingTime,
        meetingLocation: contact.meetingLocation,
        socialLinks: {
          facebook: contact.facebook,
          instagram: contact.instagram,
        }
      }
    };

    const response = await createMinistryAction(payload);

    if (response.error) {
      setStatus({ loading: false, error: response.error, success: "" });
    } else {
      setStatus({ loading: false, error: "", success: "Ministry created successfully!" });
      // Reset form
      setBasicInfo({ name: "", slug: "", themeColor: "teal" });
      setHero({ image: "", logo: "", motto: "", description: "" });
      setContact({ email: "", phone: "", meetingTime: "", meetingLocation: "", facebook: "", instagram: "" });
      setBlocks([]);
      setTimeout(() => setStatus(prev => ({ ...prev, success: "" })), 3000);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit} style={{ maxWidth: '800px', width: '100%' }}>
        <h3>Add New Ministry</h3>
        {status.error && <div className="alert alert-danger">{status.error}</div>}
        {status.success && <div className="alert alert-success">{status.success}</div>}
        
        {/* --- 1. BASIC INFO --- */}
        <h4 style={{ marginTop: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>Basic Info</h4>
        <div className="form-center">
          <div className="form-row">
            <label className="form-label">Ministry Name *</label>
            <input
              type="text"
              placeholder="e.g. Youth Ministry"
              className="form-input"
              value={basicInfo.name}
              onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label className="form-label">URL Slug * (e.g. 'youth')</label>
            <input
              type="text"
              placeholder="youth"
              className="form-input"
              value={basicInfo.slug}
              onChange={(e) => setBasicInfo({ ...basicInfo, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            />
          </div>
        </div>

        {/* --- 2. HERO SECTION --- */}
        <h4 style={{ marginTop: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>Hero Banner</h4>
        <div className="form-center">
          <div className="form-row">
            <label className="form-label">Hero Background Image URL</label>
            <input
              type="text"
              className="form-input"
              value={hero.image}
              onChange={(e) => setHero({ ...hero, image: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Motto / Subtitle</label>
            <input
              type="text"
              className="form-input"
              value={hero.motto}
              onChange={(e) => setHero({ ...hero, motto: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <label className="form-label">Hero Description</label>
          <textarea
            className="form-textarea"
            style={{ height: '80px', width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            value={hero.description}
            onChange={(e) => setHero({ ...hero, description: e.target.value })}
          />
        </div>

        {/* --- 3. DYNAMIC BLOCKS --- */}
        <h4 style={{ marginTop: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>Content Blocks</h4>
        
        {blocks.map((block, index) => (
          <div key={index} style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', backgroundColor: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <strong>Block {index + 1}: {block.blockType.toUpperCase()}</strong>
              <button type="button" onClick={() => removeBlock(index)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
            </div>

            {block.blockType === 'text' && (
              <>
                <div className="form-row">
                  <label className="form-label">Heading</label>
                  <input type="text" className="form-input" value={block.data.heading} onChange={(e) => handleBlockChange(index, 'heading', e.target.value)} />
                </div>
                <div className="form-row">
                  <label className="form-label">Content (HTML allowed)</label>
                  <textarea className="form-textarea" style={{ height: '100px', width: '100%', padding: '0.5rem' }} value={block.data.content} onChange={(e) => handleBlockChange(index, 'content', e.target.value)} />
                </div>
                <div className="form-row">
                  <label className="form-label">Image URL (Optional)</label>
                  <input type="text" className="form-input" value={block.data.imageUrl} onChange={(e) => handleBlockChange(index, 'imageUrl', e.target.value)} />
                </div>
                {block.data.imageUrl && (
                  <div className="form-row">
                    <label className="form-label">Image Alignment</label>
                    <select className="form-select" value={block.data.imageAlign} onChange={(e) => handleBlockChange(index, 'imageAlign', e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                      <option value="none">None</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                )}
              </>
            )}

            {block.blockType === 'bannerCta' && (
              <>
                <div className="form-row">
                  <label className="form-label">Heading</label>
                  <input type="text" className="form-input" value={block.data.heading} onChange={(e) => handleBlockChange(index, 'heading', e.target.value)} />
                </div>
                <div className="form-row">
                  <label className="form-label">Subheading</label>
                  <input type="text" className="form-input" value={block.data.subheading} onChange={(e) => handleBlockChange(index, 'subheading', e.target.value)} />
                </div>
                <div className="form-center">
                  <div className="form-row">
                    <label className="form-label">Button Text</label>
                    <input type="text" className="form-input" value={block.data.buttonText} onChange={(e) => handleBlockChange(index, 'buttonText', e.target.value)} />
                  </div>
                  <div className="form-row">
                    <label className="form-label">Button Link</label>
                    <input type="text" className="form-input" value={block.data.buttonLink} onChange={(e) => handleBlockChange(index, 'buttonLink', e.target.value)} />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button type="button" className="btn" style={{ background: '#e2e8f0', color: '#333' }} onClick={addTextBlock}>+ Add Text Block</button>
          <button type="button" className="btn" style={{ background: '#e2e8f0', color: '#333' }} onClick={addBannerCtaBlock}>+ Add Banner CTA Block</button>
        </div>

        {/* --- 4. CONTACT & LOGISTICS --- */}
        <h4 style={{ marginTop: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>Contact & Logistics</h4>
        <div className="form-center">
          <div className="form-row">
            <label className="form-label">Meeting Time</label>
            <input type="text" placeholder="e.g. Every Sabbath @ 14:00" className="form-input" value={contact.meetingTime} onChange={(e) => setContact({ ...contact, meetingTime: e.target.value })} />
          </div>
          <div className="form-row">
            <label className="form-label">Meeting Location</label>
            <input type="text" placeholder="e.g. Youth Chapel" className="form-input" value={contact.meetingLocation} onChange={(e) => setContact({ ...contact, meetingLocation: e.target.value })} />
          </div>
          <div className="form-row">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
          </div>
          <div className="form-row">
            <label className="form-label">Phone</label>
            <input type="text" className="form-input" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          </div>
        </div>

        <div className="btn-container" style={{ marginTop: '3rem' }}>
          <button
            className="btn btn-block submit-btn"
            type="submit"
            disabled={status.loading}
          >
            {status.loading ? "Publishing Ministry..." : "Publish Ministry"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}