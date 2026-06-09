import React, { useState } from 'react';
import api from '../../configs/api';
import toast from 'react-hot-toast';

export default function PersonalInfoForm({ data = {}, onChange, errors = {} }) {
  const [uploading, setUploading] = useState(false);
  const [removingBg, setRemovingBg] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    const toastId = toast.loading('Uploading profile image...');

    try {
      const response = await api.post('/resume/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onChange({ ...data, profileImage: response.data.imageUrl });
      toast.success('Profile image uploaded successfully', { id: toastId });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload image', { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!data.profileImage) {
      toast.error('Please upload an image first');
      return;
    }

    setRemovingBg(true);
    const toastId = toast.loading('Removing background with AI...');

    try {
      const response = await api.post('/ai/remove-background', {
        imageUrl: data.profileImage,
      });

      onChange({ ...data, profileImage: response.data.newImageUrl });
      toast.success('Background removed successfully', { id: toastId });
    } catch (error) {
      console.error('Remove background error:', error);
      toast.error(error.response?.data?.message || 'Failed to remove background', { id: toastId });
    } finally {
      setRemovingBg(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-100">Personal Information</h3>

      {/* Image Upload Area */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="relative w-24 h-24 shrink-0">
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-slate-700"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border-2 border-slate-700 border-dashed">
              No Image
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-slate-950/70 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-t-blue-500 border-r-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-wrap gap-2">
            <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-700 text-center transition-all duration-200">
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>

            {data.profileImage && (
              <button
                type="button"
                onClick={handleRemoveBackground}
                disabled={removingBg}
                className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold px-4 py-2 rounded-lg border border-blue-500/20 transition-all duration-200"
              >
                {removingBg ? 'Removing...' : 'AI Remove Background'}
              </button>
            )}

            {data.profileImage && (
              <button
                type="button"
                onClick={() => onChange({ ...data, profileImage: '' })}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold px-4 py-2 rounded-lg border border-red-500/20 transition-all duration-200"
              >
                Delete
              </button>
            )}
          </div>
          <p className="text-[10px] text-slate-500">Supports JPG, PNG. Max 5MB.</p>
        </div>
      </div>

      {/* Text Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            value={data.name || ''}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full bg-slate-900 border ${errors.name ? 'border-red-500' : 'border-slate-800'} rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
          />
          {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium">Email Address <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className={`w-full bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-800'} rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
          />
          {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium">Phone Number <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="phone"
            value={data.phone || ''}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className={`w-full bg-slate-900 border ${errors.phone ? 'border-red-500' : 'border-slate-800'} rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 ${errors.phone ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
          />
          {errors.phone && <p className="text-[11px] text-red-500">{errors.phone}</p>}
        </div>

        {/* Location */}
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={data.location || ''}
            onChange={handleChange}
            placeholder="New York, NY"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* LinkedIn */}
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium">LinkedIn URL</label>
          <input
            type="text"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className={`w-full bg-slate-900 border ${errors.linkedin ? 'border-red-500' : 'border-slate-800'} rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 ${errors.linkedin ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
          />
          {errors.linkedin && <p className="text-[11px] text-red-500">{errors.linkedin}</p>}
        </div>

        {/* GitHub */}
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium">GitHub URL</label>
          <input
            type="text"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className={`w-full bg-slate-900 border ${errors.github ? 'border-red-500' : 'border-slate-800'} rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 ${errors.github ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
          />
          {errors.github && <p className="text-[11px] text-red-500">{errors.github}</p>}
        </div>

        {/* Website */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs text-slate-400 font-medium">Personal Website URL</label>
          <input
            type="text"
            name="website"
            value={data.website || ''}
            onChange={handleChange}
            placeholder="https://example.com"
            className={`w-full bg-slate-900 border ${errors.website ? 'border-red-500' : 'border-slate-800'} rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 ${errors.website ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
          />
          {errors.website && <p className="text-[11px] text-red-500">{errors.website}</p>}
        </div>
      </div>
    </div>
  );
}
