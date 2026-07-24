import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const formData = await request.formData()

  const especialidadSlug = formData.get('especialidad') as string
  const descripcion = formData.get('descripcion') as string
  const direccion = formData.get('direccion') as string
  const nombre = formData.get('nombre') as string
  const telefono = formData.get('telefono') as string
  const clienteId = formData.get('clienteId') as string | null

  const { data: especialidad, error: errorEspecialidad } = await supabase
    .from('especialidades')
    .select('id')
    .eq('slug', especialidadSlug)
    .single()

  if (errorEspecialidad || !especialidad) {
    console.error('Error especialidad:', errorEspecialidad)
    return NextResponse.json({ error: errorEspecialidad?.message || 'Especialidad no válida' }, { status: 400 })
  }

  const { data: solicitud, error: errorSolicitud } = await supabase
    .from('solicitudes')
    .insert({
      especialidad_id: especialidad.id,
      descripcion,
      direccion_texto: direccion,
      nombre_contacto: nombre,
      telefono_contacto: telefono,
      estado: 'buscando',
      cliente_id: clienteId || null,
    })
    .select()
    .single()

  if (errorSolicitud || !solicitud) {
    console.error('Error solicitud:', errorSolicitud)
    return NextResponse.json({ error: errorSolicitud?.message || 'Error desconocido' }, { status: 500 })
  }

  return NextResponse.json({ solicitudId: solicitud.id, especialidadSlug })
}
