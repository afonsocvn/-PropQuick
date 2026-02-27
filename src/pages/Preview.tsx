import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProposalData } from '../hooks/useProposalData';

export default function Preview() {
  const { data } = useProposalData();
  const [zoom, setZoom] = useState(1);

  const handleGenerateFinal = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const challenges = data.challenges || ['Low and high fidelity wireframing.', 'Creation of a scalable Design System.'];
  const objectives = data.objectives || ['UX Audit and user research.'];

  return (
    <div className="bg-surface-off font-display text-text-dark antialiased min-h-screen flex flex-col print:bg-white">
      <header className="bg-surface-light border-b border-[#e7f3f1] sticky top-0 z-50 print:hidden">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary">
            <Link to="/" className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl hover:text-primary/80 transition-colors">description</span>
              <h1 className="text-xl font-bold tracking-tight text-text-dark hover:text-primary transition-colors">Propose.ly</h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/proposals" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Proposals</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full p-6 lg:p-10 gap-8 print:p-0 print:m-0 print:block">
        <div className="w-full lg:w-1/3 flex flex-col gap-8 print:hidden">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-secondary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">Step 4 of 4</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-text-dark leading-tight">Finalize &amp; Export</h2>
            <p className="text-text-muted text-base">Review document details and preview before generating the final file for the client.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-light p-4 rounded-xl border border-secondary/20 shadow-sm flex items-start gap-3">
              <div className="bg-surface-off p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase">Date</p>
                <p className="text-sm font-bold text-text-dark">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="bg-surface-light p-4 rounded-xl border border-secondary/20 shadow-sm flex items-start gap-3">
              <div className="bg-surface-off p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined">translate</span>
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase">Language</p>
                <p className="text-sm font-bold text-text-dark">English (EN)</p>
              </div>
            </div>
            <div className="bg-surface-light p-4 rounded-xl border border-secondary/20 shadow-sm flex items-start gap-3 sm:col-span-2">
              <div className="bg-surface-off p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined">folder</span>
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase">File</p>
                <p className="text-sm font-bold text-text-dark truncate max-w-[250px]" title={`Proposal_${data.companyName || 'Client'}.pdf`}>Proposal_{data.companyName || 'Client'}.pdf</p>
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-secondary/20 my-2"></div>
          <div className="flex flex-col gap-3">
            <button onClick={handleGenerateFinal} className="group flex items-center justify-center gap-2 w-full h-14 bg-primary text-white text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-[#256663] hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5">
              <span className="material-symbols-outlined">download</span>
              Generate Final Proposal
            </button>
            <div className="flex gap-3">
              <Link to="/step5" className="flex items-center justify-center gap-2 w-1/3 h-14 bg-surface-off border border-secondary/20 text-text-muted text-sm font-bold rounded-xl hover:bg-secondary/10 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </Link>
              <button onClick={handleDownloadPDF} className="flex-1 flex items-center justify-center gap-2 h-14 bg-white border-2 border-primary/20 text-primary text-base font-bold rounded-xl hover:bg-primary/5 hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined">picture_as_pdf</span>
                Export to PDF
              </button>
            </div>
          </div>
          <div className="bg-blue-50/50 p-4 rounded-lg flex gap-3 items-start border border-blue-100">
            <span className="material-symbols-outlined text-blue-600 mt-0.5 text-lg">info</span>
            <p className="text-sm text-blue-800 leading-relaxed">
              You can edit the document again after generation if needed. A copy will be automatically saved in 'My Documents'.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-2/3 bg-surface-light rounded-2xl border border-secondary/20 shadow-sm p-6 lg:p-8 flex flex-col print:w-full print:border-none print:shadow-none print:p-0">
          <div className="flex items-center justify-between mb-6 print:hidden">
            <h3 className="text-lg font-bold text-text-dark flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">visibility</span>
              Document Preview
            </h3>
            <div className="flex items-center gap-2 bg-surface-off p-1 rounded-lg border border-gray-200">
              <span className="material-symbols-outlined text-text-muted text-sm ml-2">zoom_in</span>
              <select
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="bg-transparent border-none text-sm font-bold text-text-muted focus:ring-0 cursor-pointer py-1 pr-6"
              >
                <option value={0.5}>50%</option>
                <option value={0.75}>75%</option>
                <option value={1}>100%</option>
                <option value={1.25}>125%</option>
              </select>
            </div>
          </div>

          <div className="flex-grow bg-[#E5E5E5] rounded-xl p-4 lg:p-8 overflow-y-auto custom-scrollbar flex justify-center print:bg-white print:p-0 print:overflow-visible relative">
            <div
              className="flex flex-col gap-8 items-center transition-all duration-300 origin-top print:transform-none print:gap-0 print:filter-none"
              style={{ transform: `scale(${zoom})` }}
            >
              {/* PAGE 1 */}
              <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl p-12 flex flex-col relative overflow-hidden group print:shadow-none print:max-w-none print:w-[210mm] print:h-[297mm] break-after-page">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-[100px]"></div>
                <div className="mb-12 flex justify-between items-start z-10">
                  <div className="flex items-center gap-3">
                    {data.logoUrl ? (
                      <img src={data.logoUrl} alt="Logo" className="h-12 object-contain" />
                    ) : (
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <span className="material-symbols-outlined text-primary text-3xl">spa</span>
                      </div>
                    )}
                    <div>
                      <h4 className="text-xl font-bold text-text-dark tracking-tight">{data.companyName || 'BetterProposal'}</h4>
                      <p className="text-xs text-text-muted">{data.role || 'Design Solutions'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted font-medium">PREPARED FOR</p>
                    <h5 className="text-lg font-bold text-text-dark">{data.companyName || 'Acme Corp Inc.'}</h5>
                    <p className="text-xs text-text-muted">Att: {data.email || 'John Doe'}</p>
                  </div>
                </div>
                <div className="mb-10 border-l-4 border-primary pl-6 py-2">
                  <h1 className="text-4xl font-extrabold text-text-dark mb-2 leading-tight">{data.projectTitle || 'UX/UI Redesign Proposal'}</h1>
                  <p className="text-lg text-secondary font-medium">Project Phoenix - {new Date().toLocaleDateString()}</p>
                </div>
                <div className="space-y-6 flex-grow">
                  <div>
                    <h6 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">01. Overview</h6>
                    <p className="text-sm text-gray-600 leading-relaxed text-justify">
                      {data.projectContext || 'The goal of this proposal is to outline the strategy for the complete overhaul of the Phoenix platform user interface. Our focus will be to improve accessibility, modernize the visual language, and optimize the main conversion flows.'}
                    </p>
                  </div>
                  <div>
                    <h6 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">02. Scope of Work</h6>
                    <ul className="text-sm text-gray-600 space-y-2 list-none">
                      {objectives.map((objective: string, index: number) => (
                        <li key={`obj-${index}`} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5"></span>
                          <span>{objective || 'UX audit and user research.'}</span>
                        </li>
                      ))}
                      {challenges.map((challenge: string, index: number) => (
                        <li key={`chal-${index}`} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5"></span>
                          <span>{challenge || 'Low and high fidelity wireframing.'}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                  <span>{data.companyName || 'BetterProposal'} © {new Date().getFullYear()}</span>
                  <span>Page 1 of 2</span>
                </div>
              </div>

              {/* PAGE 2 */}
              <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl p-12 flex flex-col relative overflow-hidden group print:shadow-none print:max-w-none print:w-[210mm] print:h-[297mm] break-after-page">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-[100px]"></div>
                <div className="mb-10 border-l-4 border-primary pl-6 py-2">
                  <h2 className="text-3xl font-extrabold text-text-dark mb-2 leading-tight">Investment and Deadlines</h2>
                </div>
                <div className="space-y-6 flex-grow">
                  <div>
                    <h6 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-4 border-b border-gray-100 pb-1">03. Schedule and Payments</h6>
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="py-3 font-bold text-gray-700">Phase / Milestone</th>
                          <th className="py-3 font-bold text-gray-700">Deadline</th>
                          <th className="py-3 font-bold text-gray-700 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-4 text-gray-600">{data.milestone1Name || 'Initial Deposit'}</td>
                          <td className="py-4 text-gray-600">{data.milestone1Date || 'Upon signing'}</td>
                          <td className="py-4 text-gray-600 text-right">{data.currency ? data.currency.match(/\((.*?)\)/)?.[1] || '$' : '$'}{data.milestone1Amount || '1500'}</td>
                        </tr>
                        {data.pricingStructure === 'milestone' && (
                          <tr className="border-b border-gray-100">
                            <td className="py-4 text-gray-600">{data.milestone2Name || 'Final Delivery'}</td>
                            <td className="py-4 text-gray-600">{data.milestone2Date || 'Project Completion'}</td>
                            <td className="py-4 text-gray-600 text-right">{data.currency ? data.currency.match(/\((.*?)\)/)?.[1] || '$' : '$'}{data.milestone2Amount || '1500'}</td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={2} className="py-6 font-bold text-gray-800 text-right uppercase tracking-wider text-xs">Total Investment:</td>
                          <td className="py-6 font-bold text-primary text-right text-xl">{data.currency ? data.currency.match(/\((.*?)\)/)?.[1] || '$' : '$'}{(Number(data.milestone1Amount || 1500) + (data.pricingStructure === 'milestone' ? Number(data.milestone2Amount || 1500) : 0)).toLocaleString()}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="mt-8 p-6 bg-surface-off rounded-lg border border-dashed border-gray-300">
                    <h6 className="text-sm font-bold text-text-dark mb-2">Terms and Conditions</h6>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      The amounts shown are valid for 15 days from the date of issuance of this proposal.
                      The start of the project is conditional upon payment of the initial deposit and signing of the contract.
                      {data.includeTaxes ? ' Values include estimated taxes.' : ' Values do not include applicable taxes.'}
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                  <span>{data.companyName || 'BetterProposal'} © {new Date().getFullYear()}</span>
                  <span>Page 2 of 2</span>
                </div>
              </div>

            </div>
          </div>
          <div className="mt-4 flex justify-between items-center px-2 print:hidden">
            <p className="text-sm text-text-muted font-medium">Showing 2 pages</p>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-off text-text-muted hover:bg-primary hover:text-white transition-colors disabled:opacity-50">
                <span className="material-symbols-outlined text-sm">arrow_upward</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-off text-text-muted hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
