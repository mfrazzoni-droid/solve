import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import BotonAprobar from '../BotonAprobar'

export default async function TecnicosAdmin() {
  const supabase = createAdminClient()

  const { data: tecnicos } = await supabase
    .from('tecnicos')
    .select('id, comuna, horario, estado, verificado, calificacion_promedio, created_at, profiles(nombre, email, telefono), tecnico_especialidades(especialidades(nombre)), trabajos(id)')
    .order('created_at', { ascending: false })

  const colorEstado: Record<string, string> = {
    disponible: 'bg-green-100 text-green-700',
    ocupado: 'bg-amarillo-100 text-amarillo-700',
    fuera_de_servicio: 'bg-marino-100 text-marino-500',
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
          <Link href="/admin/tecnicos" className="text-sm font-medium text-marino-800">
            Técnicos
          </Link>
          <Link href="/admin/postulaciones" className="text-sm font-medium text-marino-500 hover:text-marino-800">
            Postulaciones
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-marino-800">
          Técnicos {tecnicos ? `(${tecnicos.length})` : ''}
        </h1>

        <div className="mt-6 space-y-3">
          {tecnicos?.map((t: any) => (
            <div key={t.id} className="rounded-2xl border border-marino-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-marino-800">{t.profiles?.nombre}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colorEstado[t.estado]}`}>
                      {t.estado}
                    </span>
                    {!t.verificado && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                        Sin verificar
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-marino-500">
                    {t.profiles?.email} · {t.profiles?.telefono} · {t.comuna}
                  </p>
                  <p className="mt-1 text-sm text-marino-500">
                    {t.tecnico_especialidades?.map((e: any) => e.especialidades?.nombre).join(', ')}
                  </p>
                  <p className="mt-1 text-xs text-marino-400">
                    ⭐ {t.calificacion_promedio ?? 0} · {t.trabajos?.length ?? 0} leads recibidos
                  </p>
                </div>
                {!t.verificado && <BotonAprobar tecnicoId={t.id} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
