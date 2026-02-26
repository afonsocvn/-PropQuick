import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-background-light text-text-dark font-display antialiased min-h-screen flex flex-col">
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">description</span>
            <h2 className="text-primary font-serif text-xl font-bold tracking-tight">Proposta Express</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-text-soft hover:text-primary font-medium text-sm transition-colors" href="#beneficios">Benefícios</a>
            <a className="text-text-soft hover:text-primary font-medium text-sm transition-colors" href="#como-funciona">Como funciona</a>
            <a className="text-text-soft hover:text-primary font-medium text-sm transition-colors" href="#comparativo">Comparativo</a>
            <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-bold text-sm transition-colors shadow-sm">
              Login
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <section className="pt-16 pb-20 px-4 md:px-0 bg-background-light">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-dark font-bold mb-6 leading-tight">
              Pare de perder contratos por causa de propostas amadoras.
            </h1>
            <p className="text-xl text-text-soft max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Freelancers de elite não perdem horas no Word ou Canva. Crie propostas comerciais irresistíveis, com design de agência e copy persuasivo, em menos de 2 minutos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/step1" className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white text-lg px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                Criar a minha Proposta Agora
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <div className="text-sm text-text-soft flex items-center gap-1 mt-2 sm:mt-0">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                Sem necessidade de cartão de crédito
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white" id="comparativo">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Realidade do Freelancer</span>
              <h2 className="font-serif text-3xl font-bold text-text-dark mt-4">Quanto vale a sua hora de trabalho?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-stretch relative">
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-md border border-gray-100">
                <span className="material-symbols-outlined text-gray-400">compare_arrows</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:border-gray-300 transition-colors">
                <h3 className="text-gray-500 font-serif text-xl font-bold mb-2">Caminho Tradicional</h3>
                <p className="text-sm text-gray-400 mb-6">Word, PDF, Canva, Indesign...</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-400 shrink-0">schedule</span>
                    <span className="text-gray-600"><strong>2 horas</strong> formatando documentos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-400 shrink-0">sentiment_dissatisfied</span>
                    <span className="text-gray-600">Layout inconsistente e amador</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-400 shrink-0">money_off</span>
                    <span className="text-gray-600">Custo de oportunidade: <strong>€100+ perdidos</strong></span>
                  </li>
                </ul>
                <div className="bg-gray-200 h-px w-full my-6"></div>
                <p className="text-center text-gray-500 font-medium">Resultado: Exaustão e baixo retorno.</p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-accent text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMENDADO</div>
                <h3 className="text-primary font-serif text-xl font-bold mb-2">Caminho Proposta Express</h3>
                <p className="text-sm text-primary/70 mb-6">Automação inteligente e design premium</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0">bolt</span>
                    <span className="text-gray-800"><strong>2 minutos</strong> para gerar o PDF</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0">auto_awesome</span>
                    <span className="text-gray-800">Design de agência internacional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0">savings</span>
                    <span className="text-gray-800">Investimento: Apenas <strong>€5,00</strong></span>
                  </li>
                </ul>
                <div className="bg-primary/10 h-px w-full my-6"></div>
                <p className="text-center text-primary font-bold">Resultado: Mais contratos fechados.</p>
              </div>
            </div>
            <div className="mt-12 text-center max-w-2xl mx-auto">
              <blockquote className="text-xl font-serif italic text-text-soft">
                "O tempo que você gasta formatando propostas é tempo que você não está faturando. A Proposta Express se paga no primeiro minuto."
              </blockquote>
            </div>
          </div>
        </section>
        <section className="py-20 bg-background-light" id="beneficios">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-3xl font-bold text-center text-text-dark mb-16">Tudo o que você precisa para vender mais</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-amber-600 text-2xl">psychology</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">Copy Persuasivo</h3>
                <p className="text-gray-600 leading-relaxed">
                  Não sabe o que escrever? Nossos templates já vêm com textos baseados em gatilhos mentais de vendas. Basta preencher as lacunas.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary-light/20 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">palette</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">Design de Agência</h3>
                <p className="text-gray-600 leading-relaxed">
                  Esqueça layouts quebrados. Entregue um documento visualmente impecável que transmite autoridade imediata ao seu cliente.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-blue-600 text-2xl">trending_up</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">Foco no ROI</h3>
                <p className="text-gray-600 leading-relaxed">
                  Estruturamos a proposta para mostrar valor, não apenas preço. Ajudamos seu cliente a ver o retorno sobre o investimento.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white" id="como-funciona">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-text-dark">Como funciona</h2>
              <p className="text-gray-500 mt-4">Do zero à proposta pronta em 4 passos simples.</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>
              <div className="space-y-12 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-end">
                    <div className="bg-white border-2 border-primary text-primary font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-sm z-20">1</div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-left">
                    <h4 className="font-bold text-lg text-gray-900">Seus Dados</h4>
                    <p className="text-gray-600">Insira suas informações e logotipo uma única vez.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="md:w-1/2 flex justify-start">
                    <div className="bg-white border-2 border-primary text-primary font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-sm z-20">2</div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-right">
                    <h4 className="font-bold text-lg text-gray-900">O Projeto</h4>
                    <p className="text-gray-600">Descreva o escopo e objetivos do cliente.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-end">
                    <div className="bg-white border-2 border-primary text-primary font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-sm z-20">3</div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-left">
                    <h4 className="font-bold text-lg text-gray-900">Orçamento &amp; Prazos</h4>
                    <p className="text-gray-600">Defina os valores e cronograma de forma clara.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="md:w-1/2 flex justify-start">
                    <div className="bg-primary text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg z-20">4</div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-right">
                    <h4 className="font-bold text-lg text-gray-900">Download PDF</h4>
                    <p className="text-gray-600">Paga 5€ e descarrega o teu PDF pronto a fechar o contrato.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 text-center">
              <Link to="/step1" className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-lg">
                Começar Agora
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-400">description</span>
            <span className="font-serif font-bold text-gray-700">Proposta Express</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <a className="hover:text-primary transition-colors" href="#">Termos de Uso</a>
            <a className="hover:text-primary transition-colors" href="#">Política de Privacidade</a>
            <a className="hover:text-primary transition-colors" href="#">Contato</a>
            <a className="hover:text-primary transition-colors" href="#">Blog</a>
          </div>
          <div className="text-xs text-gray-400">
            © 2023 Proposta Express. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
