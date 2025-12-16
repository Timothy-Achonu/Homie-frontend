import localFont from 'next/font/local';

// agile Font Setup
export const agile = localFont({
  src: [
    {
      path: '../../public/fonts/agile-font/agile.otf',
      weight: '700',
      style: 'normal',
    },

    {
      path: '../../public/fonts/agile-font/agile.ttf',
      weight: '600',
      style: 'normal',
    },
  
  ],
  display: 'swap',
  variable: '--font-agile',
});