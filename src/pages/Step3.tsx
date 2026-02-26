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
    <div className="bg-background-light dark:bg-background-dark text-text-main font-display antialiased min-h-screen flex flex-col">
      <header className="bg-surface border-b border-[#e5e9e9] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary">
            <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">description</span>
            </div>
            <h2 className="text-[#233333] text-xl font-extrabold tracking-tight">ProposalGen</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-text-muted hover:text-primary text-sm font-semibold transition-colors" href="#">Como funciona</a>
            <a className="text-text-muted hover:text-primary text-sm font-semibold transition-colors" href="#">Preços</a>
            <a className="text-text-muted hover:text-primary text-sm font-semibold transition-colors" href="#">Ajuda</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex text-text-main font-semibold text-sm hover:text-primary transition-colors">
              Entrar
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm cursor-pointer" title="Profile">
              JD
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center py-8 md:py-12 px-4 sm:px-6">
        <div className="w-full max-w-[800px] mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-primary font-bold text-sm tracking-wide uppercase">Etapa 3 de 5</span>
            <span className="text-text-muted text-sm font-medium">60% concluído</span>
          </div>
          <div className="h-2 w-full bg-[#E0E8E8] rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: '60%' }}></div>
          </div>
        </div>
        <div className="w-full max-w-[800px] flex flex-col gap-8">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#233333] tracking-tight">Detalhes do Projeto</h1>
            <p className="text-text-muted text-lg">Conte-nos um pouco mais sobre o que você vai desenvolver para criar uma proposta personalizada.</p>
          </div>
          <div className="bg-surface rounded-xl border border-[#e5e9e9] shadow-soft p-6 md:p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#f0f2f2] pb-3 mb-4">
                <span className="material-symbols-outlined text-primary">info</span>
                <h3 className="text-lg font-bold text-[#233333]">Informações Básicas</h3>
              </div>
              <div className="grid gap-6">
                <label className="block space-y-2 group">
                  <span className="block text-sm font-bold text-[#233333] group-focus-within:text-primary transition-colors">Título do Projeto</span>
                  <input name="projectTitle" value={data.projectTitle || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#d1dbdb] bg-[#fcfdfd] text-[#233333] placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="Ex: Redesign de E-commerce para Loja de Roupas" type="text"/>
                </label>
                <label className="block space-y-2 group">
                  <span className="block text-sm font-bold text-[#233333] group-focus-within:text-primary transition-colors">Contexto</span>
                  <textarea name="projectContext" value={data.projectContext || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#d1dbdb] bg-[#fcfdfd] text-[#233333] placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none min-h-[120px] resize-y" placeholder="Descreva brevemente o cenário atual do cliente. Ex: O cliente possui um site antigo que não é responsivo e está perdendo vendas mobile..."></textarea>
                  <p className="text-xs text-text-muted">Seja específico sobre as dores atuais do cliente.</p>
                </label>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#f0f2f2] pb-3 mb-4">
                <span className="material-symbols-outlined text-primary">warning</span>
                <h3 className="text-lg font-bold text-[#233333]">O Desafio</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-text-muted">Liste os principais problemas que este projeto visa resolver.</p>
                <div className="space-y-3">
                  {challenges.map((challenge: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary text-xl">drag_indicator</span>
                      <input 
                        value={challenge} 
                        onChange={(e) => handleArrayChange('challenges', index, e.target.value)} 
                        className="flex-1 px-4 py-2.5 rounded-lg border border-[#d1dbdb] bg-[#fcfdfd] text-[#233333] placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" 
                        placeholder="Ex: Baixa taxa de conversão no checkout" 
                        type="text"
                      />
                      <button type="button" onClick={() => removeArrayItem('challenges', index)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Remover">
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('challenges')} className="flex items-center gap-2 text-primary font-bold text-sm hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors w-max mt-2">
                    <span className="material-symbols-outlined text-lg">add</span>
                    Adicionar item
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#f0f2f2] pb-3 mb-4">
                <span className="material-symbols-outlined text-primary">flag</span>
                <h3 className="text-lg font-bold text-[#233333]">Objetivos</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-text-muted">Quais são as metas de sucesso para este projeto?</p>
                <div className="space-y-3">
                  {objectives.map((objective: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary text-xl">check_circle</span>
                      <input 
                        value={objective} 
                        onChange={(e) => handleArrayChange('objectives', index, e.target.value)} 
                        className="flex-1 px-4 py-2.5 rounded-lg border border-[#d1dbdb] bg-[#fcfdfd] text-[#233333] placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" 
                        placeholder="Ex: Aumentar vendas em 20%" 
                        type="text"
                      />
                      <button type="button" onClick={() => removeArrayItem('objectives', index)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Remover">
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('objectives')} className="flex items-center gap-2 text-primary font-bold text-sm hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors w-max mt-2">
                    <span className="material-symbols-outlined text-lg">add</span>
                    Adicionar objetivo
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 mt-4 mb-12">
            <Link to="/step1" className="w-full md:w-auto px-8 py-3 rounded-lg text-text-muted font-bold text-sm hover:text-text-main hover:bg-[#e5e9e9] transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Voltar
            </Link>
            <Link to="/step5" className="w-full md:w-auto px-10 py-3.5 rounded-lg bg-primary text-white font-bold text-sm shadow-[0_4px_14px_0_rgba(47,125,121,0.39)] hover:shadow-[0_6px_20px_rgba(47,125,121,0.23)] hover:bg-[#266663] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
              Continuar
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
