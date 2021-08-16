import React, { useCallback, useEffect, useState } from 'react';
import { isString } from 'lodash';
import styles from '@/styles/common/components/Image/Image.module.scss';
import { RATIOS, REGEX } from 'src/common/constants';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

export type ImageProps = IImageProps & NextImageProps;
interface IImageProps {
  imageUrlSize: string;
  classNameContainer?: string;
  imageNotFound?: string;
}

export const ImageComponent: React.FC<ImageProps> = ({
  src = '',
  imageUrlSize = 'w500',
  classNameContainer = '',
  className = '',
  imageNotFound = '/images/components/image-not-found.png',
  alt = '',
}) => {
  const [error, setError] = useState(false);
  // check on the absolute path
  const validSrc = useCallback(
    (imageUrlSize: string): string => {
      if (isString(src) && !new RegExp(REGEX.URL).test(src)) {
        return `${process.env.NEXT_PUBLIC_API_IMAGE_URL}${imageUrlSize}${src}`;
      }

      if (isString(src)) {
        return src;
      }

      return imageNotFound;
    },
    [src, imageNotFound],
  );

  useEffect(() => {
    const img = new Image();
    img.src = validSrc(imageUrlSize);
    img.onerror = () => setError(true);

    return () => {
      setError(false);
    };
  }, [validSrc, imageUrlSize]);

  return (
    <div
      ref={(el) => {
        if (el) {
          el.style.paddingBottom =
            (el.clientWidth / RATIOS.POSTER / el.clientWidth) * 100 + '%';
        }
      }}
      className={`${styles['image-container']} ${classNameContainer || ''}`}
    >
      {error ? (
        <NextImage
          className={`${styles['image']} ${styles['error']} ${className}`}
          src={imageNotFound}
          layout="fill"
          alt="image not found"
        />
      ) : (
        <NextImage
          className={`${styles['image']} ${className}`}
          src={validSrc(imageUrlSize)}
          layout="fill"
          blurDataURL={validSrc('w92')}
          placeholder="blur"
          alt={alt}
        />
      )}
    </div>
  );
};
