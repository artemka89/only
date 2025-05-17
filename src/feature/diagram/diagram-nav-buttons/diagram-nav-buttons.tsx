import type { FC } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import styles from './diagram-nav-buttons.module.scss';

interface DiagramNavButtonsProps {
  onClick: (value: 'left' | 'right') => void;
  className?: string;
}

export const DiagramNavButtons: FC<DiagramNavButtonsProps> = ({
  onClick,
  className
}) => {
  return (
    <div className={clsx(className, styles.navButtons)}>
      <button onClick={() => onClick('left')} className={styles.navButton}>
        <ChevronLeftIcon className={styles.icon} />
      </button>
      <button onClick={() => onClick('right')} className={styles.navButton}>
        <ChevronRightIcon className={styles.icon} />
      </button>
    </div>
  );
};
