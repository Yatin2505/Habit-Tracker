import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">404</p>
      <h2 className="mt-4 text-4xl font-semibold text-white">Page not found</h2>
      <p className="mt-2 max-w-md text-zinc-400">The route you are looking for doesn’t exist or may have moved.</p>
      <Link to="/" className="mt-6 block">
        <Button>Return home</Button>
      </Link>
    </div>
  )
}
