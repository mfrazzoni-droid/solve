'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SubirDocumento() {
  const [tipo, setTipo] = useState('identidad')
  const [archivo, setArchivo] = useState<File | null>(null)
  const [subiendo, setSubiendo] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function subir(e: React.FormEvent) {
    e.preventDefault()
    if (!archivo) return

    setSubiendo(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const ruta = `${user!.id}/${Date.now()}-${archivo.name}`
    const { error: errorSubida } = await supabase.storage
      .from('documentos-tecnicos')
      .upload(ruta, archivo)

    if (!errorSubida) {
      await supabase.from('documentos').insert({
        tecnico_id: user!.id,
        tipo,
        url: ruta,
        estado: 'pendiente',
      })
      setArchivo(null)
      router.refresh()
    }

    setSubiendo(false)
  }

  return (
    <form onSubmit={subir} className="mt-6 flex flex-col gap-3 rounded-2xl border border-marino-100 p-5 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="text-sm text-marino-500">Tipo de documento</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-marino-100 px-4 py-3 text-marino-800 outline-none"
        >
          <option value="identidad">Cédula de identidad</option>
          <option value="certificacion">Certificación</option>
        </select>
      </div>
      <div className="flex-1">
        <label className="text-sm text-marino-500">Archivo</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
          className="mt-1 w-full text-sm text-marino-800"
        />
      </div>
      <button
        type="submit"
        disabled={!archivo || subiendo}
        className="rounded-full bg-marino-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-marino-700 disabled:opacity-50"
      >
        {subiendo ? 'Subiendo...' : 'Subir'}
      </button>
    </form>
  )
}
