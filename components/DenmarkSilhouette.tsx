import DenmarkSvg from '@components/denmark'

export default function DenmarkSilhouette() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <DenmarkSvg
        width="100vw"
        height="100vh"
        className="absolute left-0 top-0 h-full w-full opacity-[0.05]"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          opacity: 0.05,
        }}
      />

      <div className="absolute bottom-2 right-2 text-blue-500 text-xs font-mono opacity-50">
        {/* removed */}
      </div>
    </div>
  )
}
