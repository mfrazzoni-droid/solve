'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Tecnico = {
  id: string
  comuna: string | null
  horario: string | null
  calificacion_promedio: number
  cantidad_trabajos: number
  profiles: { nombre: string; telefono: string | null } | null
}

export default function TecnicosDisponibles() {
  const searchParams = useSearchParams()
  const solicitudId = searchParams.get('solicitudId')
  const especialidadSlug = searchParams.get('especialidad')

  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [cargando, setCargando] = useState(true)
  const [filtroComuna, setFiltroComuna] = useState('')
  const [contactado, setContactado] = useState<string | null>(null)
  const [solicitud, setSolicitud] = useState<{ descripcion: string; direccion_texto: string | null; nombre_contacto: string | null } | null>(null)

  const supabase = createClient()

  useEffect(() => {
    async function cargar() {
      if (solicitudId) {
        const { data: datosSolicitud } = await supabase
          .from('solicitudes')
          .select('descripcion, direccion_texto, nombre_contacto')
          .eq('id', solicitudId)
          .single()
        if (datosSolicitud) setSolicitud(datosSolicitud)
      }

      if (!especialidadSlug) {
        setCargando(false)
        return
      }

      const { data: especialidad } = await supabase
        .from('especialidades')
        .select('id')
        .eq('slug', especialidadSlug)
        .single()

      if (!especialidad) {
        setCargando(false)
        return
      }

      const { data } = await supabase
        .from('tecnico_especialidades')
        .select('tecnicos!inner(id, comuna, horario, calificacion_promedio, cantidad_trabajos, verificado, estado, profiles(nombre, telefono))')
        .eq('especialidad_id', especialidad.id)
        .eq('tecnicos.verificado', true)
        .eq('tecnicos.estado', 'disponible')

      const lista = (data ?? [])
        .map((d: any) => d.tecnicos)
        .sort((a: Tecnico, b: Tecnico) => b.calificacion_promedio - a.calificacion_promedio)

      setTecnicos(lista)
      setCargando(false)
    }
    cargar()
  }, [especialidadSlug, supabase])

  async function contactar(tecnico: Tecnico) {
    if (!solicitudId) return

    await supabase.from('trabajos').insert({
      solicitud_id: solicitudId,
      tecnico_id: tecnico.id,
      estado: 'pendiente',
    })

    setContactado(tecnico.id)

    if (!tecnico.profiles?.telefono) return

    const mensaje = `Hola ${tecnico.profiles?.nombre ?? ''}, te contacto desde SOLVE.

Problema: ${solicitud?.descripcion ?? 'No especificado'}
Dirección: ${solicitud?.direccion_texto ?? 'No especificada'}
Contacto: ${solicitud?.nombre_contacto ?? ''}`

    const telefonoLimpio = tecnico.profiles.telefono.replace(/\D/g, '')
    window.open(`https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`, '_blank')
  }

  const tecnicosFiltrados = tecnicos.filter((t) =>
    filtroComuna ? t.comuna?.toLowerCase().includes(filtroComuna.toLowerCase()) : true
  )

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-marino-800 sm:text-3xl">
          Técnicos disponibles
        </h1>
        <p className="mt-2 text-marino-500">
          Elige el técnico que prefieras y contáctalo directo. Le llegará el resumen de tu solicitud.
        </p>

        <input
          type="text"
          value={filtroComuna}
          onChange={(e) => setFiltroComuna(e.target.value)}
          placeholder="Filtrar por comuna..."
          className="mt-6 w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none transition focus:border-amarillo-500"
        />

        {cargando && <p className="mt-8 text-sm text-marino-400">Cargando técnicos...</p>}

        {!cargando && tecnicosFiltrados.length === 0 && (
          <p className="mt-8 text-sm text-marino-400">
            No encontramos técnicos disponibles con ese filtro por ahora.
          </p>
        )}

        <div className="mt-6 space-y-4">
          {tecnicosFiltrados.map((tecnico) => (
            <div key={tecnico.id} className="rounded-2xl border border-marino-100 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-marino-100 text-xl font-semibold text-marino-800">
                  {tecnico.profiles?.nombre?.[0]?.toUpperCase() ?? 'T'}
                </div>
                <div>
                  <p className="font-medium text-marino-800">{tecnico.profiles?.nombre}</p>
                  <p className="text-sm text-marino-500">
                    ⭐ {tecnico.calificacion_promedio} · {tecnico.cantidad_trabajos} trabajos
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-marino-500">
                {tecnico.comuna && <span>📍 {tecnico.comuna}</span>}
                {tecnico.horario && <span>🕒 {tecnico.horario}</span>}
              </div>
              <button
                onClick={() => contactar(tecnico)}
                className="mt-4 w-full rounded-full bg-marino-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-marino-700"
              >
                {contactado === tecnico.id ? 'Contactado ✓' : 'Contactar por WhatsApp'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
