export function ImageDebug({ src, alt }: { src: string; alt: string }) {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-1 break-all">
      <p>Src: {src}</p>
      <p>Alt: {alt}</p>
    </div>
  );
} 