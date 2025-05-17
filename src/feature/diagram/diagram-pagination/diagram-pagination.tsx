import type { FC } from 'react';
import clsx from 'clsx';

import { DataType } from '@/shared/api/types';

import styles from './diagram-pagination.module.scss';

interface DiagramPaginationProps {
  items: DataType[];
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  className?: string;
}

export const DiagramPagination: FC<DiagramPaginationProps> = ({
  items,
  activeIndex,
  onChangeIndex,
  className
}) => {
  return (
    <ul className={clsx(className, styles.diagramPagination)}>
      {items.map((item, index) => (
        <li key={item.id}>
          <button
            onClick={() => onChangeIndex(index)}
            className={styles.paginationButton}
          >
            <span
              className={clsx(styles.paginationDote, {
                [styles.active]: index === activeIndex
              })}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};
