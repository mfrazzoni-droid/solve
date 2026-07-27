import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import AccionesPostulacion from './AccionesPostulacion'

export const dynamic = 'force-dynamic'

const etiquetaEstado: Record<string, string> = {
  pendiente: 'Pendiente',
  contactado: 'Contactado',
  descartado: 'Descartado',
}

const colorEstado: Record<string, string> = {
  pendiente: 'bg-amarillo-100 text-amarillo-700',
  contactado: 'bg-green-100 text-green-700',
  descartado: 'bg-marino-100 text-marino-500',
}

export default async function PostulacionesAdmin() {
  const supabase = createAdminClient()

  const { data: postulaciones } = await supabase
    .from('postulaciones_tecnico')
    .select('*')
    .order('created_at', { ascending: false })

  const grupos: Record<string, typeof postulaciones> = {}
  postulaciones?.forEach((p) => {
    const key = p.especialidad || 'Otro'
    if (!grupos[key]) grupos[key] = []
    grupos[key]!.push(p)
  })

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-marino-100 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-6">
          <Link href="/admin" className="text-lg font-semibold text-marino-800">
            SOLVE Admin
          </Link>
          <Link href="/admin/solicitudes" className="text-sm font-medium text-marino-500 hover:text-marino-800">
            Solicitudes
          </Link>
          <Link href="/admin/tecnicos" className="text-sm font-medium text-marino-500 hover:text-marino-800">
            Técnicos
          </Link>
          <Link href="/admin/postulaciones" className="text-sm font-medium text-marino-800">
            Postulaciones
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-marino-800">
          Postulaciones {postulaciones ? `(${postulaciones.length})` : ''}
        </h1>

        {(!postulaciones || postulaciones.length === 0) && (
          <p className="mt-4 text-sm text-marino-400">No hay postulaciones todavía.</p>
        )}

        {Object.entries(grupos).map(([especialidad, lista]) => (
          <div key={especialidad} className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-marino-400">
              {especialidad} ({lista!.length})
            </h2>
            <div className="mt-3 space-y-3">
              {lista!.map((p) => (
                <div key={p.id} className="rounded-2xl border border-marino-100 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-marino-800">{p.nombre}</p>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colorEstado[p.estado]}`}>
                          {etiquetaEstado[p.estado]}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-marino-500">
                        {p.telefono} {p.email ? `· ${p.email}` : ''} · Vive en {p.comuna}
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-marino-500">
                        <p>Experiencia: {p.anios_experiencia ?? '—'} años</p>
                        <p>Vehículo propio: {p.tiene_vehiculo ? 'Sí' : 'No'}</p>
                        <p>Trabaja en: {p.comunas_trabajo ?? '—'}</p>
                        <p>Horario: {p.horario_trabajo ?? '—'}</p>
                        <p>Trabajos/semana: {p.trabajos_por_semana ?? '—'}</p>
                      </div>
                      {p.como_consigue_clientes && (
                        <p className="mt-2 text-sm text-marino-500">
                          Consigue clientes vía: {p.como_consigue_clientes}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-marino-400">
                      {new Date(p.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <AccionesPostulacion id={p.id} estado={p.estado} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
