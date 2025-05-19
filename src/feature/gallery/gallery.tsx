import { type FC, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { useMediaQuery } from '@/shared/api/hooks/useMediaQuery';
import { GalleryItemType } from '@/shared/api/types';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { GalleryItem } from './gallery-item/gallery-item';

import 'swiper/css';
import styles from './gallery.module.scss';

interface GalleryProps {
  items: GalleryItemType[];
  className?: string;
}

export const Gallery: FC<GalleryProps> = ({ items, className }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const swiperRef = useRef<SwiperRef>(null);

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const handlePrev = () => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.swiper.slideNext();
    }
  };

  useLayoutEffect(() => {
    swiperRef.current?.swiper.slideTo(0, 0);
  }, [items]);

  return (
    <div className={clsx(className, styles.gallery)}>
      <button
        disabled={isBeginning}
        className={styles.prevButton}
        onClick={() => handlePrev()}
      >
        <ChevronLeftIcon className={styles.icon} />
      </button>
      <Swiper
        ref={swiperRef}
        className={styles.galleryContainer}
        modules={[Navigation]}
        spaceBetween={isMobile ? 20 : 80}
        slidesPerView='auto'
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onInit={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <GalleryItem
              key={item.year}
              title={item.year.toString()}
              text={item.text}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        disabled={isEnd}
        className={styles.nextButton}
        onClick={() => handleNext()}
      >
        <ChevronRightIcon className={styles.icon} />
      </button>
    </div>
  );
};
