export default function PreloadResources() {
  return (
    <>
      <link 
        rel="preload" 
        href="/images/hero/2.svg" 
        as="image" 
      />
      {/* If you have a specific font file, use it here otherwise remove this */}
      {/* <link 
        rel="preload" 
        href="/fonts/inter.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      /> */}
    </>
  );
} 