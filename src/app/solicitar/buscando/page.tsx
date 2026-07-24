'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Buscando() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const solicitudId = searchParams.get('id')
  const trabajoId = searchParams.get('trabajoId')
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((s) => s + 1)
    }, 1000)

    const timeout = setTimeout(() => {
      if (trabajoId) {
        router.push(`/solicitar/encontrado?trabajoId=${trabajoId}`)
      } else {
        router.push(`/solicitar/sin-tecnico?id=${solicitudId}`)
      }
    }, 4000)

    return () => {
      clearInterval(intervalo)
      clearTimeout(timeout)
    }
  }, [router, solicitudId, trabajoId])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute h-24 w-24 animate-ping rounded-full bg-amarillo-400 opacity-30" />
        <span className="absolute h-16 w-16 animate-ping rounded-full bg-amarillo-500 opacity-40 [animation-delay:0.3s]" />
        <span className="relative h-8 w-8 rounded-full bg-marino-800" />
      </div>

      <h1 className="mt-10 text-2xl font-semibold text-marino-800 sm:text-3xl">
        Estamos buscando el mejor técnico disponible...
      </h1>
      <p className="mt-3 text-marino-500">
        Esto puede tomar unos segundos, no cierres esta pantalla.
      </p>
    </main>
  )
}
