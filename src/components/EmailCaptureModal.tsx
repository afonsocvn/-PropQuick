import React, { useState } from 'react';
import { trackEvent } from '../utils/analytics';

interface EmailCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void;
}

export default function EmailCaptureModal({ isOpen, onClose, onContinue }: EmailCaptureModalProps) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        try {
            // NOTE: Replace this URL with your Formspree, Make.com, or Zapier Webhook URL
            // Example Formspree URL: https://formspree.io/f/YOUR_FORM_ID
            const WEBHOOK_URL = 'https://formspree.io/f/SUBSTITUIR_POR_ID';

            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
        } catch (error) {
            console.error('Error submitting email', error);
            // We continue to the download anyway so we don't block the user if the analytics/form fails
        } finally {
            setIsSubmitting(false);

            // Track the email_collected event
            trackEvent('email_collected', 'engagement', email);

            // Save to localStorage so we don't ask again
            localStorage.setItem('has_provided_email', 'true');

            onContinue();
            onClose();
        }
    };

    const handleSkip = () => {
        // If you want to allow them to skip, track it here. 
        // Otherwise, you can remove this button entirely to force email collection.
        onContinue();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm print:hidden">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in-up">
                <h3 className="text-xl font-bold font-serif text-gray-800 mb-2">Before you download...</h3>
                <p className="text-gray-600 mb-6 text-sm">
                    Where should we send future template updates and proposal tips?
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving...' : 'Continue to Download'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={handleSkip}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
                    >
                        Skip for now, just download my PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
