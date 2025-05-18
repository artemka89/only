import { type FC } from 'react';
import clsx from 'clsx';

import { DataType } from '@/shared/api/types';
import { OFFSET_DEG_DIAGRAM } from '@/shared/constants';

import { DiagramTitle } from '../diagram-title/diagram-title';

import styles from './diagram.module.scss';

interface CircleDiagramProps {
  items: DataType[];
  activeItemIndex: number;
  setActiveIndex: (index: number) => void;
  className?: string;
}

export const Diagram: FC<CircleDiagramProps> = ({
  items,
  activeItemIndex,
  setActiveIndex,
  className
}) => {
  const arc = 360 / items.length;

  return (
    <ul className={clsx(className, styles.diagramItem)}>
      {items.map((item, index) => {
        const angle = arc * index - activeItemIndex * arc + OFFSET_DEG_DIAGRAM;

        const style: React.CSSProperties = {
          transform: `translate(-50%, -50%) rotate(${angle}deg) translate(-265px) rotate(${-1 * angle}deg)`
        };

        return (
          <li key={index} className={styles.pointWrapper} style={style}>
            <button
              onClick={() => setActiveIndex(index)}
              className={clsx(styles.pointButton, {
                [styles.active]: activeItemIndex === index
              })}
            >
              <div className={styles.pointСircle} />
              <span className={styles.pointNumber}>{index + 1}</span>
            </button>
            <DiagramTitle
              value={item.title}
              className={clsx(styles.pointTitle, {
                [styles.visible]: activeItemIndex === index
              })}
            />
          </li>
        );
      })}
    </ul>
  );
};
