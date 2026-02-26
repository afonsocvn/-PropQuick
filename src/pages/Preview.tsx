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

  const challenges = data.challenges || ['Wireframing de baixa e alta fidelidade.', 'Criação de Design System escalável.'];
  const objectives = data.objectives || ['Auditoria de UX e pesquisa com usuários.'];

  return (
    <div className="bg-surface-off font-display text-text-dark antialiased min-h-screen flex flex-col print:bg-white">
      <header className="bg-surface-light border-b border-[#e7f3f1] sticky top-0 z-50 print:hidden">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined text-3xl">description</span>
            <h1 className="text-xl font-bold tracking-tight text-text-dark">ProposalGen</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-text-muted hover:text-primary transition-colors" href="#">Dashboard</a>
            <a className="text-sm font-medium text-text-muted hover:text-primary transition-colors" href="#">Modelos</a>
            <a className="text-sm font-medium text-text-muted hover:text-primary transition-colors" href="#">Configurações</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/step1" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-bold rounded-lg hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-lg">add</span>
              Nova Proposta
            </Link>
            <div className="h-10 w-10 rounded-full bg-secondary/30 bg-center bg-cover border-2 border-white shadow-sm" data-alt="User profile avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYcg6vICsSnl72xJXH2NZPArYqRQ33XdMoGF5-oRRrB6q_4oDb2kAtugcPCtO0i4iLwRScjlOSFTcLM_eelFm7qMC015UEc6PyPMorgCyYqCuM3wL3h6hWmipFc-8_bcujH79-sk4eBKO9B4dry6-k1vo-E9pYimfBb2ZD3whNrpm2Mqbv4uxNFBL1wWi279qD2kAWU1Z149gLDsDBczOGald_S4t8PCjHyvNVFv-fNXjPB0tVKcTywxtKEJ6QVl9UkIEujMAyYflL')" }}></div>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full p-6 lg:p-10 gap-8 print:p-0 print:m-0 print:block">
        <div className="w-full lg:w-1/3 flex flex-col gap-8 print:hidden">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-secondary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">Passo 4 de 4</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-text-dark leading-tight">Finalizar &amp; Exportar</h2>
            <p className="text-text-muted text-base">Revise os detalhes do documento e a visualização antes de gerar o arquivo final para o cliente.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-light p-4 rounded-xl border border-secondary/20 shadow-sm flex items-start gap-3">
              <div className="bg-surface-off p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase">Data</p>
                <p className="text-sm font-bold text-text-dark">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="bg-surface-light p-4 rounded-xl border border-secondary/20 shadow-sm flex items-start gap-3">
              <div className="bg-surface-off p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined">translate</span>
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase">Idioma</p>
                <p className="text-sm font-bold text-text-dark">Português (PT)</p>
              </div>
            </div>
            <div className="bg-surface-light p-4 rounded-xl border border-secondary/20 shadow-sm flex items-start gap-3 sm:col-span-2">
              <div className="bg-surface-off p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined">folder</span>
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase">Arquivo</p>
                <p className="text-sm font-bold text-text-dark truncate max-w-[250px]" title={`Proposta_${data.companyName || 'Cliente'}.pdf`}>Proposta_{data.companyName || 'Cliente'}.pdf</p>
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-secondary/20 my-2"></div>
          <div className="flex flex-col gap-3">
            <button onClick={handleGenerateFinal} className="group flex items-center justify-center gap-2 w-full h-14 bg-primary text-white text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-[#256663] hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5">
              <span className="material-symbols-outlined">download</span>
              Gerar Proposta Final
            </button>
            <button onClick={handleDownloadPDF} className="flex items-center justify-center gap-2 w-full h-14 bg-white border-2 border-primary/20 text-primary text-base font-bold rounded-xl hover:bg-primary/5 hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined">picture_as_pdf</span>
              Exportar para PDF
            </button>
          </div>
          <div className="bg-blue-50/50 p-4 rounded-lg flex gap-3 items-start border border-blue-100">
            <span className="material-symbols-outlined text-blue-600 mt-0.5 text-lg">info</span>
            <p className="text-sm text-blue-800 leading-relaxed">
              Você poderá editar o documento novamente após a geração, se necessário. Uma cópia será salva automaticamente em 'Meus Documentos'.
            </p>
          </div>
        </div>
        
        <div className="w-full lg:w-2/3 bg-surface-light rounded-2xl border border-secondary/20 shadow-sm p-6 lg:p-8 flex flex-col print:w-full print:border-none print:shadow-none print:p-0">
          <div className="flex items-center justify-between mb-6 print:hidden">
            <h3 className="text-lg font-bold text-text-dark flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">visibility</span>
              Pré-visualização do Documento
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
                      <p className="text-xs text-text-muted">{data.role || 'Soluções de Design'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted font-medium">PREPARADO PARA</p>
                    <h5 className="text-lg font-bold text-text-dark">{data.companyName || 'Acme Corp Inc.'}</h5>
                    <p className="text-xs text-text-muted">Att: {data.email || 'João Silva'}</p>
                  </div>
                </div>
                <div className="mb-10 border-l-4 border-primary pl-6 py-2">
                  <h1 className="text-4xl font-extrabold text-text-dark mb-2 leading-tight">{data.projectTitle || 'Proposta de Redesign UX/UI'}</h1>
                  <p className="text-lg text-secondary font-medium">Projeto Phoenix - {new Date().toLocaleDateString()}</p>
                </div>
                <div className="space-y-6 flex-grow">
                  <div>
                    <h6 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">01. Visão Geral</h6>
                    <p className="text-sm text-gray-600 leading-relaxed text-justify">
                      {data.projectContext || 'O objetivo desta proposta é delinear a estratégia para a renovação completa da interface do usuário da plataforma Phoenix. Nosso foco será melhorar a acessibilidade, modernizar a linguagem visual e otimizar os fluxos de conversão principais.'}
                    </p>
                  </div>
                  <div>
                    <h6 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">02. Escopo do Trabalho</h6>
                    <ul className="text-sm text-gray-600 space-y-2 list-none">
                      {objectives.map((objective: string, index: number) => (
                        <li key={`obj-${index}`} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5"></span>
                          <span>{objective || 'Auditoria de UX e pesquisa com usuários.'}</span>
                        </li>
                      ))}
                      {challenges.map((challenge: string, index: number) => (
                        <li key={`chal-${index}`} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5"></span>
                          <span>{challenge || 'Wireframing de baixa e alta fidelidade.'}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                  <span>{data.companyName || 'BetterProposal'} © {new Date().getFullYear()}</span>
                  <span>Página 1 de 2</span>
                </div>
              </div>

              {/* PAGE 2 */}
              <div className="bg-white w-full max-w-[595px] aspect-a4 shadow-2xl p-12 flex flex-col relative overflow-hidden group print:shadow-none print:max-w-none print:w-[210mm] print:h-[297mm] break-after-page">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-[100px]"></div>
                <div className="mb-10 border-l-4 border-primary pl-6 py-2">
                  <h2 className="text-3xl font-extrabold text-text-dark mb-2 leading-tight">Investimento e Prazos</h2>
                </div>
                <div className="space-y-6 flex-grow">
                  <div>
                    <h6 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-4 border-b border-gray-100 pb-1">03. Cronograma e Pagamentos</h6>
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="py-3 font-bold text-gray-700">Fase / Marco</th>
                          <th className="py-3 font-bold text-gray-700">Prazo</th>
                          <th className="py-3 font-bold text-gray-700 text-right">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-4 text-gray-600">{data.milestone1Name || 'Depósito Inicial'}</td>
                          <td className="py-4 text-gray-600">{data.milestone1Date || 'Na assinatura'}</td>
                          <td className="py-4 text-gray-600 text-right">${data.milestone1Amount || '1500'}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-4 text-gray-600">{data.milestone2Name || 'Entrega Final'}</td>
                          <td className="py-4 text-gray-600">{data.milestone2Date || 'Conclusão do Projeto'}</td>
                          <td className="py-4 text-gray-600 text-right">${data.milestone2Amount || '1500'}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={2} className="py-6 font-bold text-gray-800 text-right uppercase tracking-wider text-xs">Total do Investimento:</td>
                          <td className="py-6 font-bold text-primary text-right text-xl">${(Number(data.milestone1Amount || 1500) + Number(data.milestone2Amount || 1500)).toLocaleString()}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="mt-8 p-6 bg-surface-off rounded-lg border border-dashed border-gray-300">
                    <h6 className="text-sm font-bold text-text-dark mb-2">Termos e Condições</h6>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Os valores apresentados são válidos por 15 dias a partir da data de emissão desta proposta. 
                      O início do projeto está condicionado ao pagamento do depósito inicial e assinatura do contrato.
                      {data.includeTaxes ? ' Os valores incluem impostos estimados.' : ' Os valores não incluem impostos aplicáveis.'}
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                  <span>{data.companyName || 'BetterProposal'} © {new Date().getFullYear()}</span>
                  <span>Página 2 de 2</span>
                </div>
              </div>

            </div>
          </div>
          <div className="mt-4 flex justify-between items-center px-2 print:hidden">
            <p className="text-sm text-text-muted font-medium">Mostrando 2 páginas</p>
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
