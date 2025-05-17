import type { FC } from 'react';
import clsx from 'clsx';

import styles from './gallery-item.module.scss';

interface GalleryItemProps {
  title: string;
  text: string;
  className?: string;
}

export const GalleryItem: FC<GalleryItemProps> = ({
  title,
  text,
  className
}) => {
  return (
    <div className={clsx(className, styles.item)}>
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
