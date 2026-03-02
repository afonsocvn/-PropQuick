import React from 'react';
import { Link } from 'react-router-dom';
import { useProposalData } from '../hooks/useProposalData';

export default function Step1() {
  const { data, handleChange, updateData } = useProposalData();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData('logoUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-background-light text-text-dark font-display antialiased min-h-screen flex flex-col">
      <header className="w-full bg-white border-b border-[#e5e7eb] px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-center md:justify-start">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="size-8 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">description</span>
              </div>
              <h2 className="text-primary font-serif text-2xl font-bold tracking-tight">Propose.ly</h2>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-start pt-10 pb-20 px-4 md:px-0">
        <div className="w-full max-w-2xl mb-12">
          <div className="flex justify-between items-end mb-2 px-1">
            <span className="text-gray-500 font-medium text-sm">Step 1 of 4</span>
            <span className="text-primary font-bold text-sm">25% Complete</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: '25%' }}></div>
          </div>
        </div>
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-text-dark font-bold mb-4">Let's start with the basics</h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">Tell us a little about yourself so we can personalize your proposal. This information will appear in the document header.</p>
          </div>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700 text-sm ml-1">Company / Business Name <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">business</span>
                  <input name="companyName" value={data.companyName || ''} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-background-light border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 rounded-t-lg transition-colors placeholder:text-gray-400 text-gray-800 text-base" placeholder="Ex: Acme Design Studio" type="text" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700 text-sm ml-1">Role / Specialty <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">badge</span>
                  <input name="role" value={data.role || ''} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-background-light border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 rounded-t-lg transition-colors placeholder:text-gray-400 text-gray-800 text-base" placeholder="Ex: Senior UX/UI Designer" type="text" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700 text-sm ml-1">Email <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">mail</span>
                  <input name="email" value={data.email || ''} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-background-light border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 rounded-t-lg transition-colors placeholder:text-gray-400 text-gray-800 text-base" placeholder="you@example.com" type="email" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700 text-sm ml-1">Phone <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">call</span>
                  <input name="phone" value={data.phone || ''} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-background-light border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 rounded-t-lg transition-colors placeholder:text-gray-400 text-gray-800 text-base" placeholder="+1 (555) 999-9999" type="tel" />
                </div>
              </div>
            </div>

            {/* Client + Version */}
            <div className="pt-6 border-t border-gray-100 mt-2">
              <p className="font-serif text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person_pin</span>
                Proposal Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-700 text-sm ml-1">Client Name <span className="text-gray-400 font-normal">(optional)</span></label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">group</span>
                    <input name="clientName" value={data.clientName || ''} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-background-light border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 rounded-t-lg transition-colors placeholder:text-gray-400 text-gray-800 text-base" placeholder="Ex: Giggling Platypus Co." type="text" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-700 text-sm ml-1">Proposal Version <span className="text-gray-400 font-normal">(optional)</span></label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">tag</span>
                    <input name="proposalVersion" value={data.proposalVersion || ''} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-background-light border-0 border-b-2 border-gray-200 focus:border-primary focus:ring-0 rounded-t-lg transition-colors placeholder:text-gray-400 text-gray-800 text-base" placeholder="Ex: v1.0 / Draft 2" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-8">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">add_photo_alternate</span>
                    Include Logo?
                  </span>
                  <p className="text-sm text-gray-500 mt-1 max-w-md">Add your personal brand to give a more professional touch to the proposal.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input name="includeLogo" checked={data.includeLogo || false} onChange={handleChange} className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="mt-6 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-accent/60 rounded-xl bg-orange-50/30 hover:bg-orange-50/60 transition-colors cursor-pointer group">
                <div className="space-y-2 text-center">
                  <div className="mx-auto h-12 w-12 text-accent bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">upload_file</span>
                  </div>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary" htmlFor="file-upload">
                      <span>Upload a file</span>
                      <input className="sr-only" id="file-upload" name="file-upload" type="file" accept="image/*" onChange={handleLogoUpload} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 mt-8">
              <Link to="/" className="text-gray-500 hover:text-gray-800 font-medium transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
                Back
              </Link>
              <Link to="/step3" className="bg-primary hover:bg-[#256663] text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center gap-2">
                Next Step
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </Link>
            </div>
          </form>
        </div>
        <div className="mt-12 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="material-symbols-outlined">lock</span>
            <span className="text-xs font-medium uppercase tracking-wider">Secure Data</span>
          </div>
          <div className="h-4 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-xs font-medium uppercase tracking-wider">Privacy Guaranteed</span>
          </div>
        </div>
      </main>
    </div>
  );
}
