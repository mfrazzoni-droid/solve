'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BotonAceptar({ trabajoId }: { trabajoId: string }) {
  const [confirmado, setConfirmado] = useState(false)
  const router = useRouter()

  function confirmar() {
    setConfirmado(true)
    router.push(`/solicitar/confirmando?trabajoId=${trabajoId}`)
  }

  if (confirmado) {
    return <p className="mt-8 text-marino-800">Redirigiendo...</p>
  }

  return (
    <button
      onClick={confirmar}
      className="mt-8 w-full max-w-sm rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700"
    >
      Aceptar servicio
    </button>
  )
}
