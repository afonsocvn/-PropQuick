import { Link } from 'react-router-dom';
import { useProposalData } from '../hooks/useProposalData';

export default function Step5() {
  const { data, handleChange, updateData } = useProposalData();

  const milestones = data.milestones || [
    { name: data.milestone1Name || 'Initial Deposit', amount: data.milestone1Amount || '1500', date: data.milestone1Date || 'Upon signing' },
    ...(data.pricingStructure === 'milestone' ? [{ name: data.milestone2Name || 'Final Delivery', amount: data.milestone2Amount || '1500', date: data.milestone2Date || 'Project Completion' }] : [])
  ];

  const extras = data.extras || [];

  const handleArrayChange = (key: 'milestones' | 'extras', index: number, field: string, value: string) => {
    const newArray = [...(data[key] || (key === 'milestones' ? milestones : extras))];
    newArray[index] = { ...newArray[index], [field]: value };
    updateData(key, newArray);
  };

  const addArrayItem = (key: 'milestones' | 'extras') => {
    const newArray = [...(data[key] || (key === 'milestones' ? milestones : extras))];
    if (key === 'milestones') {
      newArray.push({ name: '', amount: '', date: '' });
    } else {
      newArray.push({ name: '', amount: '', date: '' });
    }
    updateData(key, newArray);
  };

  const removeArrayItem = (key: 'milestones' | 'extras', index: number) => {
    const newArray = [...(data[key] || (key === 'milestones' ? milestones : extras))];
    newArray.splice(index, 1);
    updateData(key, newArray);
  };

  const totalInvestment = milestones.reduce((sum: number, m: any) => sum + Number(m.amount || 0), 0);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-text-main flex flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full bg-surface-light dark:bg-surface-dark border-b border-secondary/20 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="size-8 text-primary dark:text-secondary hover:text-primary/80 transition-colors">
                <span className="material-symbols-outlined text-4xl">topic</span>
              </div>
              <h2 className="text-primary dark:text-white text-xl font-bold tracking-tight hover:text-primary/80 transition-colors">Propose.ly</h2>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-600 dark:text-slate-200 hover:text-primary dark:hover:text-secondary font-medium transition-colors">Home</Link>
            <Link to="/proposals" className="text-primary dark:text-secondary font-bold transition-colors">Proposals</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center py-10 px-4 md:px-8">
        <div className="w-full max-w-[960px] flex flex-col gap-8">
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-secondary/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-900 dark:text-white font-semibold text-lg">Step 3 of 4</span>
              <span className="text-primary dark:text-secondary font-medium">Pricing &amp; Milestones</span>
            </div>
            <div className="h-3 w-full bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[83%] rounded-full transition-all duration-500 ease-out"></div>
            </div>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Project Pricing &amp; Milestones</h1>
            <p className="text-slate-500 dark:text-slate-300 text-lg">Define how you want to structure the project costs and payment schedule.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-surface-light dark:bg-surface-dark p-6 md:p-8 rounded-xl shadow-sm border border-secondary/10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  Choose Pricing Structure
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="relative cursor-pointer group">
                    <input name="pricingStructure" value="fixed" checked={data.pricingStructure === 'fixed' || !data.pricingStructure} onChange={handleChange} className="peer sr-only custom-radio" type="radio" />
                    <div className="h-full p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-secondary/50 transition-all bg-white dark:bg-slate-800 flex flex-col gap-4 peer-checked:border-primary peer-checked:bg-[#f0fdf9]">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-accent/20 rounded-lg text-amber-700 dark:text-amber-300">
                          <span className="material-symbols-outlined text-3xl">sell</span>
                        </div>
                        <div className="radio-indicator w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-500 peer-checked:border-primary peer-checked:bg-primary"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Fixed Price</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Single payment for the entire project scope. Best for smaller projects.</p>
                      </div>
                    </div>
                  </label>
                  <label className="relative cursor-pointer group">
                    <input name="pricingStructure" value="milestone" checked={data.pricingStructure === 'milestone'} onChange={handleChange} className="peer sr-only custom-radio" type="radio" />
                    <div className="h-full p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-secondary/50 transition-all bg-white dark:bg-slate-800 flex flex-col gap-4 peer-checked:border-primary peer-checked:bg-[#f0fdf9]">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary dark:text-secondary">
                          <span className="material-symbols-outlined text-3xl">splitscreen</span>
                        </div>
                        <div className="radio-indicator w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-500 peer-checked:border-primary peer-checked:bg-primary"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Milestone Packages</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Payments split across multiple phases. Ideal for longer engagements.</p>
                      </div>
                    </div>
                  </label>
                </div>
              </section>
              <section className="bg-surface-light dark:bg-surface-dark p-6 md:p-8 rounded-xl shadow-sm border border-secondary/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                    Payment Milestones
                  </h3>
                  {data.pricingStructure === 'milestone' && (
                    <button onClick={() => addArrayItem('milestones')} className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-lg">add_circle</span>
                      Add Milestone
                    </button>
                  )}
                </div>
                <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-secondary/10 text-slate-700 dark:text-slate-200 border-b border-secondary/20">
                        <th className="p-4 font-semibold text-sm">Milestone Name</th>
                        <th className="p-4 font-semibold text-sm w-32">Amount</th>
                        <th className="p-4 font-semibold text-sm w-48">Due Date</th>
                        <th className="p-4 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700">
                      {milestones.map((milestone: any, index: number) => (
                        <tr key={index} className="group hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                          <td className="p-4">
                            <input value={milestone.name} onChange={(e) => handleArrayChange('milestones', index, 'name', e.target.value)} className="w-full bg-transparent border-0 border-b border-dashed border-slate-300 focus:border-primary focus:ring-0 p-0 text-slate-900 dark:text-white font-medium placeholder-slate-400" placeholder="e.g. Deposit" type="text" />
                          </td>
                          <td className="p-4">
                            <div className="relative">
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-accent font-bold">{data.currency ? data.currency.match(/\((.*?)\)/)?.[1] || '$' : '$'}</span>
                              <input value={milestone.amount} onChange={(e) => handleArrayChange('milestones', index, 'amount', e.target.value)} className="w-full pl-4 bg-transparent border-0 border-b border-dashed border-slate-300 focus:border-primary focus:ring-0 p-0 text-slate-900 dark:text-white font-medium text-right" placeholder="0" type="number" />
                            </div>
                          </td>
                          <td className="p-4">
                            <input value={milestone.date} onChange={(e) => handleArrayChange('milestones', index, 'date', e.target.value)} className="w-full bg-transparent border-0 border-b border-dashed border-slate-300 focus:border-primary focus:ring-0 p-0 text-slate-600 dark:text-slate-300 text-sm placeholder-slate-400" placeholder="e.g. Upon Signing" type="text" />
                          </td>
                          <td className="p-4 text-center">
                            {(index > 0 || milestones.length > 1) && (
                              <button onClick={() => removeArrayItem('milestones', index)} className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                <span className="material-symbols-outlined text-xl">delete</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50 dark:bg-slate-900/50">
                        <td className="p-4 font-bold text-slate-700 dark:text-slate-300 text-right">Total Investment</td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white text-right text-lg border-t-2 border-primary/30">{data.currency ? data.currency.match(/\((.*?)\)/)?.[1] || '$' : '$'}{totalInvestment.toLocaleString()}</td>
                        <td colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>

              <section className="bg-surface-light dark:bg-surface-dark p-6 md:p-8 rounded-xl shadow-sm border border-secondary/10">
                <div className="flex justify-between items-center mb-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">extension</span>
                      Optional Extras
                    </h3>
                    <p className="text-sm text-slate-500">Provide add-ons that do not count towards the Total Investment.</p>
                  </div>
                  <button onClick={() => addArrayItem('extras')} className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Add Extra
                  </button>
                </div>
                {extras.length > 0 ? (
                  <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-secondary/10 text-slate-700 dark:text-slate-200 border-b border-secondary/20">
                          <th className="p-4 font-semibold text-sm">Extra Name</th>
                          <th className="p-4 font-semibold text-sm w-32">Amount / Rate</th>
                          <th className="p-4 font-semibold text-sm w-48">Notes</th>
                          <th className="p-4 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700">
                        {extras.map((extra: any, index: number) => (
                          <tr key={index} className="group hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                            <td className="p-4">
                              <input value={extra.name} onChange={(e) => handleArrayChange('extras', index, 'name', e.target.value)} className="w-full bg-transparent border-0 border-b border-dashed border-slate-300 focus:border-primary focus:ring-0 p-0 text-slate-900 dark:text-white font-medium placeholder-slate-400" placeholder="e.g. Additional Page" type="text" />
                            </td>
                            <td className="p-4">
                              <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-accent font-bold">{data.currency ? data.currency.match(/\((.*?)\)/)?.[1] || '$' : '$'}</span>
                                <input value={extra.amount} onChange={(e) => handleArrayChange('extras', index, 'amount', e.target.value)} className="w-full px-4 bg-transparent border-0 border-b border-dashed border-slate-300 focus:border-primary focus:ring-0 p-0 text-slate-900 dark:text-white font-medium text-right" placeholder="0" type="text" />
                              </div>
                            </td>
                            <td className="p-4">
                              <input value={extra.date} onChange={(e) => handleArrayChange('extras', index, 'date', e.target.value)} className="w-full bg-transparent border-0 border-b border-dashed border-slate-300 focus:border-primary focus:ring-0 p-0 text-slate-600 dark:text-slate-300 text-sm placeholder-slate-400" placeholder="e.g. per hour, %" type="text" />
                            </td>
                            <td className="p-4 text-center">
                              <button onClick={() => removeArrayItem('extras', index)} className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                <span className="material-symbols-outlined text-xl">delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                    <p className="text-sm text-slate-500">No extras added. Click "Add Extra" to offer optional add-ons.</p>
                  </div>
                )}
              </section>
            </div>
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-secondary/10 dark:bg-secondary/5 p-6 rounded-xl border border-secondary/20">
                <div className="flex gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary text-2xl">lightbulb</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">Tips for Payments</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Breaking payments into milestones helps build trust. A 50% deposit is standard for new clients to secure your time.
                </p>

              </div>
              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-secondary/10">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Currency</label>
                    <div className="relative">
                      <select name="currency" value={data.currency || 'USD ($)'} onChange={handleChange} className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary shadow-sm sm:text-sm py-2.5">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>BRL (R$)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                  <div className="py-2 space-y-2">
                    <div className="flex items-center gap-3">
                      <input name="includeTaxes" checked={data.includeTaxes || false} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" id="tax" type="checkbox" />
                      <label className="text-sm text-slate-700 dark:text-slate-300 font-medium" htmlFor="tax">Values include estimated taxes</label>
                    </div>
                    {data.includeTaxes ? (
                      <p className="text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        The amounts shown already include estimated taxes.
                      </p>
                    ) : (
                      <p className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">info</span>
                        Proposal values do not include taxes. Taxes will be added separately.
                      </p>
                    )}
                  </div>
                  {/* Valid Until */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Proposal Valid Until <span className="text-slate-400 font-normal normal-case">(optional)</span></label>
                    <input
                      name="validUntil"
                      type="date"
                      value={data.validUntil || ''}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary shadow-sm sm:text-sm py-2.5 px-3"
                    />
                    {data.validUntil && (
                      <p className="text-xs text-slate-500 mt-1">This proposal expires on <strong>{new Date(data.validUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
            <Link to="/step3" className="flex items-center gap-2 px-6 py-3 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </Link>
            <Link to="/preview" className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5">
              Next Step
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
