'use client';

import Image from 'next/image';
import { Typography } from '@/ui/typography';
import { usePathname } from 'next/navigation';

const authImages = {
  '/auth/sign-up': '/images/AuthPagePhoto_Signup.png',
  '/auth/signup': '/images/AuthPagePhoto_Signup.png',
  default: '/images/AuthPagePhoto.png',
} as const;

export function AuthImageSection() {
  const pathname = usePathname();
  const imageSrc = authImages[pathname as keyof typeof authImages] || authImages.default;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src={imageSrc}
        alt="Happy couple in their new home"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-b from-transparent via-primary/40 to-primary/60 p-8 ">
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

