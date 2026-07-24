import { createClient } from '@/lib/supabase/server'
import SubirDocumento from './SubirDocumento'

const etiquetaEstado: Record<string, string> = {
  pendiente: 'En revisión',
  aprobado: 'Aprobado',
  rechazado: 'Rechazado',
}

const colorEstado: Record<string, string> = {
  pendiente: 'bg-amarillo-100 text-amarillo-700',
  aprobado: 'bg-green-100 text-green-700',
  rechazado: 'bg-red-100 text-red-700',
}

export default async function DocumentosTecnico() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: documentos } = await supabase
    .from('documentos')
    .select('id, tipo, estado, created_at')
    .eq('tecnico_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-semibold text-marino-800">Documentos y certificaciones</h1>
      <p className="mt-2 text-sm text-marino-500">
        Sube tu cédula de identidad y certificaciones para completar tu verificación.
      </p>

      <SubirDocumento />

      <div className="mt-8 space-y-3">
        {documentos?.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between rounded-2xl border border-marino-100 p-4">
            <span className="text-sm font-medium text-marino-800 capitalize">{doc.tipo}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${colorEstado[doc.estado]}`}>
              {etiquetaEstado[doc.estado]}
            </span>
          </div>
        ))}
        {(!documentos || documentos.length === 0) && (
          <p className="text-sm text-marino-400">Aún no has subido documentos.</p>
        )}
      </div>
    </div>
  )
}
