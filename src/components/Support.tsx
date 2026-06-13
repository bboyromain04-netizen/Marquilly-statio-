import { useState } from 'react'
import { motion } from 'framer-motion'
import FloatingOrb from './FloatingOrb'
import { FAQ_ITEMS } from '../data/content'

type Message = { role: 'user' | 'bot'; text: string }

const WELCOME =
  "bonjour ! je suis l'assistant Marquilly Studio. posez-moi une question (tarifs, délais, IA, 3D, problème technique...) et je vous réponds instantanément."

const FALLBACK =
  "je n'ai pas de réponse exacte à ça pour le moment. décrivez votre problème ou votre question par email à contact.marquillystudio@gmail.com (ou par téléphone au 07 81 70 04 54) — un membre de l'équipe vous répondra rapidement."

function findAnswer(question: string): string {
  const q = question.toLowerCase()
  let best = { score: 0, answer: FALLBACK }
  for (const item of FAQ_ITEMS) {
    const score = item.keywords.reduce((acc, kw) => (q.includes(kw) ? acc + 1 : acc), 0)
    if (score > best.score) {
      best = { score, answer: item.answer }
    }
  }
  return best.answer
}

export default function Support() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'bot', text: WELCOME }])
  const [input, setInput] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const question = input.trim()
    if (!question) return
    const answer = findAnswer(question)
    setMessages((prev) => [...prev, { role: 'user', text: question }, { role: 'bot', text: answer }])
    setInput('')
  }

  return (
    <section id="aide" className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      <FloatingOrb className="right-1/4 top-10 h-72 w-72 bg-brand-violet/10" duration={12} delay={1} />

      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cyan">
            assistance
          </span>
          <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl">
            une question ?{' '}
            <span className="bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
              notre IA répond
            </span>
          </h2>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            une question, un problème, un dysfonctionnement — notre assistant vous répond
            24/7. si besoin, il vous redirige vers notre équipe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-8"
        >
          <div className="flex max-h-96 flex-col gap-3 overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === 'bot'
                    ? 'self-start bg-white/[0.05] text-white/80'
                    : 'self-end bg-gradient-to-r from-brand-violet to-brand-cyan text-white'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ex : quels sont vos tarifs ?"
              className="flex-1 rounded-full border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand-cyan/60 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
            >
              envoyer
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {['Quels sont vos tarifs ?', 'Quels sont les délais ?', "J'ai un problème technique"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    const answer = findAnswer(suggestion)
                    setMessages((prev) => [...prev, { role: 'user', text: suggestion }, { role: 'bot', text: answer }])
                  }}
                  className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/60 transition-colors hover:border-white/30 hover:text-white"
                >
                  {suggestion}
                </button>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
