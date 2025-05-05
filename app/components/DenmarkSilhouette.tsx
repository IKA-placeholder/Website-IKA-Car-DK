'use client';

import SVGComponent from "./denmark.js";

export default function DenmarkSilhouette() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <SVGComponent
        width="100vw"
        height="100vh"
        className="w-full h-full absolute left-0 top-0 opacity-[0.08]"
        style={{ position: 'absolute', left: 0, top: 0, width: '100vw', height: '100vh', opacity: 0.08 }}
      />
      <div className="absolute bottom-2 right-2 text-blue-500 text-xs font-mono opacity-50">
        Denmark Silhouette Active
      </div>
    </div>
  );
}
