export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
    </div>
  )
}
