import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-background-light text-text-dark font-display antialiased min-h-screen flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 px-6 py-2 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Propquick Logo" className="h-24 md:h-28 w-auto object-contain mix-blend-multiply py-2" />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-text-soft hover:text-primary font-medium text-sm transition-colors" href="#beneficios">Benefits</a>
            <a className="text-text-soft hover:text-primary font-medium text-sm transition-colors" href="#como-funciona">How it works</a>
            <a className="text-text-soft hover:text-primary font-medium text-sm transition-colors" href="#comparativo">Compare</a>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <section className="pt-16 pb-20 px-4 md:px-0 bg-background-light">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-dark font-bold mb-6 leading-tight">
              Stop losing deals because of amateur proposals.
            </h1>
            <p className="text-xl text-text-soft max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Elite freelancers don't waste hours in Word or Canva. Create irresistible business proposals with agency design and persuasive copy in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/step1" className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white text-lg px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                Create my Proposal Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <div className="text-sm text-text-soft flex items-center gap-1 mt-2 sm:mt-0">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                No credit card required
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white" id="comparativo">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Freelancer reality</span>
              <h2 className="font-serif text-3xl font-bold text-text-dark mt-4">How much is your time worth?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-stretch relative">
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-md border border-gray-100">
                <span className="material-symbols-outlined text-gray-400">compare_arrows</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:border-gray-300 transition-colors">
                <h3 className="text-gray-500 font-serif text-xl font-bold mb-2">Traditional Way</h3>
                <p className="text-sm text-gray-400 mb-6">Word, PDF, Canva, Indesign...</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-400 shrink-0">schedule</span>
                    <span className="text-gray-600"><strong>2 hours</strong> formatting documents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-400 shrink-0">sentiment_dissatisfied</span>
                    <span className="text-gray-600">Inconsistent &amp; amateur layout</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-400 shrink-0">money_off</span>
                    <span className="text-gray-600">Opportunity cost: <strong>€100+ lost</strong></span>
                  </li>
                </ul>
                <div className="bg-gray-200 h-px w-full my-6"></div>
                <p className="text-center text-gray-500 font-medium">Result: Exhaustion &amp; low return.</p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-accent text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-lg">FREE BETA</div>
                <h3 className="text-primary font-serif text-xl font-bold mb-2">Propose.ly Way</h3>
                <p className="text-sm text-primary/70 mb-6">Smart automation and premium design</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0">bolt</span>
                    <span className="text-gray-800"><strong>2 minutes</strong> to generate PDF</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0">auto_awesome</span>
                    <span className="text-gray-800">International agency level design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0">savings</span>
                    <span className="text-gray-800">Investment: <strong>Free (Beta)</strong></span>
                  </li>
                </ul>
                <div className="bg-primary/10 h-px w-full my-6"></div>
                <p className="text-center text-primary font-bold">Result: More closed deals.</p>
              </div>
            </div>
            <div className="mt-12 text-center max-w-2xl mx-auto">
              <blockquote className="text-xl font-serif italic text-text-soft">
                "The time you spend formatting proposals is time you aren't billing. Propose.ly pays for itself in the first minute."
              </blockquote>
            </div>
          </div>
        </section>
        <section className="py-20 bg-background-light" id="beneficios">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-3xl font-bold text-center text-text-dark mb-16">Everything you need to close more deals</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-amber-600 text-2xl">psychology</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-3">Persuasive Copy</h3>
                <p className="text-gray-600 md:text-lg leading-relaxed">
                  Don't know how to structure your proposal? We provide a proven outline and guide you step-by-step to write persuasive content that converts.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary-light/20 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">palette</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-3">Agency Design</h3>
                <p className="text-gray-600 md:text-lg leading-relaxed">
                  Forget broken layouts. Deliver a visually flawless document that conveys immediate authority to your client.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-blue-600 text-2xl">trending_up</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-3">Focus on ROI</h3>
                <p className="text-gray-600 md:text-lg leading-relaxed">
                  We structure the proposal to show value, not just price. We help your clients see the return on investment.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white" id="como-funciona">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-text-dark">How it works</h2>
              <p className="text-gray-500 mt-4">From zero to a ready proposal in 4 simple steps.</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>
              <div className="space-y-12 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-end">
                    <div className="bg-white border-2 border-primary text-primary font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-sm z-20">1</div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-left">
                    <h4 className="font-bold text-lg text-gray-900">Your Data</h4>
                    <p className="text-gray-600">Enter your info and logo just once.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="md:w-1/2 flex justify-start">
                    <div className="bg-white border-2 border-primary text-primary font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-sm z-20">2</div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-right">
                    <h4 className="font-bold text-lg text-gray-900">The Project</h4>
                    <p className="text-gray-600">Describe the scope and client objectives.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 flex justify-end">
                    <div className="bg-white border-2 border-primary text-primary font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-sm z-20">3</div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-left">
                    <h4 className="font-bold text-lg text-gray-900">Budget &amp; Timeline</h4>
                    <p className="text-gray-600">Clearly define the amounts and payment schedule.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="md:w-1/2 flex justify-start">
                    <div className="bg-primary text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg z-20">4</div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-right">
                    <h4 className="font-bold text-lg text-gray-900">Download PDF</h4>
                    <p className="text-gray-600">Download your professional PDF completely free during our Beta.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 text-center">
              <Link to="/step1" className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-lg">
                Start Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div></div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <Link className="hover:text-primary transition-colors" to="/terms">Terms of Use</Link>
            <Link className="hover:text-primary transition-colors" to="/privacy">Privacy Policy</Link>
            <a className="hover:text-primary transition-colors" href="#">Contact</a>
            <a className="hover:text-primary transition-colors" href="#">Blog</a>
          </div>
          <div className="text-xs text-gray-400">
            © 2026 Propose.ly. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
