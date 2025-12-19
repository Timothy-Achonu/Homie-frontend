'use client';

import Image from 'next/image';
import { Typography } from '@/ui/typography';
import { usePathname } from 'next/navigation';
import { LogoIcon } from '@/components/svgs';

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

const authImagesMobile = {
  '/auth/sign-up': {
    imageSrc: '/images/AuthPagePhoto_sign_up_mobile.png',
    alt: 'Happy couple in their new home',
  },
  '/auth/sign-in': {
    imageSrc: '/images/AuthPagePhoto_login_mobile.png',
    alt: 'Happy couple in their new home',
  },
  '/auth/verify-email': {
    imageSrc: '/images/AuthPagePhoto_email_verif_mobile.png',
    alt: 'House architectural plan on table',
  },
  
  '/auth/forgot-password': {
    imageSrc: '/images/AuthPagePhoto_forgot_password_mobile.png',
    alt: 'House architectural plan on table',
  },

  default: {
    imageSrc: '/images/AuthPagePhoto_mobile.png',
    alt: 'Happy couple in their new home',
  },
} as const;

export function AuthImageSection() {
  const pathname = usePathname();
  const imageConfig = authImages[pathname as keyof typeof authImages] || authImages.default;
  const mobileImageConfig = authImagesMobile[pathname as keyof typeof authImagesMobile] || authImagesMobile.default;

  return (
    <div className="relative h-[430px] lg:h-dvh w-full overflow-hidden">  
      <div className="lg:hidden block absolute top-4 right-4 z-20">
          <LogoIcon width={70} height={78} variant="white"/>
        </div>
      {/* Desktop Image */}
      <Image
        src={imageConfig.imageSrc}
        alt={imageConfig.alt} 
        fill 
        className="object-cover hidden lg:block" 
        priority  
      />
      {/* Mobile Image */}
      <Image
        src={mobileImageConfig.imageSrc}
        alt={mobileImageConfig.alt}  
        fill  
        className="object-cover lg:hidden" 
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

