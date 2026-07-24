'use client'

export default function BotonContactar({ telefono }: { telefono: string | null }) {
  if (!telefono) {
    return (
      <p className="mt-8 text-sm text-marino-500">
        Pronto te contactaremos con los datos del técnico.
      </p>
    )
  }

  const telefonoLimpio = telefono.replace(/\D/g, '')
  const enlaceWhatsapp = `https://wa.me/${telefonoLimpio}`

  return (
    <a
      href={enlaceWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700"
    >
      Contactar por WhatsApp
    </a>
  )
}
