const number = import.meta.env.VITE_WHATSAPP_NUMBER?.trim() ?? ''
export const hasWhatsApp = /^[1-9][0-9]{7,14}$/.test(number)

export function whatsappLink(message) {
  return hasWhatsApp
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : ''
}
