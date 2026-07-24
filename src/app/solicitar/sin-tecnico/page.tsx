import Link from 'next/link'

export default function SinTecnico() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-2xl font-semibold text-marino-800">
        No encontramos un técnico disponible
      </h1>
      <p className="mt-3 max-w-md text-marino-500">
        Por el momento no hay técnicos disponibles para tu tipo de servicio. Guardamos tu solicitud y te contactaremos apenas haya uno disponible.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700"
      >
        Volver al inicio
      </Link>
    </main>
  )
}
