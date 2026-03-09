import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    return (
        <div className="bg-background-light text-text-dark font-display antialiased min-h-screen flex flex-col pt-10">

            <main className="flex-grow py-16 px-6">
                <article className="max-w-3xl mx-auto prose prose-gray">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-2">Privacy Policy</h1>
                    <p className="text-sm text-gray-400 mb-10">Last updated: March 4, 2026</p>

                    <section className="space-y-6 text-gray-600 leading-relaxed">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">1. Introduction</h2>
                            <p>This Privacy Policy explains how Propose.ly ("we", "us", "the Service") handles information when you use our platform. We are committed to transparency and simplicity.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">2. Information We Collect</h2>
                            <p><strong>We do not collect, store, or process any personal data.</strong> All data you enter during proposal creation (your name, company details, project information, etc.) is stored exclusively in your browser's local storage and never leaves your device.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">3. Data Storage</h2>
                            <p>All proposal content is saved locally on your browser using <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">localStorage</code>. We do not have access to this data, and it is not transmitted to any server. Clearing your browser data will permanently delete any saved proposals.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">4. Analytics & Tracking</h2>
                            <p>Currently, we do not use any analytics, tracking pixels, or third-party cookies. In the future, we may implement basic anonymous usage metrics (such as the number of proposals generated) to help improve the Service. We will update this policy accordingly if that changes.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">5. Third-Party Services</h2>
                            <p>The Service does not integrate with any third-party services that would receive your data. PDF generation is handled entirely within your browser.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">6. Cookies</h2>
                            <p>Propose.ly does not use cookies for tracking or advertising purposes. Only essential browser storage mechanisms are used to save your work locally.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">7. Children's Privacy</h2>
                            <p>The Service is not directed at children under 16. We do not knowingly collect any information from minors.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">8. Changes to This Policy</h2>
                            <p>We reserve the right to update this Privacy Policy at any time. If we make significant changes, we will update the "Last updated" date at the top of this page. Continued use of the Service constitutes acceptance of the updated policy.</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">9. Contact</h2>
                            <p>If you have any questions about this Privacy Policy, please reach out through the contact options on our website.</p>
                        </div>
                    </section>
                </article>
            </main>

            <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400">description</span>
                        <span className="font-serif font-bold text-gray-700">Propose.ly</span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link className="hover:text-primary transition-colors" to="/terms">Terms of Use</Link>
                        <Link className="hover:text-primary transition-colors font-medium" to="/privacy">Privacy Policy</Link>
                    </div>
                    <div className="text-xs text-gray-400">© 2026 Propose.ly. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}
