'use client';

import Image from 'next/image';
import { Typography } from '@/ui/typography';
import { usePathname } from 'next/navigation';

const authImages = {
  '/auth/sign-up': {
    imageSrc: '/images/AuthPagePhoto_Signup.png',
    alt: 'Happy couple in their new home',
  },
  '/auth/sign-in': {
    imageSrc: '/images/AuthPagePhoto_login.png',
    alt: 'Happy couple in their new home',
  },
  '/auth/verify-email': {
    imageSrc: '/images/AuthPagePhoto_EmailVerif.png',
    alt: 'House architectural plan on table',
  },
  
  '/auth/forgot-password': {
    imageSrc: '/images/AuthPagePhoto_forgot_password.png',
    alt: 'House architectural plan on table',
  },

  default: {
    imageSrc: '/images/AuthPagePhoto.png',
    alt: 'Happy couple in their new home',
  },
} as const;

export function AuthImageSection() {
  const pathname = usePathname();
  const imageConfig = authImages[pathname as keyof typeof authImages] || authImages.default;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src={imageConfig.imageSrc}
        alt={imageConfig.alt}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-b from-transparent via-primary/80 to-primary/96 p-8 ">
        <Typography
          variant="display-md"
          color="white"
          fontWeight="bold"
          className="leading-tight font-agile"
        >
          Rent Smarter.
          <br /> 
          Sell Better. 
          <br />
          Live Easier.
        </Typography>
      </div> 
    </div> 
  ); 
}

