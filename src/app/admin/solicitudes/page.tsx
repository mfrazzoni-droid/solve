import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import AccionesSolicitud from './AccionesSolicitud'

export const dynamic = 'force-dynamic'

export default async function SolicitudesAdmin() {
  const supabase = createAdminClient()

  const { data: solicitudes } = await supabase
    .from('solicitudes')
    .select('id, descripcion, direccion_texto, nombre_contacto, telefono_contacto, created_at, especialidades(nombre), trabajos(id, tecnicos(profiles(nombre)))')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-marino-100 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-6">
          <Link href="/admin" className="text-lg font-semibold text-marino-800">
            SOLVE Admin
          </Link>
          <Link href="/admin/solicitudes" className="text-sm font-medium text-marino-800">
            Solicitudes
          </Link>
          <Link href="/admin/tecnicos" className="text-sm font-medium text-marino-500 hover:text-marino-800">
            Técnicos
          </Link>
          <Link href="/admin/postulaciones" className="text-sm font-medium text-marino-500 hover:text-marino-800">
            Postulaciones
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-marino-800">
          Solicitudes {solicitudes ? `(${solicitudes.length})` : ''}
        </h1>

        <div className="mt-6 space-y-3">
          {solicitudes?.map((s: any) => (
            <div key={s.id} className="rounded-2xl border border-marino-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full bg-marino-100 px-3 py-1 text-xs font-medium text-marino-800">
                    {s.especialidades?.nombre}
                  </span>
                  <p className="mt-2 font-medium text-marino-800">{s.descripcion}</p>
                  <p className="mt-1 text-sm text-marino-500">{s.direccion_texto}</p>
                  <p className="mt-1 text-sm text-marino-500">
                    {s.nombre_contacto} · {s.telefono_contacto}
                  </p>
                </div>
                <p className="text-xs text-marino-400">
                  {new Date(s.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {s.trabajos?.length > 0 ? (
                <div className="mt-3 border-t border-marino-100 pt-3">
                  <p className="text-xs text-marino-400">
                    Técnicos contactados ({s.trabajos.length})
                  </p>
                  <p className="mt-1 text-sm text-marino-800">
                    {s.trabajos.map((t: any) => t.tecnicos?.profiles?.nombre).join(', ')}
                  </p>
                </div>
              ) : (
                <p className="mt-3 border-t border-marino-100 pt-3 text-xs text-marino-400">
                  Sin técnicos contactados todavía
                </p>
              )}
              <AccionesSolicitud id={s.id} estado={s.estado} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
