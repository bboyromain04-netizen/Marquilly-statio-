import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CalendarCheck2, CheckCircle2, Loader2, Send } from 'lucide-react'
import { SERVICES, SOCIALS, WEB3FORMS_ACCESS_KEY } from '../data/content'

type Status = 'idle' | 'loading' | 'success' | 'error'

function buildCalendarLink(fullName: string, servicesLabel: string, eventDate: string, message: string) {
  const title = `Bilou — ${servicesLabel || 'demande de prestation'} pour ${fullName}`
  const details = `Demande envoyée via le site de Bilou.\n\nPrestation(s) demandée(s) : ${
    servicesLabel || 'non précisé'
  }\n\nMessage :\n${message}`

  const params = new URLSearchParams({ action: 'TEMPLATE', text: title, details })

  if (eventDate) {
    const compact = eventDate.replace(/-/g, '')
    params.set('dates', `${compact}/${compact}`)
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export default function BookingForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title],
    )
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const servicesLabel = selectedServices.join(', ')
    const calendarLink = buildCalendarLink(fullName, servicesLabel, eventDate, message)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nouvelle demande de prestation — ${fullName}`,
          from_name: fullName,
          email,
          téléphone: phone || 'non précisé',
          "date de l'événement": eventDate || 'non précisée',
          'prestations souhaitées': servicesLabel || 'non précisé',
          message,
          'ajouter à mon agenda (clique sur le lien)': calendarLink,
        }),
      })

      if (!response.ok) throw new Error('submit failed')

      setStatus('success')
      setFullName('')
      setEmail('')
      setPhone('')
      setEventDate('')
      setSelectedServices([])
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="booking" className="relative bg-black px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-bilou-yellow">
            réservation
          </span>
          <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl md:text-6xl">
            demande de <span className="text-gradient">prestation</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-neutral-400 sm:text-base">
            sélectionne le ou les types de prestations qui t'intéressent, décris
            ton projet et envoie ta demande en un clic.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-neutral-400">
                nom complet
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-bilou-yellow"
                placeholder="ton nom"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-400">
                email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-bilou-yellow"
                placeholder="ton@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-xs uppercase tracking-widest text-neutral-400">
                téléphone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-bilou-yellow"
                placeholder="06 12 34 56 78"
              />
            </div>
            <div>
              <label htmlFor="eventDate" className="text-xs uppercase tracking-widest text-neutral-400">
                date souhaitée
              </label>
              <input
                id="eventDate"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bilou-yellow"
              />
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400">prestations souhaitées</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {SERVICES.map((service) => {
                const selected = selectedServices.includes(service.title)
                return (
                  <button
                    key={service.title}
                    type="button"
                    onClick={() => toggleService(service.title)}
                    aria-pressed={selected}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                      selected
                        ? 'bg-bilou-yellow text-black'
                        : 'border border-white/10 text-neutral-300 hover:border-bilou-yellow hover:text-bilou-yellow'
                    }`}
                  >
                    {service.title}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="text-xs uppercase tracking-widest text-neutral-400">
              décris ton projet ou ta demande
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-bilou-yellow"
              placeholder="lieu, type d'événement, durée, public, budget..."
            />
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-bilou-yellow to-bilou-orange px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              envoyer ma demande
            </button>

            {status === 'success' && (
              <p className="flex items-center gap-2 text-sm text-bilou-yellow">
                <CheckCircle2 size={18} />
                merci ! ta demande a bien été envoyée, réponse rapide garantie.
              </p>
            )}

            {status === 'error' && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={18} />
                erreur d'envoi — contacte-moi directement à {SOCIALS.email}
              </p>
            )}
          </div>

          <p className="flex items-center gap-2 text-xs text-neutral-500">
            <CalendarCheck2 size={14} />
            ta demande est envoyée par email avec un lien pour l'ajouter directement à l'agenda.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
