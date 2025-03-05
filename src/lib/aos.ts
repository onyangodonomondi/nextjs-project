'use client';

export const initAOS = () => {
  if (typeof window !== 'undefined') {
    import('aos').then((AOS) => {
      AOS.default.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out',
      });
    });
  }
}; 