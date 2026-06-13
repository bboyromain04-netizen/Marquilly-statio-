// Configuration EmailJS (https://www.emailjs.com) — service gratuit jusqu'à 200 emails/mois.
//
// Pour activer l'envoi automatique des demandes de devis :
// 1. Créez un compte sur https://www.emailjs.com et connectez votre adresse
//    contact.marquillystudio@gmail.com comme « Email Service » → récupérez le SERVICE_ID.
// 2. Créez un premier template (notification studio) envoyé À VOUS, qui utilise les
//    variables {{client_name}}, {{client_email}}, {{client_phone}} et {{summary}}
//    (le récapitulatif complet du questionnaire) → récupérez le TEMPLATE_ID_STUDIO.
// 3. Créez un second template (réponse automatique au client) envoyé À {{to_email}},
//    qui reprend {{client_name}}, {{summary}} et un lien vers l'offre commerciale via
//    {{pdf_link}} → récupérez le TEMPLATE_ID_CLIENT.
// 4. Dans EmailJS, récupérez votre « Public Key » (Account > General).
// 5. Remplacez les 4 valeurs ci-dessous par les vôtres.
//
// Tant que ces valeurs ne sont pas renseignées, le formulaire bascule automatiquement
// sur l'ouverture d'un brouillon d'email (mailto) à la place de l'envoi automatique.

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',
  TEMPLATE_ID_STUDIO: 'YOUR_TEMPLATE_ID_STUDIO',
  TEMPLATE_ID_CLIENT: 'YOUR_TEMPLATE_ID_CLIENT',
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
}

export const PDF_URL =
  'https://bboyromain04-netizen.github.io/Marquilly-statio-/marquilly-studio/offre-commerciale-marquilly-studio.pdf'

export function isEmailConfigured(): boolean {
  return Object.values(EMAILJS_CONFIG).every((value) => !value.startsWith('YOUR_'))
}
