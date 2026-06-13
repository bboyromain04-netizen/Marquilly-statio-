import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingOrb from './FloatingOrb'
import { DEVIS_STEPS } from '../data/content'
import { EMAILJS_CONFIG, PDF_URL, isEmailConfigured } from '../lib/emailConfig'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Devis() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')

  const current = DEVIS_STEPS[step]
  const isLast = step === DEVIS_STEPS.length - 1
  const canContinue = current.optional || (answers[current.id] ?? '').trim().length > 0

  function setAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }))
  }

  function next() {
    if (isLast) {
      sendRequest()
    } else {
      setStep((s) => s + 1)
    }
  }

  function buildSummary() {
    return DEVIS_STEPS.map((s) => `${s.question}\n${(answers[s.id] ?? '').trim() || '—'}`).join('\n\n')
  }

  function sendByMailto() {
    const summary = buildSummary()
    const subject = `Nouvelle demande de devis — ${answers.name ?? ''}`
    window.location.href = `mailto:contact.marquillystudio@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(summary)}`
    setStatus('sent')
  }

  async function sendRequest() {
    if (!isEmailConfigured()) {
      sendByMailto()
      return
    }

    setStatus('sending')
    const summary = buildSummary()
    const templateParams = {
      client_name: answers.name ?? '',
      client_email: answers.email ?? '',
      client_phone: (answers.phone ?? '').trim() || 'non renseigné',
      to_email: answers.email ?? '',
      summary,
      pdf_link: PDF_URL,
    }

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_STUDIO,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY,
      )
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_CLIENT,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY,
      )
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="devis" className="relative overflow-hidden bg-[#05050f] px-4 py-24 md:py-32">
      <FloatingOrb className="right-1/3 top-10 h-80 w-80 bg-brand-cyan/10" duration={13} />
      <FloatingOrb className="left-1/4 bottom-0 h-72 w-72 bg-brand-violet/10" duration={11} delay={1} />

      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cyan">
            votre projet
          </span>
          <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl">
            recevez un{' '}
            <span className="bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
              devis sur-mesure
            </span>
          </h2>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            2 minutes suffisent : répondez à quelques questions, nous recevons votre demande
            directement et revenons vers vous rapidement — sans engagement de votre part.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10"
        >
          {status === 'idle' || status === 'sending' || status === 'error' ? (
            <>
              <div className="mb-6 flex items-center gap-2">
                {DEVIS_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= step ? 'bg-gradient-to-r from-brand-violet to-brand-cyan' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs uppercase tracking-widest text-brand-cyan">
                    étape {step + 1} / {DEVIS_STEPS.length}
                  </p>
                  <h3 className="mt-2 text-xl font-medium text-white sm:text-2xl">
                    {current.question}
                  </h3>

                  {current.type === 'choice' ? (
                    <div className="mt-6 grid gap-3">
                      {current.options?.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setAnswer(option)}
                          className={`rounded-2xl border px-5 py-3 text-left text-sm transition-colors ${
                            answers[current.id] === option
                              ? 'border-brand-cyan/60 bg-brand-cyan/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={answers[current.id] ?? ''}
                      onChange={(e) => setAnswer(e.target.value)}
                      rows={current.id === 'description' ? 5 : 1}
                      placeholder="votre réponse…"
                      className="mt-6 w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand-cyan/60 focus:outline-none"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {status === 'error' && (
                <p className="mt-4 text-sm text-red-400">
                  l'envoi automatique a échoué.{' '}
                  <button type="button" onClick={sendByMailto} className="underline hover:text-white">
                    ouvrir un email à la place
                  </button>
                  .
                </p>
              )}

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0 || status === 'sending'}
                  className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/60 transition-colors hover:text-white disabled:opacity-0"
                >
                  retour
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!canContinue || status === 'sending'}
                  className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === 'sending' ? 'envoi…' : isLast ? 'envoyer ma demande' : 'suivant'}
                </button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <span className="text-3xl">✓</span>
              <h3 className="mt-3 text-xl font-medium text-white">demande envoyée</h3>
              {isEmailConfigured() ? (
                <p className="mt-2 text-sm text-white/60">
                  votre demande vient de nous être transmise par email, et un email vous a été
                  envoyé avec notre offre commerciale complète. nous revenons vers vous très
                  rapidement.
                </p>
              ) : (
                <p className="mt-2 text-sm text-white/60">
                  votre messagerie s'est ouverte avec un récapitulatif pré-rempli — il ne reste
                  qu'à cliquer sur « envoyer ». nous revenons vers vous très rapidement.
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
