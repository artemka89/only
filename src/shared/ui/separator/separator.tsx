import type { FC } from 'react';
import clsx from 'clsx';

import styles from './separator.module.scss';

interface SeparatorProps {
  className?: string;
}

export const Separator: FC<SeparatorProps> = ({ className }) => {
  return <span className={clsx(className, styles.separator)} />;
};
