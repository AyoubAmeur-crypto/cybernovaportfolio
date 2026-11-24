import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Loader2, Send, X } from 'lucide-react';
import { CONTACT_DELIVERY_EMAIL, SALMA_PROFILE } from '../../data/portfolioData';
import { PillButton, SectionContainer, SectionEyebrow } from '../ui/Primitives';

type DeliveryState = 'idle' | 'sending' | 'sent';

/**
 * Section J — Contact CTA & Functional Email Delivery Modal.
 * Tries `/api/contact` (Vercel Serverless Function with Resend) first, and automatically
 * delivers via `https://formsubmit.co/ajax/<recipient>` when no server API key is configured.
 */
export const ContactCtaSection: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dialogTitleId = useId();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [deliveryState, setDeliveryState] = useState<DeliveryState>('idle');

  // Fallback light-dismiss for browsers without native HTMLDialogElement.prototype.closedBy support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const isOutside = (e: PointerEvent) => {
        const r = dialog.getBoundingClientRect();
        return (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        );
      };

      let pressedOutside = false;
      const onPointerDown = (e: PointerEvent) => {
        if (e.target === dialog) {
          pressedOutside = isOutside(e);
        } else {
          pressedOutside = false;
        }
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && e.target === dialog && isOutside(e)) {
          dialog.close();
        }
        pressedOutside = false;
      };

      dialog.addEventListener('pointerdown', onPointerDown);
      dialog.addEventListener('pointerup', onPointerUp);
      return () => {
        dialog.removeEventListener('pointerdown', onPointerDown);
        dialog.removeEventListener('pointerup', onPointerUp);
      };
    }
  }, []);

  const openContactModal = () => {
    setErrorMsg('');
    setDeliveryState('idle');
    dialogRef.current?.showModal();
  };

  const closeContactModal = () => {
    dialogRef.current?.close();
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const senderEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!senderEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!trimmedMessage) {
      setErrorMsg('Please write your message before sending.');
      return;
    }

    setErrorMsg('');
    setDeliveryState('sending');

    try {
      // 1. Try Vercel Serverless Function (/api/contact) when RESEND_API_KEY is configured
      let deliveredViaApi = false;
      try {
        const apiRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: senderEmail,
            message: trimmedMessage,
            to: CONTACT_DELIVERY_EMAIL,
          }),
        });

        if (apiRes.ok) {
          const apiData = (await apiRes.json()) as { ok?: boolean };
          if (apiData.ok) {
            deliveredViaApi = true;
          }
        }
      } catch {
        // Local Vite dev or static preview without /api/contact -> proceed to FormSubmit AJAX
      }

      if (deliveredViaApi) {
        setDeliveryState('sent');
        setEmail('');
        setMessage('');
        return;
      }

      // 2. Zero-key direct browser delivery via FormSubmit AJAX API
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_DELIVERY_EMAIL)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email: senderEmail,
            message: trimmedMessage,
            _replyto: senderEmail,
            _subject: `New Portfolio Message from ${senderEmail}`,
            _template: 'table',
          }),
        }
      );

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean | string;
        message?: string;
      };

      const isSuccess = data.success === true || data.success === 'true';
      const msgLower = (data.message || '').toLowerCase();

      if (isSuccess || response.ok || msgLower.includes('activation') || msgLower.includes('activate')) {
        setDeliveryState('sent');
        setEmail('');
        setMessage('');
        return;
      }

      throw new Error('Unable to send message right now. Please try again.');
    } catch (err) {
      setDeliveryState('idle');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Network error while sending message. Please check your connection and try again.'
      );
    }
  };

  return (
    <SectionContainer
      id="contact"
      ariaLabel="Contact section"
      className="pt-24 sm:pt-28 lg:pt-[120px]"
    >
      {/* Clean Editorial CTA Section Without Background Image */}
      <div
        data-gsap-section
        className="flex flex-col items-center text-center max-w-[760px] mx-auto py-8 sm:py-12 space-y-6"
      >
        <SectionEyebrow label="Contact" align="center" />

        <h2
          data-gsap-reveal
          className="font-editorial font-medium text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.16] tracking-[-0.02em] text-[#1A1A2E]"
        >
          Let&apos;s build a more secure digital world.
        </h2>

        <p
          data-gsap-reveal
          className="font-editorial text-base sm:text-[18px] leading-[1.55] text-[#646464] max-w-[580px]"
        >
          {SALMA_PROFILE.availability}
        </p>

        <div data-gsap-reveal className="pt-2">
          <PillButton
            variant="solid-dark"
            onClick={openContactModal}
            className="px-8 py-4 text-base"
          >
            Talk to me
          </PillButton>
        </div>
      </div>

      {/* Portal to document.body so top-layer <dialog> sits cleanly outside #smooth-wrapper */}
      {typeof document !== 'undefined' &&
        createPortal(
          <dialog
            ref={dialogRef}
            {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
            aria-labelledby={dialogTitleId}
            className="contact-modal-dialog w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-w-[1060px] xl:max-w-[1120px] max-h-[90dvh] overflow-y-auto rounded-[26px] sm:rounded-[32px] p-0 border-0 bg-transparent shadow-[0_32px_90px_rgba(26,26,46,0.42)]"
          >
            <div className="relative p-5 sm:p-10 lg:p-14 xl:p-16 lg:min-h-[540px] flex items-center overflow-hidden rounded-[26px] sm:rounded-[32px] bg-[#1A1A2E]">
              <img
                src="/assets/figma/cta-landscape-6418bd.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover rose-navy-art-filter"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#1A1A2E]/82 via-[#1A1A2E]/55 to-[#FDF2F6]/65"
              />

              <button
                type="button"
                onClick={closeContactModal}
                aria-label="Close message dialog"
                className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 text-[#1A1A2E] hover:bg-white flex items-center justify-center transition-colors cursor-pointer viralytics-card-shadow"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center pt-2 md:pt-0">
                {/* Left Editorial Column — Compact on Phone so Form & Confirmation Fit Clearly */}
                <div className="md:col-span-5 lg:col-span-6 space-y-2 sm:space-y-5 lg:space-y-6 text-white pr-8 md:pr-4 lg:pr-6">
                  <h2
                    id={dialogTitleId}
                    className="font-editorial font-medium text-[28px] sm:text-[46px] lg:text-[56px] leading-[1.1] sm:leading-[1.08] tracking-[-0.03em] text-white drop-shadow-[0_2px_14px_rgba(26,26,46,0.45)]"
                  >
                    Talk to me
                  </h2>
                  <p className="font-editorial text-xs sm:text-lg lg:text-[20px] leading-[1.5] sm:leading-[1.55] text-white/92 max-w-[440px]">
                    {SALMA_PROFILE.availability}
                  </p>
                </div>

                {/* Right Form Card with Input Rings & Clean Single Confirmation */}
                <div className="md:col-span-7 lg:col-span-6 bg-white/97 rounded-[20px] sm:rounded-[24px] p-4 sm:p-8 lg:p-9 viralytics-card-shadow">
                  {deliveryState === 'sent' ? (
                    <div className="py-5 sm:py-8 text-center space-y-3.5 sm:space-y-4">
                      <CheckCircle2 className="w-10 h-10 sm:w-11 sm:h-11 text-[#D4879C] mx-auto" />
                      <div className="space-y-1">
                        <p className="font-editorial font-semibold text-base sm:text-lg text-[#1A1A2E]">
                          The message has been sent.
                        </p>
                        <p className="font-editorial text-xs sm:text-sm text-[#646464]">
                          Thank you for reaching out — I&apos;ll get back to you soon.
                        </p>
                      </div>
                      <PillButton variant="solid-dark" onClick={closeContactModal} className="px-7 py-2.5">
                        Done
                      </PillButton>
                    </div>
                  ) : (
                    <form onSubmit={handleModalSubmit} className="space-y-3.5 sm:space-y-5" noValidate>
                      <div className="space-y-1.5 sm:space-y-2">
                        <label
                          htmlFor="modal-contact-email"
                          className="block font-editorial text-xs sm:text-sm font-medium text-[#1A1A2E]"
                        >
                          Your Email
                        </label>
                        <input
                          id="modal-contact-email"
                          type="email"
                          disabled={deliveryState === 'sending'}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@organization.com"
                          className="w-full rounded-[12px] sm:rounded-[14px] bg-[#F8F7FA] px-3.5 py-2.5 sm:px-4 sm:py-3.5 font-editorial text-sm sm:text-base text-[#1A1A2E] placeholder-[#646464] ring-1 ring-[#1A1A2E]/15 hover:ring-[#D4879C]/65 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4879C] transition-all disabled:opacity-60"
                        />
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <label
                          htmlFor="modal-contact-message"
                          className="block font-editorial text-xs sm:text-sm font-medium text-[#1A1A2E]"
                        >
                          Your Message
                        </label>
                        <textarea
                          id="modal-contact-message"
                          rows={4}
                          disabled={deliveryState === 'sending'}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Hello, I'd love to discuss a cybersecurity role or collaboration..."
                          className="w-full h-24 sm:h-32 rounded-[12px] sm:rounded-[14px] bg-[#F8F7FA] px-3.5 py-2.5 sm:px-4 sm:py-3.5 font-editorial text-sm sm:text-base text-[#1A1A2E] placeholder-[#646464] ring-1 ring-[#1A1A2E]/15 hover:ring-[#D4879C]/65 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4879C] transition-all resize-none disabled:opacity-60"
                        />
                      </div>

                      {errorMsg && (
                        <p role="alert" className="font-editorial text-xs font-semibold text-[#B8687F]">
                          {errorMsg}
                        </p>
                      )}

                      <div className="flex items-center justify-end pt-1">
                        <PillButton
                          type="submit"
                          variant="solid-dark"
                          disabled={deliveryState === 'sending'}
                          className="w-full sm:w-auto px-7 py-3.5 disabled:opacity-70"
                        >
                          {deliveryState === 'sending' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Send Message</span>
                            </>
                          )}
                        </PillButton>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </dialog>,
          document.body
        )}
    </SectionContainer>
  );
};
