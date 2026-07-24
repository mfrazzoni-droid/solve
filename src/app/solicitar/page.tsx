'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export type DatosSolicitud = {
  especialidad: string
  descripcion: string
  direccion: string
  nombre: string
  telefono: string
}

const especialidades = [
  { id: 'gasfiter', nombre: 'Gasfíter', icono: '🔧' },
  { id: 'electricista', nombre: 'Electricista', icono: '⚡' },
  { id: 'cerrajero', nombre: 'Cerrajero', icono: '🔑' },
  { id: 'electrodomesticos', nombre: 'Electrodomésticos', icono: '⚙️' },
  { id: 'aire_acondicionado', nombre: 'Aire acondicionado', icono: '❄️' },
  { id: 'instalaciones', nombre: 'Instalaciones', icono: '🛠️' },
  { id: 'otro', nombre: 'Otro', icono: '❓' },
]

export default function Solicitar() {
  const [paso, setPaso] = useState(1)
  const [cargandoSesion, setCargandoSesion] = useState(true)
  const [tieneSesion, setTieneSesion] = useState(false)
  const [datos, setDatos] = useState<DatosSolicitud>({
    especialidad: '',
    descripcion: '',
    direccion: '',
    nombre: '',
    telefono: '',
  })

  useEffect(() => {
    async function verificarSesion() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: perfil } = await supabase
          .from('profiles')
          .select('nombre, telefono')
          .eq('id', user.id)
          .single()

        setTieneSesion(true)
        setDatos((d) => ({
          ...d,
          nombre: perfil?.nombre ?? '',
          telefono: perfil?.telefono ?? '',
        }))
      }
      setCargandoSesion(false)
    }
    verificarSesion()
  }, [])

  function seleccionarEspecialidad(id: string) {
    setDatos({ ...datos, especialidad: id })
    setPaso(2)
  }

  function irADireccionSiguiente() {
    // Si ya tiene sesión (y por lo tanto nombre/teléfono), nos saltamos el paso de contacto
    setPaso(tieneSesion ? 5 : 4)
  }

  const totalPasos = tieneSesion ? 3 : 4

  if (cargandoSesion) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-marino-400">Cargando...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto mb-6 flex max-w-2xl items-center justify-between">
        <Link href="/" className="text-sm font-medium text-marino-500 hover:text-marino-800">
          ← SOLVE
        </Link>
        {tieneSesion ? (
          <Link href="/cliente/historial" className="text-sm font-medium text-marino-500 hover:text-marino-800">
            Mi cuenta
          </Link>
        ) : (
          <Link href="/cliente/login?redirect=/solicitar" className="text-sm font-medium text-marino-500 hover:text-marino-800">
            Iniciar sesión
          </Link>
        )}
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-2">
          {Array.from({ length: totalPasos }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i + 1 <= (paso === 5 ? totalPasos : paso) ? 'bg-amarillo-500' : 'bg-marino-100'
              }`}
            />
          ))}
        </div>

        {paso === 1 && (
          <div>
            <h1 className="text-2xl font-semibold text-marino-800 sm:text-3xl">
              ¿Qué necesitas?
            </h1>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {especialidades.map((esp) => (
                <button
                  key={esp.id}
                  onClick={() => seleccionarEspecialidad(esp.id)}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-marino-100 px-4 py-6 text-center transition hover:border-amarillo-500 hover:bg-amarillo-50"
                >
                  <span className="text-3xl">{esp.icono}</span>
                  <span className="text-sm font-medium text-marino-800">
                    {esp.nombre}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {paso === 2 && (
          <div>
            <button
              onClick={() => setPaso(1)}
              className="mb-6 text-sm font-medium text-marino-500 hover:text-marino-800"
            >
              ← Volver
            </button>
            <h1 className="text-2xl font-semibold text-marino-800 sm:text-3xl">
              Describe el problema
            </h1>
            <p className="mt-2 text-marino-500">
              Cuéntanos qué pasó, mientras más detalle nos des, mejor te podremos ayudar.
            </p>
            <textarea
              value={datos.descripcion}
              onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
              rows={6}
              placeholder="Ej: se rompió una llave del baño y no deja de gotear agua..."
              className="mt-6 w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
            />
            <button
              onClick={() => setPaso(3)}
              disabled={datos.descripcion.trim().length === 0}
              className="mt-8 w-full rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuar
            </button>
          </div>
        )}

        {paso === 3 && (
          <div>
            <button
              onClick={() => setPaso(2)}
              className="mb-6 text-sm font-medium text-marino-500 hover:text-marino-800"
            >
              ← Volver
            </button>
            <h1 className="text-2xl font-semibold text-marino-800 sm:text-3xl">
              ¿Cuál es la dirección?
            </h1>
            <p className="mt-2 text-marino-500">
              Ingresa la dirección donde necesitas el servicio.
            </p>
            <input
              type="text"
              value={datos.direccion}
              onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
              placeholder="Ej: Av. Providencia 1234, depto 56, Providencia"
              className="mt-6 w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
            />
            <p className="mt-2 text-xs text-marino-400">
              Próximamente podrás seleccionar tu ubicación directamente en un mapa.
            </p>
            <button
              onClick={irADireccionSiguiente}
              disabled={datos.direccion.trim().length === 0}
              className="mt-8 w-full rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuar
            </button>
          </div>
        )}

        {paso === 4 && (
          <div>
            <button
              onClick={() => setPaso(3)}
              className="mb-6 text-sm font-medium text-marino-500 hover:text-marino-800"
            >
              ← Volver
            </button>
            <h1 className="text-2xl font-semibold text-marino-800 sm:text-3xl">
              Tus datos de contacto
            </h1>
            <p className="mt-2 text-marino-500">
              Para que el técnico pueda contactarte y confirmar la visita.
            </p>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                value={datos.nombre}
                onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                placeholder="Nombre completo"
                className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
              />
              <input
                type="tel"
                value={datos.telefono}
                onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
                placeholder="Teléfono (ej: +56 9 1234 5678)"
                className="w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
              />
            </div>

            <button
              onClick={() => setPaso(5)}
              disabled={
                datos.nombre.trim().length === 0 ||
                datos.telefono.trim().length === 0
              }
              className="mt-8 w-full rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuar
            </button>
          </div>
        )}

        {paso === 5 && (
          <ResumenSolicitud
            datos={datos}
            onVolver={() => setPaso(tieneSesion ? 3 : 4)}
          />
        )}
      </div>
    </main>
  )
}

function ResumenSolicitud({
  datos,
  onVolver,
}: {
  datos: DatosSolicitud
  onVolver: () => void
}) {
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function encontrarTecnico() {
    setEnviando(true)
    setError('')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const formData = new FormData()
    formData.append('especialidad', datos.especialidad)
    formData.append('descripcion', datos.descripcion)
    formData.append('direccion', datos.direccion)
    formData.append('nombre', datos.nombre)
    formData.append('telefono', datos.telefono)
    if (user) formData.append('clienteId', user.id)

    const res = await fetch('/api/solicitudes', {
      method: 'POST',
      body: formData,
    })

    const resultado = await res.json()

    if (!res.ok) {
      setError('Hubo un problema al enviar tu solicitud. Intenta nuevamente.')
      setEnviando(false)
      return
    }

    router.push(`/solicitar/tecnicos?solicitudId=${resultado.solicitudId}&especialidad=${datos.especialidad}`)
  }

  return (
    <div>
      <button
        onClick={onVolver}
        className="mb-6 text-sm font-medium text-marino-500 hover:text-marino-800"
      >
        ← Volver
      </button>
      <h1 className="text-2xl font-semibold text-marino-800 sm:text-3xl">
        Revisa tu solicitud
      </h1>

      <div className="mt-6 space-y-3 rounded-2xl border border-marino-100 p-5">
        <p className="text-sm text-marino-500">Servicio</p>
        <p className="font-medium text-marino-800">{datos.especialidad}</p>

        <p className="mt-4 text-sm text-marino-500">Problema</p>
        <p className="font-medium text-marino-800">{datos.descripcion}</p>

        <p className="mt-4 text-sm text-marino-500">Dirección</p>
        <p className="font-medium text-marino-800">{datos.direccion}</p>

        <p className="mt-4 text-sm text-marino-500">Contacto</p>
        <p className="font-medium text-marino-800">
          {datos.nombre} · {datos.telefono}
        </p>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        onClick={encontrarTecnico}
        disabled={enviando}
        className="mt-8 w-full rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {enviando ? 'Enviando...' : 'Ver técnicos disponibles'}
      </button>
    </div>
  )
}
