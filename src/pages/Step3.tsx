import { Link } from 'react-router-dom';
import { useProposalData } from '../hooks/useProposalData';

export default function Step3() {
  const { data, handleChange, updateData } = useProposalData();

  const challenges = data.challenges || [''];
  const objectives = data.objectives || [''];

  const handleArrayChange = (key: string, index: number, value: string) => {
    const newArray = [...(data[key] || [''])];
    newArray[index] = value;
    updateData(key, newArray);
  };

  const addArrayItem = (key: string) => {
    const newArray = [...(data[key] || ['']), ''];
    updateData(key, newArray);
  };

  const removeArrayItem = (key: string, index: number) => {
    const newArray = [...(data[key] || [''])];
    newArray.splice(index, 1);
    updateData(key, newArray);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main font-display antialiased min-h-screen flex flex-col pt-10">
      <main className="flex-grow flex flex-col items-center py-8 md:py-12 px-4 sm:px-6">
        <div className="w-full max-w-[800px] mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-primary font-bold text-sm tracking-wide uppercase">Step 2 of 4</span>
            <span className="text-text-muted text-sm font-medium">50% complete</span>
          </div>
          <div className="h-2 w-full bg-[#E0E8E8] rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: '60%' }}></div>
          </div>
        </div>
        <div className="w-full max-w-[800px] flex flex-col gap-8">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#233333] tracking-tight">Project Details</h1>
            <p className="text-text-muted text-lg">Tell us a bit more about what you will develop to create a personalized proposal.</p>
          </div>
          <div className="bg-surface rounded-xl border border-[#e5e9e9] shadow-soft p-6 md:p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#f0f2f2] pb-3 mb-4">
                <span className="material-symbols-outlined text-primary">info</span>
                <h3 className="text-lg font-bold text-[#233333]">Basic Information</h3>
              </div>
              <div className="grid gap-6">
                <label className="block space-y-2 group">
                  <span className="block text-sm font-bold text-[#233333] group-focus-within:text-primary transition-colors">Project Title</span>
                  <input name="projectTitle" value={data.projectTitle || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#d1dbdb] bg-[#fcfdfd] text-[#233333] placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="Ex: E-commerce Redesign for Clothing Store" type="text" />
                </label>
                {/* Company Description + Image */}
                <div className="space-y-3">
                  <span className="block text-sm font-bold text-[#233333]">About Your Company <span className="text-text-muted font-normal">(optional)</span></span>
                  <textarea name="companyDescription" value={data.companyDescription || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#d1dbdb] bg-[#fcfdfd] text-[#233333] placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none min-h-[90px] resize-y" placeholder="Briefly describe your company or services. This will appear in the proposal document."></textarea>
                  <div>
                    <span className="block text-sm font-semibold text-[#233333] mb-2">Company Image <span className="text-text-muted font-normal">(optional)</span></span>
                    <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-primary/40 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
                      <span className="material-symbols-outlined text-primary">add_photo_alternate</span>
                      <span className="text-sm text-primary font-semibold">{data.companyImageUrl ? 'Change image' : 'Upload company image'}</span>
                      <input type="file" accept="image/*" className="sr-only" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Check if file is larger than 2MB
                          if (file.size > 2 * 1024 * 1024) {
                            alert('A imagem é demasiado grande (máximo 2MB). Por favor, escolhe uma imagem mais pequena.');
                            return;
                          }
                          
                          // Warn if approaching localStorage limits (e.g., > 1MB)
                          if (file.size > 1 * 1024 * 1024) {
                            console.warn('Image is quite large and might affect storage performance.');
                          }

                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              updateData('companyImageUrl', reader.result);
                            }
                          };
                          reader.onerror = (error) => {
                            console.error('Error reading file:', error);
                            alert('Erro ao carregar a imagem. Por favor, tenta novamente.');
                          };
                          reader.readAsDataURL(file);
                        }
                      }} />
                    </label>
                    {data.companyImageUrl && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-3">
                          <img src={data.companyImageUrl} alt="Company" className="h-16 rounded-lg object-contain border border-gray-100" />
                          <button type="button" onClick={() => updateData('companyImageUrl', null)} className="text-xs text-red-500 hover:underline">Remove</button>
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-[#233333] mb-1.5">Image size in document</span>
                          <div className="grid grid-cols-2 gap-2">
                            {([
                              { key: 'half', label: 'Half Width', desc: 'Sits next to text (50% width)' },
                              { key: 'wide', label: 'Full Width', desc: 'Banner across full page' },
                            ] as const).map(({ key, label, desc }) => (
                              <button
                                key={key}
                                type="button"
                                onClick={() => updateData('companyImageSize', key)}
                                className={`px-3 py-2 rounded-lg text-left border transition-colors ${(data.companyImageSize || 'half') === key
                                  ? 'bg-primary/10 text-primary border-primary'
                                  : 'bg-white text-[#233333] border-[#d1dbdb] hover:border-primary'
                                  }`}
                              >
                                <span className="block text-xs font-bold">{label}</span>
                                <span className="block text-[10px] opacity-60 mt-0.5">{desc}</span>
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-text-muted mb-2">
                            {(data.companyImageSize || 'medium') === 'wide' ? 'Image spans the full page width.' : `Image appears as a ${data.companyImageSize || 'medium'} thumbnail beside the description.`}
                          </p>
                          <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-100 flex items-start gap-1">
                            <span className="material-symbols-outlined text-sm">info</span>
                            Note: The image will automatically fill its allocated space. If dimensions don't match exactly, it will be cropped.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Website */}
                  <div>
                    <span className="block text-sm font-semibold text-[#233333] mb-2">Website / Portfolio <span className="text-text-muted font-normal">(optional)</span></span>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">language</span>
                      <input name="website" value={data.website || ''} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#d1dbdb] bg-[#fcfdfd] text-[#233333] placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="https://yourwebsite.com" type="url" />
                    </div>
                  </div>
                </div>
                <label className="block space-y-2 group">
                  <span className="block text-sm font-bold text-[#233333] group-focus-within:text-primary transition-colors">Context</span>
                  <textarea name="projectContext" value={data.projectContext || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#d1dbdb] bg-[#fcfdfd] text-[#233333] placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none min-h-[120px] resize-y" placeholder="Briefly describe the client's current scenario. Ex: The client has an old site that is not responsive and is losing mobile sales..."></textarea>
                  <p className="text-xs text-text-muted">Be specific about the client's current pain points.</p>
                </label>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#f0f2f2] pb-3 mb-4">
                <span className="material-symbols-outlined text-primary">warning</span>
                <input
                  name="challengesTitle"
                  value={data.challengesTitle || ''}
                  onChange={handleChange}
                  placeholder="The Challenge"
                  className="text-lg font-bold text-[#233333] bg-transparent border-none outline-none focus:ring-0 flex-1"
                />
                <span className="text-xs text-text-muted italic">(editable title)</span>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-text-muted">List the main problems this project aims to solve.</p>
                <div className="space-y-3">
                  {challenges.map((challenge: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary text-xl">drag_indicator</span>
                      <input
                        value={challenge}
                        onChange={(e) => handleArrayChange('challenges', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-[#d1dbdb] bg-[#fcfdfd] text-[#233333] placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                        placeholder="Ex: Low conversion rate at checkout"
                        type="text"
                      />
                      <button type="button" onClick={() => removeArrayItem('challenges', index)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Remove">
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('challenges')} className="flex items-center gap-2 text-primary font-bold text-sm hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors w-max mt-2">
                    <span className="material-symbols-outlined text-lg">add</span>
                    Add item
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#f0f2f2] pb-3 mb-4">
                <span className="material-symbols-outlined text-primary">flag</span>
                <input
                  name="objectivesTitle"
                  value={data.objectivesTitle || ''}
                  onChange={handleChange}
                  placeholder="Objectives"
                  className="text-lg font-bold text-[#233333] bg-transparent border-none outline-none focus:ring-0 flex-1"
                />
                <span className="text-xs text-text-muted italic">(editable title)</span>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-text-muted">What are the success goals for this project?</p>
                <div className="space-y-3">
                  {objectives.map((objective: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary text-xl">check_circle</span>
                      <input
                        value={objective}
                        onChange={(e) => handleArrayChange('objectives', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-[#d1dbdb] bg-[#fcfdfd] text-[#233333] placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                        placeholder="Ex: Increase sales by 20%"
                        type="text"
                      />
                      <button type="button" onClick={() => removeArrayItem('objectives', index)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Remove">
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('objectives')} className="flex items-center gap-2 text-primary font-bold text-sm hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors w-max mt-2">
                    <span className="material-symbols-outlined text-lg">add</span>
                    Add objective
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 mt-4 mb-12">
            <Link to="/step1" className="w-full md:w-auto px-8 py-3 rounded-lg text-text-muted font-bold text-sm hover:text-text-main hover:bg-[#e5e9e9] transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back
            </Link>
            <Link to="/step5" className="w-full md:w-auto px-10 py-3.5 rounded-lg bg-primary text-white font-bold text-sm shadow-[0_4px_14px_0_theme(colors.primary.DEFAULT/40%)] hover:shadow-[0_6px_20px_theme(colors.primary.DEFAULT/25%)] hover:bg-primary-dark transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
              Continue
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
