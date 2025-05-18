import type { FC } from 'react';
import clsx from 'clsx';

import styles from './diagram-title.module.scss';

interface DiagramTitleProps {
  value: string;
  className?: string;
}

export const DiagramTitle: FC<DiagramTitleProps> = ({ value, className }) => {
  return <p className={clsx(className, styles.diagramTitle)}>{value}</p>;
};
