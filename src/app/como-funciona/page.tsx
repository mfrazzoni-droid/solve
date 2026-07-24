import Image from 'next/image'
import Link from 'next/link'

const pasos = [
  {
    numero: '01',
    titulo: 'Cuéntanos qué pasó',
    descripcion: 'Selecciona el tipo de problema, descríbelo y agrega fotos si quieres.',
  },
  {
    numero: '02',
    titulo: 'Te asignamos un técnico',
    descripcion: 'Buscamos al técnico verificado más cercano y disponible para tu emergencia.',
  },
  {
    numero: '03',
    titulo: 'Confirma y listo',
    descripcion: 'Revisa el perfil, la calificación y el precio estimado antes de aceptar.',
  },
]

export default function ComoFunciona() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/">
          <Image src="/logo.png" alt="SOLVE" width={140} height={40} priority className="h-16 w-auto" />
        </Link>
        <Link
          href="/solicitar"
          className="rounded-full bg-marino-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-marino-700"
        >
          Solicitar ayuda
        </Link>
      </nav>

      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <h1 className="text-center text-3xl font-semibold text-marino-800 sm:text-5xl">
          Cómo funciona
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-marino-500">
          Pedir un técnico verificado es tan fácil como pedir un auto.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {pasos.map((paso) => (
            <div key={paso.numero} className="flex flex-col items-start">
              <span className="text-sm font-semibold text-amarillo-600">
                {paso.numero}
              </span>
              <h2 className="mt-3 text-xl font-semibold text-marino-800">
                {paso.titulo}
              </h2>
              <p className="mt-2 text-marino-500">{paso.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/solicitar"
            className="rounded-full bg-marino-800 px-8 py-4 text-base font-medium text-white transition hover:bg-marino-700"
          >
            Solicitar ayuda
          </Link>
        </div>
      </section>
    </main>
  )
}
