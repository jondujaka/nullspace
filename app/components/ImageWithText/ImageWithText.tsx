import {Image, RichText} from '@shopify/hydrogen';
import styles from './ImageWithText.module.scss';
import useElementOnScreen from '~/hooks/useElementOnScreen';
import {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';
import {Link} from 'react-router';

export default function ImageWithText({
  image,
  isEager,
  text,
  noText,
}: {
  image: Partial<ImageType>;
  isEager?: boolean;
  text?: string;
  noText?: boolean;
}) {
  const [containerRef, isVisible] = useElementOnScreen({
    threshold: isEager ? 0.01 : 0.2,
  });

  return (
    <div ref={containerRef}>
      <div className={`${styles.content} ${noText ? styles.noText : ''}`}>
        {text && <RichText className={styles.text} data={text} />}
        <Link to="/products">View Products</Link>
      </div>
      <Image
        loading={isEager ? 'eager' : 'lazy'}
        className={isVisible ? 'reveal' : ''}
        data={image}
        sizes="100vw"
      />
    </div>
  );
}

export function Wrapper({
  images,
  isEager,
  text,
}: {
  images: {image: Partial<ImageType>}[];
  isEager?: boolean;
  text?: string;
}) {
  const [containerRef, isVisible] = useElementOnScreen({
    threshold: isEager ? 0.01 : 0.2,
  });

  return (
    <div ref={containerRef} className={styles.imagesWrapper}>
      {images.map((image, i) => (
        <ImageWithText
          key={image.image.id}
          image={image.image}
          isEager
          text={text}
          noText={i > 0}
        />
      ))}
    </div>
  );
}
