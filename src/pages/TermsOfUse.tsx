import { Link } from 'react-router-dom';

export default function TermsOfUse() {
    return (
        <div className="bg-background-light text-text-dark font-display antialiased min-h-screen flex flex-col pt-10">

            <main className="flex-grow py-16 px-6">
                <article className="max-w-3xl mx-auto prose prose-gray">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-2">Terms of Use</h1>
                    <p className="text-sm text-gray-400 mb-10">Last updated: March 4, 2026</p>

                    <section className="space-y-6 text-gray-600 leading-relaxed">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">1. Acceptance of Terms</h2>
                            <p>By accessing and using PropQuick ("the Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree, please do not use the Service.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">2. Description of Service</h2>
                            <p>PropQuick is a free online tool currently in <strong>Beta</strong> that helps users create professional business proposals. The Service is provided "as is" and "as available" without any warranties or guarantees of any kind, whether express or implied.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">3. Beta Disclaimer</h2>
                            <p>The Service is currently in its Beta phase. Features may change, be removed, or become unavailable at any time without prior notice. We make no commitment regarding the availability, continuity, or future pricing of the Service.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">4. User Responsibilities</h2>
                            <p>You are solely responsible for the content you create using the Service. PropQuick does not review, validate, or take responsibility for the accuracy, legality, or appropriateness of any proposals or documents generated through the platform.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">5. Intellectual Property</h2>
                            <p>All content you create using PropQuick remains your own. You retain full ownership of any proposals, text, images, or other materials you produce. The Service's interface, branding, and underlying code are the property of PropQuick.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">6. Limitation of Liability</h2>
                            <p>To the maximum extent permitted by law, PropQuick and its creators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of, or inability to use, the Service. This includes, but is not limited to, loss of revenue, data, business opportunities, or any other losses.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">7. No Guarantees</h2>
                            <p>We do not guarantee that the Service will meet your requirements, be error-free, or produce any specific business outcome. Proposals created with the Service are tools to assist your workflow and are not a substitute for professional advice.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">8. Changes to Terms</h2>
                            <p>We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">9. Contact</h2>
                            <p>If you have questions about these Terms, please reach out through the contact options available on our website.</p>
                        </div>
                    </section>
                </article>
            </main>

            <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400">description</span>
                        <span className="font-serif font-bold text-gray-700">PropQuick</span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link className="hover:text-primary transition-colors font-medium" to="/terms">Terms of Use</Link>
                        <Link className="hover:text-primary transition-colors" to="/privacy">Privacy Policy</Link>
                    </div>
                    <div className="text-xs text-gray-400">© 2026 PropQuick. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}
