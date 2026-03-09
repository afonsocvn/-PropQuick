import { useState, useRef, useEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useProposalData } from '../hooks/useProposalData';
import EmailCaptureModal from '../components/EmailCaptureModal';
import { trackEvent } from '../utils/analytics';

function PagedContent({ children, footer, wrapperClassName = '', contentClassName = '', sliceHeight = 842 }: { children: ReactNode, footer?: ReactNode, wrapperClassName?: string, contentClassName?: string, sliceHeight?: number }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if (contentRef.current) {
      // The content might need a moment to render images/fonts, but a simple effect usually works
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const height = entry.target.scrollHeight;
          // Calculate how many 842px pages are needed
          setPages(Math.max(1, Math.ceil(height / sliceHeight)));
        }
      });
      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [children, sliceHeight]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-[595px] print:gap-0 print:block">
      {/* Hidden measuring container - MUST exactly match the layout of the real pages! */}
      <div
        ref={contentRef}
        className={`absolute opacity-0 pointer-events-none ${contentClassName} print:hidden`}
        style={{ width: '595px', height: 'auto', minHeight: '842px' }}
      >
        {children}
      </div>

      {Array.from({ length: pages }).map((_, i) => (
        <div
          key={i}
          className={`w-full h-[842px] overflow-hidden relative shadow-2xl bg-white print:shadow-none print:m-0 shrink-0 ${wrapperClassName} pb-16 ${i > 0 ? 'print:hidden' : 'print-dynamic-flow print:break-after-page'}`}
          style={{ pageBreakInside: 'avoid' }}
        >
          <div
            className={`w-full ${i > 0 ? 'absolute left-0' : 'relative print:static print:top-0'} ${contentClassName}`}
            style={{
              top: i > 0 ? `-${i * sliceHeight}px` : '0px',
              height: i > 0 ? 'auto' : '100%',
              minHeight: '842px'
            }}
          >
            {children}
          </div>
          {footer && i === pages - 1 && (
            <div className={`absolute bottom-0 left-0 w-full z-20 print-footer`}>
              {footer}
            </div>
          )}
          {footer && i < pages - 1 && (
            <div className={`absolute bottom-0 left-0 w-full z-20 print:hidden`}>
              {footer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Preview() {
  const { data } = useProposalData();
  const [zoom, setZoom] = useState(1);
  const [layout, setLayout] = useState<1 | 2 | 3>(1);
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const executeDownload = () => {
    trackEvent('pdf_downloaded');
    window.print();
  };

  const handleGenerateFinal = () => {
    const hasProvidedEmail = localStorage.getItem('has_provided_email');
    if (!hasProvidedEmail) {
      setShowEmailModal(true);
    } else {
      executeDownload();
    }
  };

  const challenges = data.challenges || ['Low and high fidelity wireframing.', 'Creation of a scalable Design System.'];
  const objectives = data.objectives || ['UX Audit and user research.'];
  const currencySymbol = data.currency ? data.currency.match(/\((.*?)\)/)?.[1] || '$' : '$';

  const milestones = data.milestones || [
    { name: data.milestone1Name || 'Initial Deposit', amount: data.milestone1Amount || '1500', date: data.milestone1Date || 'Upon signing' },
    { name: data.milestone2Name || 'Final Delivery', amount: data.milestone2Amount || '1500', date: data.milestone2Date || 'Project Completion' }
  ];
  const extras = data.extras || [];
  const totalInvestment = milestones.reduce((sum: number, m: any) => sum + Number(m.amount || 0), 0);

  return (
    <div className="bg-surface-off font-display text-text-dark antialiased min-h-screen flex flex-col print:bg-white pt-10">
      <main className="flex-grow flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full p-6 lg:p-10 gap-8 print:p-0 print:m-0 print:block">
        {/* LEFT SIDEBAR */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8 print:hidden">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-secondary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">Step 4 of 4</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-text-dark leading-tight">Finalize &amp; Export</h2>
            <p className="text-text-muted text-base">Review document details and preview before generating the final file for the client.</p>
          </div>

          {/* Info cards */}
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
                <p className="text-[10px] text-text-muted mt-0.5">More languages coming soon</p>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-secondary/20 my-2"></div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button onClick={handleGenerateFinal} className="group flex items-center justify-center gap-2 w-full h-14 bg-primary text-white text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-[#256663] hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5">
              <span className="material-symbols-outlined">download</span>
              Generate Final Proposal
            </button>
            <div className="flex gap-3">
              <Link to="/step5" className="flex items-center justify-center gap-2 w-full h-14 bg-surface-off border border-secondary/20 text-text-muted text-sm font-bold rounded-xl hover:bg-secondary/10 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </Link>
            </div>

            {/* Layout Picker */}
            <div className="mt-2">
              <button
                onClick={() => setShowLayoutPicker(!showLayoutPicker)}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl border-2 border-dashed border-secondary/40 text-text-muted hover:border-primary hover:text-primary transition-colors font-semibold text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">dashboard_customize</span>
                  Choose Layout
                </span>
                <span className="material-symbols-outlined text-sm transition-transform" style={{ transform: showLayoutPicker ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  expand_more
                </span>
              </button>

              {showLayoutPicker && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {/* Layout Option 1 */}
                  <button
                    onClick={() => { setLayout(1); setShowLayoutPicker(false); }}
                    className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all ${layout === 1 ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/40 bg-white'}`}
                  >
                    {layout === 1 && (
                      <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '12px' }}>check</span>
                      </span>
                    )}
                    {/* Layout 1 preview thumbnail */}
                    <div className="w-full aspect-[3/4] bg-white border border-gray-100 rounded-lg overflow-hidden mb-2 shadow-sm">
                      <div className="h-1/4 bg-primary/10 flex items-end px-2 pb-1">
                        <div className="w-3 h-3 bg-primary/40 rounded-sm mr-1"></div>
                        <div className="flex-1 h-1 bg-primary/20 rounded"></div>
                      </div>
                      <div className="p-2 space-y-1">
                        <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-1 bg-gray-100 rounded w-full mt-2"></div>
                        <div className="h-1 bg-gray-100 rounded w-full"></div>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-text-dark">Classic</p>
                    <p className="text-[10px] text-text-muted">Default layout</p>
                  </button>

                  {/* Layout Option 2 */}
                  <button
                    onClick={() => { setLayout(2); setShowLayoutPicker(false); }}
                    className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all ${layout === 2 ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/40 bg-white'}`}
                  >
                    {layout === 2 && (
                      <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '12px' }}>check</span>
                      </span>
                    )}
                    {/* Layout 2 preview thumbnail */}
                    <div className="w-full aspect-[3/4] bg-[#f0f0ed] border border-gray-100 rounded-lg overflow-hidden mb-2 shadow-sm flex flex-col">
                      <div className="flex items-center justify-between px-2 pt-2">
                        <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                        <div className="h-0.5 w-5 bg-gray-400 rounded"></div>
                      </div>
                      <div className="px-2 pt-2 flex-grow">
                        <div className="h-2.5 bg-[#1a2332] rounded w-4/5 mb-1"></div>
                        <div className="h-2.5 bg-[#1a2332] rounded w-3/5 mb-2"></div>
                        <div className="h-0.5 bg-gray-300 rounded w-2/5 mb-1"></div>
                        <div className="h-1 bg-gray-400 rounded w-3/5"></div>
                      </div>
                      <div className="h-1/5 bg-[#1a2332] w-full mt-auto"></div>
                    </div>
                    <p className="text-xs font-bold text-text-dark">Minimal</p>
                    <p className="text-[10px] text-text-muted">Clean & bold</p>
                  </button>
                  {/* Layout Option 3 */}
                  <button
                    onClick={() => { setLayout(3); setShowLayoutPicker(false); }}
                    className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all ${layout === 3 ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/40 bg-white'}`}
                  >
                    {layout === 3 && (
                      <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '12px' }}>check</span>
                      </span>
                    )}
                    {/* Layout 3 preview thumbnail */}
                    <div className="w-full aspect-[3/4] bg-white border border-gray-100 rounded-lg overflow-hidden mb-2 shadow-sm flex flex-col">
                      <div className="flex items-center justify-between px-2 pt-2">
                        <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                        <div className="h-0.5 w-5 bg-gray-300 rounded"></div>
                      </div>
                      <div className="px-2 pt-2 flex-grow">
                        <div className="h-2.5 bg-gray-700 rounded w-4/5 mb-1"></div>
                        <div className="h-2.5 bg-gray-700 rounded w-3/5 mb-2"></div>
                        <div className="h-0.5 bg-gray-200 rounded w-2/5 mb-1"></div>
                        <div className="h-1 bg-gray-300 rounded w-3/5"></div>
                      </div>
                      <div className="h-1/5 bg-[#f4a261] w-full mt-auto"></div>
                    </div>
                    <p className="text-xs font-bold text-text-dark">Warm</p>
                    <p className="text-[10px] text-text-muted">White + Orange</p>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-lg flex gap-3 items-start border border-blue-100">
            <span className="material-symbols-outlined text-blue-600 mt-0.5 text-lg">info</span>
            <p className="text-sm text-blue-800 leading-relaxed">
              You can edit the document again after generation if needed.
            </p>
          </div>
        </div>

        {/* RIGHT: DOCUMENT PREVIEW */}
        <div className="w-full lg:w-2/3 bg-surface-light rounded-2xl border border-secondary/20 shadow-sm p-6 lg:p-8 flex flex-col print:w-full print:border-none print:shadow-none print:p-0 print:block">
          <div className="flex items-center justify-between mb-6 print:hidden">
            <h3 className="text-lg font-bold text-text-dark flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">visibility</span>
              Document Preview
              <span className="text-xs font-normal px-2 py-0.5 bg-secondary/20 text-primary rounded-full ml-1">
                {layout === 1 ? 'Editorial' : layout === 2 ? 'Minimal' : 'Warm'}
              </span>
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

          <div className="flex-grow bg-[#E5E5E5] rounded-xl p-4 lg:p-8 overflow-y-auto custom-scrollbar flex justify-center print:bg-white print:p-0 print:overflow-visible relative print:block">
            <div
              className="flex flex-col gap-8 items-center transition-all duration-300 origin-top print:transform-none print:gap-0 print:filter-none print:block"
              style={{ transform: `scale(${zoom})` }}
            >
              {/* ====== LAYOUT 1: EDITORIAL ====== */}
              {layout === 1 && (
                <>
                  {/* PAGE 1 - Editorial Cover */}
                  <div
                    className="w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col relative overflow-hidden print:shadow-none print-dynamic-flow print:break-inside-avoid"
                    style={{ backgroundColor: '#d8d8d8' }}
                  >
                    {/* Decorative outline circles - top right */}
                    <div className="absolute top-[-70px] right-[-70px] w-56 h-56 rounded-full border border-gray-500/30 pointer-events-none"></div>
                    <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full border border-gray-500/25 pointer-events-none"></div>
                    {/* Decorative circles - bottom right */}
                    <div className="absolute bottom-[80px] right-[-60px] w-60 h-60 rounded-full border border-gray-500/25 pointer-events-none"></div>
                    <div className="absolute bottom-[110px] right-[-25px] w-40 h-40 rounded-full border border-gray-500/20 pointer-events-none"></div>

                    {/* Top bar */}
                    <div className="flex items-start justify-between px-10 print:px-14 pt-10 z-10">
                      <div>
                        {data.logoUrl ? (
                          <img src={data.logoUrl} alt="Logo" className="h-8 object-contain mb-1" />
                        ) : null}
                        <p className="text-[11px] text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {data.proposalVersion ? <span className="font-semibold text-gray-800">{data.proposalVersion}</span> : 'Project Proposal'}
                        </p>
                      </div>
                      <p className="text-[11px] text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>

                    {/* Main title */}
                    <div className="flex-grow flex flex-col justify-center px-10 print:px-14 z-10">
                      <h1
                        className="leading-[1.1] text-gray-900 mb-6"
                        style={{ fontSize: '68px', fontWeight: 400, fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: '-0.01em' }}
                      >
                        <span style={{ fontStyle: 'italic' }}>{data.projectTitle || 'Idea Proposals'}</span>
                      </h1>
                      <p className="text-[13px] text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {data.projectContext
                          ? data.projectContext.split('.')[0] + '.'
                          : 'A new way of delivering a product'}
                      </p>
                    </div>

                    {/* Proposed By / To */}
                    <div className="px-10 print:px-14 pb-12 z-10 space-y-4">
                      <div>
                        <p className="text-[11px] text-gray-500 mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>Proposed By:</p>
                        <p className="text-[14px] font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>{data.companyName || 'Your Company'}</p>
                      </div>
                      {data.clientName && (
                        <div>
                          <p className="text-[11px] text-gray-500 mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>Proposed To:</p>
                          <p className="text-[14px] font-bold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>{data.clientName}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PAGE 2 - Company Info + Context */}
                  <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col relative overflow-hidden print:shadow-none print-dynamic-flow print:break-inside-avoid">
                    <div className="flex-grow px-14 py-14 flex flex-col relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-[100px] print:hidden"></div>
                      {/* Company image + description */}
                      {(data.companyImageUrl || data.companyDescription) && (() => {
                        const imgSize = data.companyImageSize || 'medium';
                        const imgFull = imgSize === 'wide';
                        const imgClass = imgSize === 'small' ? 'h-16 w-16' : imgSize === 'large' ? 'h-32 w-32' : 'h-24 w-24';
                        return (
                          <div className={`mb-5 z-10 relative ${imgFull ? 'flex flex-col gap-3' : 'flex gap-4 items-start'}`}>
                            {data.companyImageUrl && (
                              imgFull
                                ? <img src={data.companyImageUrl} alt="Company" className="w-full rounded-lg object-cover object-center border border-gray-100 bg-white" style={{ height: '140px' }} />
                                : <img src={data.companyImageUrl} alt="Company" className={`${imgClass} object-cover object-center rounded-lg border border-gray-100 flex-shrink-0 bg-white`} />
                            )}
                            {data.companyDescription && (
                              <p className="text-xs text-gray-500 leading-relaxed italic relative z-10 text-justify">{data.companyDescription}</p>
                            )}
                          </div>
                        );
                      })()}
                      {/* Context */}
                      {data.projectContext && (
                        <div className="mb-4 relative z-10 flex-grow">
                          <h6 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">01. Context</h6>
                          <p className="text-sm text-gray-600 leading-relaxed text-justify">{data.projectContext}</p>
                        </div>
                      )}
                    </div>
                    <div className="px-14 pt-4 pb-6 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                      <span>{data.companyName || 'PropQuick'} © {new Date().getFullYear()}</span>
                      <span>Page 2</span>
                    </div>
                  </div>

                  {/* PAGE 3 - Challenges */}
                  {challenges.filter((c: string) => c.trim()).length > 0 && (
                    <div className="bg-white w-full max-w-[595px] border-t border-gray-100 aspect-a4 shadow-2xl flex flex-col relative overflow-hidden print:shadow-none print-dynamic-flow print:break-inside-avoid">
                      <div className="flex-grow px-14 py-14 flex flex-col">
                        <div className="mb-4 relative z-10 flex-grow">
                          <h6 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">02. {data.challengesTitle || 'The Challenge'}</h6>
                          <ul className="text-sm text-gray-600 space-y-2 mt-4 text-justify">
                            {challenges.filter((c: string) => c.trim()).map((c: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="px-14 pt-4 pb-6 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                        <span>{data.companyName || 'PropQuick'} © {new Date().getFullYear()}</span>
                        <span>Page 3</span>
                      </div>
                    </div>
                  )}

                  {/* PAGE 4 - Objectives */}
                  {objectives.filter((o: string) => o.trim()).length > 0 && (
                    <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col relative overflow-hidden print:shadow-none print-dynamic-flow print:break-inside-avoid">
                      <div className="flex-grow px-14 py-14 flex flex-col">
                        <div className="mb-4 relative z-10 flex-grow">
                          <h6 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">03. {data.objectivesTitle || 'Objectives'}</h6>
                          <ul className="text-sm text-gray-600 space-y-2 mt-4 text-justify">
                            {objectives.filter((o: string) => o.trim()).map((o: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                <span>{o}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="px-14 pt-4 pb-6 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                        <span>{data.companyName || 'PropQuick'} © {new Date().getFullYear()}</span>
                        <span>Page 4</span>
                      </div>
                    </div>
                  )}


                  {/* PAGE 5 - Investment + Terms */}
                  <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid">
                    <div className="flex-grow px-14 py-12 flex flex-col">
                      <div className="mb-6 border-l-4 border-primary pl-4 py-1">
                        <h2 className="text-xl font-extrabold text-text-dark">Investment &amp; Terms</h2>
                      </div>
                      <div className="flex-grow">
                        <h6 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">04. Schedule &amp; Payments</h6>
                        <table className="w-full text-sm text-left border-collapse">
                          <thead>
                            <tr className="border-b-2 border-gray-200">
                              <th className="py-2 font-bold text-gray-700">Milestone</th>
                              <th className="py-2 font-bold text-gray-700">Deadline</th>
                              <th className="py-2 font-bold text-gray-700 text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {milestones.map((m: any, idx: number) => (
                              <tr key={idx} className="border-b border-gray-100">
                                <td className="py-3 text-gray-600">{m.name}</td>
                                <td className="py-3 text-gray-600">{m.date}</td>
                                <td className="py-3 text-gray-600 text-right">{currencySymbol}{m.amount}</td>
                              </tr>
                            ))}
                            <tr>
                              <td colSpan={2} className="pt-4 font-bold text-gray-800 text-right uppercase tracking-wider text-xs">Total:</td>
                              <td className="pt-4 font-bold text-primary text-right text-xl">{currencySymbol}{totalInvestment.toLocaleString()}</td>
                            </tr>
                            {extras.length > 0 && (
                              <>
                                <tr>
                                  <td colSpan={3} className="pt-8 pb-2 text-xs font-bold text-text-dark uppercase tracking-wider border-b border-gray-100">Optional Add-ons</td>
                                </tr>
                                {extras.map((e: any, idx: number) => (
                                  <tr key={`extra-${idx}`} className="border-b border-gray-50 bg-gray-50/50">
                                    <td className="py-3 text-gray-600 pl-2">{e.name}</td>
                                    <td className="py-3 text-gray-500 text-xs">{e.date}</td>
                                    <td className="py-3 text-gray-600 text-right pr-2">{e.amount}</td>
                                  </tr>
                                ))}
                              </>
                            )}
                          </tbody>
                        </table>
                        <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                          <h6 className="text-xs font-bold text-text-dark mb-2">Terms &amp; Conditions</h6>
                          <p className="text-xs text-gray-500 leading-relaxed text-justify">
                            {data.validUntil
                              ? `This proposal is valid until ${new Date(data.validUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`
                              : 'This proposal is valid for 15 days from the date of issuance.'}
                            {' '}Project start is subject to payment of the initial deposit and signing of the contract.
                            {data.includeTaxes ? ' All values include estimated taxes.' : ' Values do not include applicable taxes.'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-14 pt-4 pb-6 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                      <span>{data.companyName || 'PropQuick'} © {new Date().getFullYear()}</span>
                      <span>Page 5</span>
                    </div>
                  </div>

                  {/* PAGE 6 - Signature */}
                  <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid">
                    <div className="flex-grow px-14 py-14 flex flex-col">
                      <div className="mb-8 border-l-4 border-primary pl-6 py-2">
                        <h2 className="text-2xl font-extrabold text-text-dark">Agreement &amp; Signatures</h2>
                        <p className="text-sm text-gray-500 mt-1 text-justify">By signing below, both parties agree to the terms outlined in this proposal.</p>
                      </div>
                      <div className="flex-grow flex flex-col justify-end gap-12 pb-10">
                        <div className="grid grid-cols-2 gap-12 avoid-break">
                          <div>
                            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-6">Client</p>
                            <div className="border-b-2 border-gray-300 mb-2 h-12"></div>
                            <p className="text-xs text-gray-500">Signature</p>
                            <div className="border-b border-gray-200 mt-5 mb-2 h-8"></div>
                            <p className="text-xs text-gray-500">Full Name</p>
                            <div className="border-b border-gray-200 mt-5 mb-2 h-8"></div>
                            <p className="text-xs text-gray-500">Date</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-6">Service Provider</p>
                            <div className="border-b-2 border-gray-300 mb-2 h-12"></div>
                            <p className="text-xs text-gray-500">Signature</p>
                            <div className="border-b border-gray-200 mt-5 mb-2 h-8"></div>
                            <p className="text-xs text-gray-500">Full Name</p>
                            <div className="border-b border-gray-200 mt-5 mb-2 h-8"></div>
                            <p className="text-xs text-gray-500">Date</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-14 pt-4 pb-6 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                      <span>{data.companyName || 'PropQuick'} © {new Date().getFullYear()}</span>
                      <span>Page 6</span>
                    </div>
                  </div>
                </>
              )}

              {/* ====== LAYOUT 2: MINIMAL ====== */}
              {layout === 2 && (
                <>
                  {/* PAGE 1 - Minimal Cover */}
                  <div className="bg-[#f0f0ed] w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col relative print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {/* Top bar */}
                    <div className="flex items-start justify-between px-10 pt-10">
                      <div className="flex items-center gap-3">
                        {data.logoUrl ? (
                          <img src={data.logoUrl} alt="Logo" className="h-10 object-contain" />
                        ) : (
                          <div className="w-10 h-10 border-2 border-[#1a2332] rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#1a2332] text-base">spa</span>
                          </div>
                        )}
                        <div>
                          <p className="text-[13px] font-semibold text-[#1a2332] leading-tight">{data.companyName || 'Arowwai'}</p>
                          <p className="text-[11px] text-[#555] leading-tight">{data.role || 'Industries'}</p>
                        </div>
                      </div>
                      <p className="text-[12px] font-medium text-[#1a2332] pt-1">
                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>

                    {/* Main title block */}
                    <div className="flex-grow flex flex-col justify-center px-10 pb-10">
                      <h1
                        className="text-[72px] leading-[1.05] text-[#1a2332] mb-14"
                        style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
                      >
                        Project<br />Proposal
                      </h1>
                      <div className="space-y-1">
                        <p className="text-[12px] text-[#777]">Prepared for</p>
                        <p className="text-[15px] font-bold text-[#1a2332]">{data.clientName || data.projectTitle || 'Your Client'}</p>
                        {data.proposalVersion && <p className="text-[11px] text-[#999] mt-0.5">{data.proposalVersion}</p>}
                      </div>
                    </div>

                    {/* Dark footer */}
                    <div className="bg-[#1a2332] px-10 py-7">
                      <p className="text-[10px] text-[#8899aa] uppercase tracking-widest mb-1">Presented by</p>
                      <p className="text-[13px] font-bold text-white">{data.companyName || 'Studio'}</p>
                    </div>
                  </div>

                  {/* PAGE 2 - Minimal Context */}
                  <div className="bg-[#f0f0ed] w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="h-1 w-full bg-[#1a2332]"></div>
                    <div className="flex-grow px-14 pt-10 pb-0 flex flex-col">
                      <p className="text-[10px] uppercase tracking-widest text-[#aaa] mb-2">Overview</p>
                      <h2 className="text-2xl font-light text-[#1a2332] mb-4" style={{ letterSpacing: '-0.01em' }}>Project Context</h2>
                      {(data.companyImageUrl || data.companyDescription) && (() => {
                        const imgSize = data.companyImageSize || 'medium';
                        const imgFull = imgSize === 'wide';
                        const imgClass = imgSize === 'small' ? 'h-12 w-12' : imgSize === 'large' ? 'h-24 w-24' : 'h-16 w-16';
                        return (
                          <div className={`mb-3 ${imgFull ? 'flex flex-col gap-2' : 'flex gap-3 items-start'}`}>
                            {data.companyImageUrl && (
                              imgFull
                                ? <img src={data.companyImageUrl} alt="Company" className="w-full rounded object-cover object-center border border-gray-100 bg-white" style={{ height: '120px' }} />
                                : <img src={data.companyImageUrl} alt="Company" className={`${imgClass} object-cover object-center rounded border border-gray-100 flex-shrink-0 bg-white`} />
                            )}
                            {data.companyDescription && (
                              <p className="text-xs text-gray-500 italic pb-2 border-b border-gray-100 flex-1 text-justify">{data.companyDescription}</p>
                            )}
                          </div>
                        );
                      })()}
                      <p className="text-sm text-gray-600 leading-relaxed flex-grow text-justify">
                        {data.projectContext || 'The goal of this proposal is to outline the strategy for the complete overhaul of the project.'}
                      </p>
                    </div>
                    <div className="bg-[#1a2332] px-12 py-4 flex justify-between items-center mt-auto">
                      <span className="text-[10px] text-[#8899aa]">{data.companyName || 'Studio'} © {new Date().getFullYear()}</span>
                      <span className="text-[10px] text-[#8899aa]">Page 2</span>
                    </div>
                  </div>

                  {/* PAGE 3 - Minimal Challenges */}
                  {challenges.filter((c: string) => c.trim()).length > 0 && (
                    <div className="bg-[#f0f0ed] w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <div className="h-1 w-full bg-[#1a2332]"></div>
                      <div className="flex-grow px-14 pt-10 pb-0 flex flex-col">
                        <p className="text-[10px] uppercase tracking-widest text-[#aaa] mb-2">{data.challengesTitle || 'The Challenge'}</p>
                        <ul className="space-y-2 mt-2 flex-grow text-justify">
                          {challenges.filter((c: string) => c.trim()).map((challenge: string, index: number) => (
                            <li key={`chal-${index}`} className="flex items-start gap-3 text-sm text-gray-600">
                              <span className="text-[#1a2332] font-bold mt-0.5">—</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-[#1a2332] px-12 py-4 flex justify-between items-center mt-auto">
                        <span className="text-[10px] text-[#8899aa]">{data.companyName || 'Studio'} © {new Date().getFullYear()}</span>
                        <span className="text-[10px] text-[#8899aa]">Page 3</span>
                      </div>
                    </div>
                  )}

                  {/* PAGE 4 - Minimal Objectives */}
                  {objectives.filter((o: string) => o.trim()).length > 0 && (
                    <div className="bg-[#f0f0ed] w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <div className="h-1 w-full bg-[#1a2332]"></div>
                      <div className="flex-grow px-14 pt-10 pb-0 flex flex-col">
                        <p className="text-[10px] uppercase tracking-widest text-[#aaa] mb-2">{data.objectivesTitle || 'Objectives'}</p>
                        <ul className="space-y-2 mt-2 flex-grow text-justify">
                          {objectives.filter((o: string) => o.trim()).map((objective: string, index: number) => (
                            <li key={`obj-${index}`} className="flex items-start gap-3 text-sm text-gray-600">
                              <span className="text-[#1a2332] font-bold mt-0.5">—</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-[#1a2332] px-12 py-4 flex justify-between items-center mt-auto">
                        <span className="text-[10px] text-[#8899aa]">{data.companyName || 'Studio'} © {new Date().getFullYear()}</span>
                        <span className="text-[10px] text-[#8899aa]">Page 4</span>
                      </div>
                    </div>
                  )}


                  {/* PAGE 3 - Minimal Investment + Terms */}
                  <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="h-1 w-full bg-[#1a2332]"></div>
                    <div className="flex-grow px-12 py-10 flex flex-col">
                      <p className="text-[10px] uppercase tracking-widest text-[#aaa] mb-4">Investment</p>
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b-2 border-[#1a2332]">
                            <th className="py-2 text-left font-semibold text-[#1a2332]">Milestone</th>
                            <th className="py-2 text-left font-semibold text-[#1a2332]">Due</th>
                            <th className="py-2 text-right font-semibold text-[#1a2332]">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {milestones.map((m: any, idx: number) => (
                            <tr key={idx} className="border-b border-gray-100">
                              <td className="py-3 text-gray-700">{m.name}</td>
                              <td className="py-3 text-gray-500 text-xs">{m.date}</td>
                              <td className="py-3 text-right text-gray-700">{currencySymbol}{m.amount}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={2} className="pt-4 text-right text-xs font-bold uppercase tracking-wider text-[#1a2332]">Total</td>
                            <td className="pt-4 text-right font-bold text-[#1a2332] text-xl">
                              {currencySymbol}{totalInvestment.toLocaleString()}
                            </td>
                          </tr>
                          {extras.length > 0 && (
                            <>
                              <tr>
                                <td colSpan={3} className="pt-8 pb-2 text-[10px] uppercase tracking-widest text-[#aaa] border-b border-gray-100">Optional Add-ons</td>
                              </tr>
                              {extras.map((e: any, idx: number) => (
                                <tr key={`extra-${idx}`} className="border-b border-gray-50 bg-[#fafafa]">
                                  <td className="py-3 text-gray-600 pl-2">{e.name}</td>
                                  <td className="py-3 text-gray-400 text-xs">{e.date}</td>
                                  <td className="py-3 text-gray-600 text-right pr-2">{e.amount}</td>
                                </tr>
                              ))}
                            </>
                          )}
                        </tbody>
                      </table>
                      <p className="text-[10px] text-gray-400 mt-4 leading-relaxed text-justify">
                        {data.validUntil
                          ? `Valid until ${new Date(data.validUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`
                          : 'Valid for 15 days.'}{' '}
                        Project start subject to deposit payment and contract signature.
                        {data.includeTaxes ? ' Values include estimated taxes.' : ' Taxes not included.'}
                      </p>
                    </div>
                    <div className="bg-[#1a2332] px-12 py-4 flex justify-between items-center">
                      <span className="text-[10px] text-[#8899aa]">{data.companyName || 'Studio'} © {new Date().getFullYear()}</span>
                      <span className="text-[10px] text-[#8899aa]">Page 3 of 4</span>
                    </div>
                  </div>

                  {/* PAGE 4 - Signature - Minimal */}
                  <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="h-1 w-full bg-[#1a2332]"></div>
                    <div className="flex-grow px-14 py-12 flex flex-col">
                      <div className="mb-8">
                        <p className="text-[10px] uppercase tracking-widest text-[#aaa] mb-1">Agreement</p>
                        <h2 className="text-2xl font-light text-[#1a2332]" style={{ letterSpacing: '-0.01em' }}>Signatures</h2>
                        <p className="text-xs text-gray-400 mt-2 text-justify">By signing below, both parties agree to the terms outlined in this proposal.</p>
                      </div>
                      <div className="flex-grow flex flex-col justify-end pb-10">
                        <div className="grid grid-cols-2 gap-12 avoid-break">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-[#aaa] mb-8">Client</p>
                            <div className="border-b-2 border-[#1a2332] mb-2 h-12"></div>
                            <p className="text-[11px] text-gray-400">Signature</p>
                            <div className="border-b border-gray-200 mt-6 mb-2 h-8"></div>
                            <p className="text-[11px] text-gray-400">Full Name</p>
                            <div className="border-b border-gray-200 mt-6 mb-2 h-8"></div>
                            <p className="text-[11px] text-gray-400">Date</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-[#aaa] mb-8">Service Provider</p>
                            <div className="border-b-2 border-[#1a2332] mb-2 h-12"></div>
                            <p className="text-[11px] text-gray-400">Signature</p>
                            <div className="border-b border-gray-200 mt-6 mb-2 h-8"></div>
                            <p className="text-[11px] text-gray-400">Full Name</p>
                            <div className="border-b border-gray-200 mt-6 mb-2 h-8"></div>
                            <p className="text-[11px] text-gray-400">Date</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#1a2332] px-12 py-4 flex justify-between items-center">
                      <span className="text-[10px] text-[#8899aa]">{data.companyName || 'Studio'} © {new Date().getFullYear()}</span>
                      <span className="text-[10px] text-[#8899aa]">Page 4 of 4</span>
                    </div>
                  </div>
                </>
              )}

              {/* ====== LAYOUT 3: WARM (White + Pastel Orange) ====== */}
              {layout === 3 && (
                <>
                  {/* PAGE 1 - Warm Cover */}
                  <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col relative print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {/* Top bar */}
                    <div className="flex items-start justify-between px-10 pt-10">
                      <div className="flex items-center gap-3">
                        {data.logoUrl ? (
                          <img src={data.logoUrl} alt="Logo" className="h-10 object-contain" />
                        ) : (
                          <div className="w-10 h-10 border-2 border-[#c2602a] rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#c2602a] text-base">spa</span>
                          </div>
                        )}
                        <div>
                          <p className="text-[13px] font-semibold text-gray-900 leading-tight">{data.companyName || 'Arowwai'}</p>
                          <p className="text-[11px] text-gray-400 leading-tight">{data.role || 'Industries'}</p>
                        </div>
                      </div>
                      <p className="text-[12px] font-medium text-gray-500 pt-1">
                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>

                    {/* Main title block */}
                    <div className="flex-grow flex flex-col justify-center px-10 pb-10">
                      <h1
                        className="text-[72px] leading-[1.05] text-gray-900 mb-14"
                        style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
                      >
                        Project<br />Proposal
                      </h1>
                      <div className="space-y-1">
                        <p className="text-[12px] text-gray-400">Prepared for</p>
                        <p className="text-[15px] font-bold text-gray-900">{data.clientName || data.projectTitle || 'Your Client'}</p>
                        {data.proposalVersion && <p className="text-[11px] text-gray-400 mt-0.5">{data.proposalVersion}</p>}
                      </div>
                    </div>

                    {/* Pastel orange footer */}
                    <div className="px-10 py-7" style={{ backgroundColor: '#f4a261' }}>
                      <p className="text-[10px] text-orange-900/60 uppercase tracking-widest mb-1">Presented by</p>
                      <p className="text-[13px] font-bold text-orange-950">{data.companyName || 'Studio'}</p>
                    </div>
                  </div>

                  {/* PAGE 2 - Warm Context */}
                  <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="h-1 w-full" style={{ backgroundColor: '#f4a261' }}></div>
                    <div className="flex-grow px-14 pt-10 pb-0 flex flex-col">
                      <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-2">Overview</p>
                      <h2 className="text-2xl font-light text-gray-900 mb-4" style={{ letterSpacing: '-0.01em' }}>Project Context</h2>
                      {(data.companyImageUrl || data.companyDescription) && (() => {
                        const imgSize = data.companyImageSize || 'medium';
                        const imgFull = imgSize === 'wide';
                        const imgClass = imgSize === 'small' ? 'h-12 w-12' : imgSize === 'large' ? 'h-24 w-24' : 'h-16 w-16';
                        return (
                          <div className={`mb-3 ${imgFull ? 'flex flex-col gap-2' : 'flex gap-3 items-start'}`}>
                            {data.companyImageUrl && (
                              imgFull
                                ? <img src={data.companyImageUrl} alt="Company" className="w-full rounded object-cover object-center border border-gray-100 bg-white" style={{ height: '120px' }} />
                                : <img src={data.companyImageUrl} alt="Company" className={`${imgClass} object-cover object-center rounded border border-gray-100 flex-shrink-0 bg-white`} />
                            )}
                            {data.companyDescription && (
                              <p className="text-xs text-gray-400 italic pb-2 border-b border-gray-100 flex-1 text-justify">{data.companyDescription}</p>
                            )}
                          </div>
                        );
                      })()}
                      <p className="text-sm text-gray-600 leading-relaxed flex-grow text-justify">
                        {data.projectContext || 'The goal of this proposal is to outline the strategy for the complete overhaul of the project.'}
                      </p>
                    </div>
                    <div className="px-12 py-4 flex justify-between items-center mt-auto" style={{ backgroundColor: '#f4a261' }}>
                      <span className="text-[10px] text-orange-900/60">{data.companyName || 'Studio'} © {new Date().getFullYear()}</span>
                      <span className="text-[10px] text-orange-900/60">Page 2</span>
                    </div>
                  </div>

                  {/* PAGE 3 - Warm Challenges */}
                  {challenges.filter((c: string) => c.trim()).length > 0 && (
                    <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <div className="h-1 w-full" style={{ backgroundColor: '#f4a261' }}></div>
                      <div className="flex-grow px-14 pt-10 pb-0 flex flex-col">
                        <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-2">{data.challengesTitle || 'The Challenge'}</p>
                        <ul className="space-y-2 mt-2 flex-grow text-justify">
                          {challenges.filter((c: string) => c.trim()).map((challenge: string, index: number) => (
                            <li key={`chal-${index}`} className="flex items-start gap-3 text-sm text-gray-600">
                              <span className="font-bold mt-0.5" style={{ color: '#f4a261' }}>—</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="px-12 py-4 flex justify-between items-center mt-auto" style={{ backgroundColor: '#f4a261' }}>
                        <span className="text-[10px] text-orange-900/60">{data.companyName || 'Studio'} © {new Date().getFullYear()}</span>
                        <span className="text-[10px] text-orange-900/60">Page 3</span>
                      </div>
                    </div>
                  )}

                  {/* PAGE 4 - Warm Objectives */}
                  {objectives.filter((o: string) => o.trim()).length > 0 && (
                    <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <div className="h-1 w-full" style={{ backgroundColor: '#f4a261' }}></div>
                      <div className="flex-grow px-14 pt-10 pb-0 flex flex-col">
                        <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-2">{data.objectivesTitle || 'Objectives'}</p>
                        <ul className="space-y-2 mt-2 flex-grow">
                          {objectives.filter((o: string) => o.trim()).map((objective: string, index: number) => (
                            <li key={`obj-${index}`} className="flex items-start gap-3 text-sm text-gray-600">
                              <span className="font-bold mt-0.5" style={{ color: '#f4a261' }}>—</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="px-12 py-4 flex justify-between items-center mt-auto" style={{ backgroundColor: '#f4a261' }}>
                        <span className="text-[10px] text-orange-900/60">{data.companyName || 'Studio'} © {new Date().getFullYear()}</span>
                        <span className="text-[10px] text-orange-900/60">Page 4</span>
                      </div>
                    </div>
                  )}


                  {/* PAGE 3 - Warm Investment + Terms */}
                  <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="h-1 w-full" style={{ backgroundColor: '#f4a261' }}></div>
                    <div className="flex-grow px-12 py-10 flex flex-col">
                      <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-4">Investment</p>
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr style={{ borderBottom: '2px solid #f4a261' }}>
                            <th className="py-2 text-left font-semibold text-gray-800">Milestone</th>
                            <th className="py-2 text-left font-semibold text-gray-800">Due</th>
                            <th className="py-2 text-right font-semibold text-gray-800">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 text-gray-700">{data.milestone1Name || 'Initial Deposit'}</td>
                            <td className="py-3 text-gray-500 text-xs">{data.milestone1Date || 'Upon signing'}</td>
                            <td className="py-3 text-right text-gray-700">{currencySymbol}{data.milestone1Amount || '1500'}</td>
                          </tr>
                          {data.pricingStructure === 'milestone' && (
                            <tr className="border-b border-gray-100">
                              <td className="py-3 text-gray-700">{data.milestone2Name || 'Final Delivery'}</td>
                              <td className="py-3 text-gray-500 text-xs">{data.milestone2Date || 'Project Completion'}</td>
                              <td className="py-3 text-right text-gray-700">{currencySymbol}{data.milestone2Amount || '1500'}</td>
                            </tr>
                          )}
                          <tr>
                            <td colSpan={2} className="pt-4 text-right text-xs font-bold uppercase tracking-wider text-gray-800">Total</td>
                            <td className="pt-4 text-right font-bold text-xl" style={{ color: '#c2602a' }}>
                              {currencySymbol}{(Number(data.milestone1Amount || 1500) + (data.pricingStructure === 'milestone' ? Number(data.milestone2Amount || 1500) : 0)).toLocaleString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
                        {data.validUntil
                          ? `Valid until ${new Date(data.validUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`
                          : 'Valid for 15 days.'}{' '}
                        Project start subject to deposit payment and contract signature.
                        {data.includeTaxes ? ' Values include estimated taxes.' : ' Taxes not included.'}
                      </p>
                    </div>
                    <div className="px-12 py-4 flex justify-between items-center" style={{ backgroundColor: '#f4a261' }}>
                      <span className="text-[10px] text-orange-900/60">{data.companyName || 'Studio'} © {new Date().getFullYear()}</span>
                      <span className="text-[10px] text-orange-900/60">Page 3 of 4</span>
                    </div>
                  </div>

                  {/* PAGE 4 - Signature - Warm */}
                  <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl flex flex-col print:shadow-none print-dynamic-flow print:break-inside-avoid" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="h-1 w-full" style={{ backgroundColor: '#f4a261' }}></div>
                    <div className="flex-grow px-14 py-12 flex flex-col">
                      <div className="mb-8">
                        <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-1">Agreement</p>
                        <h2 className="text-2xl font-light text-gray-900" style={{ letterSpacing: '-0.01em' }}>Signatures</h2>
                        <p className="text-xs text-gray-400 mt-2">By signing below, both parties agree to the terms outlined in this proposal.</p>
                      </div>
                      <div className="flex-grow flex flex-col justify-end pb-10">
                        <div className="grid grid-cols-2 gap-12 avoid-break">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-8">Client</p>
                            <div className="h-12 mb-2" style={{ borderBottom: '2px solid #f4a261' }}></div>
                            <p className="text-[11px] text-gray-400">Signature</p>
                            <div className="border-b border-gray-200 mt-6 mb-2 h-8"></div>
                            <p className="text-[11px] text-gray-400">Full Name</p>
                            <div className="border-b border-gray-200 mt-6 mb-2 h-8"></div>
                            <p className="text-[11px] text-gray-400">Date</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-8">Service Provider</p>
                            <div className="h-12 mb-2" style={{ borderBottom: '2px solid #f4a261' }}></div>
                            <p className="text-[11px] text-gray-400">Signature</p>
                            <div className="border-b border-gray-200 mt-6 mb-2 h-8"></div>
                            <p className="text-[11px] text-gray-400">Full Name</p>
                            <div className="border-b border-gray-200 mt-6 mb-2 h-8"></div>
                            <p className="text-[11px] text-gray-400">Date</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-12 py-4 flex justify-between items-center" style={{ backgroundColor: '#f4a261' }}>
                      <span className="text-[10px] text-orange-900/60">{data.companyName || 'Studio'} © {new Date().getFullYear()}</span>
                      <span className="text-[10px] text-orange-900/60">Page 4 of 4</span>
                    </div>
                  </div>
                </>
              )}
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
      </main >

      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onContinue={executeDownload}
      />
    </div >
  );
}
