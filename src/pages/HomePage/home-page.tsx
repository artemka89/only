import { type FC, useState } from 'react';

import {
  Diagram,
  DiagramNavButtons,
  DiagramPagination
} from '@/feature/diagram';
import { Gallery } from '@/feature/gallery';
import { useMediaQuery } from '@/shared/api/hooks/useMediaQuery';
import { mockData } from '@/shared/api/mockData';
import { AnimatedYear } from '@/shared/lib/animatedNumber';

import styles from './home-page.module.scss';

export const HomePage: FC = () => {
  const [activeDiagramPointIndex, setActiveDiagramPointIndex] = useState(0);
  const [prevYears, setPrevYears] = useState(() =>
    mockData[activeDiagramPointIndex].years.map((item) => item - 20)
  );

  const isMobile = useMediaQuery('(max-width: 830px)');

  const handleChangeDiagram = (index: number) => {
    setActiveDiagramPointIndex(index);
    setPrevYears(mockData[activeDiagramPointIndex].years);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveDiagramPointIndex((prevIndex) =>
        prevIndex === 0 ? mockData.length - 1 : prevIndex - 1
      );
    } else {
      setActiveDiagramPointIndex((prevIndex) =>
        prevIndex === mockData.length - 1 ? 0 : prevIndex + 1
      );
    }
    setPrevYears(mockData[activeDiagramPointIndex].years);
  };

  return (
    <main className='container'>
      <div className={styles.grid}>
        <div className={styles.header}>
          <span className={styles.headerTitleLine} />
          <h1 className={styles.headerTitle}>Исторические даты</h1>
        </div>
        <div className={styles.years}>
          <AnimatedYear
            start={prevYears[0]}
            end={mockData[activeDiagramPointIndex].years[0]}
            className={styles.year}
          />
          <AnimatedYear
            start={prevYears[1]}
            end={mockData[activeDiagramPointIndex].years[1]}
            className={styles.year}
          />
        </div>
        {!isMobile && (
          <Diagram
            items={mockData}
            activeItemIndex={activeDiagramPointIndex}
            setActiveIndex={handleChangeDiagram}
          />
        )}
        <div className={styles.footer}>
          <div className={styles.diagramControls}>
            <p className={styles.count}>
              {String(activeDiagramPointIndex + 1).padStart(2, '0')}/
              {String(mockData.length).padStart(2, '0')}
            </p>
            <DiagramNavButtons onClick={handleArrowClick} />
          </div>
          <Gallery
            items={mockData[activeDiagramPointIndex].items}
            className={styles.gallery}
            title={mockData[activeDiagramPointIndex].title}
          />
        </div>
        {isMobile && (
          <DiagramPagination
            items={mockData}
            activeIndex={activeDiagramPointIndex}
            onChangeIndex={handleChangeDiagram}
            className={styles.diagramPagination}
          />
        )}
      </div>
    </main>
  );
};
