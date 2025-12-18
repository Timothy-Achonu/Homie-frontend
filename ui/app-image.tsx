import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';

type AppImageProps = Omit<ImageProps, 'alt'> & {

  variant?: 'default';

  /**
   * Allows you to swap loaders later
   * without touching call sites.
   */
  shouldUseCustomLoader?: boolean;
  
  /**
   * Required alt text for accessibility.
   * Use empty string for decorative images.
   */
  alt: string;
};

export const AppImage = ({
  variant = 'default',
  shouldUseCustomLoader = false,
  className,
  alt,
  ...props
}: AppImageProps) => {
  return (
    <Image
      {...props}
      alt={alt}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        className
      )}
      loader={shouldUseCustomLoader ? customLoader : props.loader}
    />
  );  
};

/* ---------- styles ---------- */

const baseStyles = 'block';

const variantStyles: Record<
  NonNullable<AppImageProps['variant']>,
  string
> = {
  default: '',
};

/* ---------- loader placeholder ---------- */

/**
 * Signature must match Next.js loader.
 */
const customLoader: ImageProps['loader'] = ({ src, width, quality }) => {
  // Example: CDN, transformation, etc.
  return `${src}?w=${width}&q=${quality ?? 75}`;
};
