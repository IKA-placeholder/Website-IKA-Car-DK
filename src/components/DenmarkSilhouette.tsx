import DenmarkSvg from "@/components/denmark";

export default function DenmarkSilhouette() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <DenmarkSvg
        width="100vw"
        height="100vh"
        className="absolute top-0 left-0 h-full w-full opacity-[0.12] dark:opacity-[0.25]"
      />

      <div className="absolute right-2 bottom-2 font-mono text-xs text-blue-500 opacity-50">
        {/* removed */}
      </div>
    </div>
  );
}
