import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function PostulacionesAdmin() {
  const supabase = createAdminClient()

  const { data: postulaciones, error } = await supabase
    .from('postulaciones_tecnico')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error postulaciones:', error)
  }

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

        <div className="mt-6 space-y-3">
          {postulaciones?.map((p) => (
            <div key={p.id} className="rounded-2xl border border-marino-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-marino-800">{p.nombre}</p>
                  <p className="mt-1 text-sm text-marino-500">
                    {p.telefono} {p.email ? `· ${p.email}` : ''} · Vive en {p.comuna}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-marino-100 px-3 py-1 text-xs font-medium text-marino-800">
                    {p.especialidad}
                  </span>
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
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
