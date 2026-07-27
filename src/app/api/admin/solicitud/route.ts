import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

async function verificarAdmin() {
  const supabaseAuth = await createClient()
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) return false
  const { data: perfil } = await supabaseAuth.from('profiles').select('role').eq('id', user.id).single()
  return perfil?.role === 'admin'
}

export async function PATCH(request: NextRequest) {
  if (!(await verificarAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { id, estado } = await request.json()
  const supabaseAdmin = createAdminClient()
  const { error } = await supabaseAdmin.from('solicitudes').update({ estado }).eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: NextRequest) {
  if (!(await verificarAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const { id } = await request.json()
  const supabaseAdmin = createAdminClient()
  const { error } = await supabaseAdmin.from('solicitudes').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
