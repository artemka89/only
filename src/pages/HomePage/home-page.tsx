import { type FC, useState } from 'react';

import {
  Diagram,
  DiagramNavButtons,
  DiagramPagination,
  DiagramTitle
} from '@/feature/diagram';
import { Gallery } from '@/feature/gallery';
import { useMediaQuery } from '@/shared/api/hooks/useMediaQuery';
import { generateData } from '@/shared/api/mockData';
import { AnimatedDigit } from '@/shared/ui/animated-digit';
import { FadeInContainer } from '@/shared/ui/fade-in-container/fade-in-container';
import { Separator } from '@/shared/ui/separator';

import styles from './home-page.module.scss';

export const HomePage: FC = () => {
  const data = generateData();

  const [activeDiagramPointIndex, setActiveDiagramPointIndex] = useState(0);
  const selectedData = data[activeDiagramPointIndex];

  const [prevYears, setPrevYears] = useState(() =>
    selectedData.years.map((item) => item - 20)
  );

  const isMobile = useMediaQuery('(max-width: 830px)');

  const handleChangeDiagram = (index: number) => {
    setActiveDiagramPointIndex(index);
    setPrevYears(selectedData.years);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveDiagramPointIndex((prevIndex) =>
        prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
    } else {
      setActiveDiagramPointIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }
    setPrevYears(selectedData.years);
  };

  return (
    <main className='container'>
      <div className={styles.grid}>
        <div className={styles.header}>
          <span className={styles.headerTitleLine} />
          <h1 className={styles.headerTitle}>Исторические даты</h1>
        </div>
        <div className={styles.years}>
          <AnimatedDigit
            from={prevYears[0]}
            to={selectedData.years[0]}
            className={styles.year}
          />
          <AnimatedDigit
            from={prevYears[1]}
            to={selectedData.years[1]}
            className={styles.year}
          />
        </div>
        {!isMobile && (
          <Diagram
            items={data}
            activeItemIndex={activeDiagramPointIndex}
            setActiveIndex={handleChangeDiagram}
          />
        )}
        <div className={styles.footer}>
          <div className={styles.diagramControls}>
            <p className={styles.count}>
              {String(activeDiagramPointIndex + 1).padStart(2, '0')}/
              {String(data.length).padStart(2, '0')}
            </p>
            <DiagramNavButtons onClick={handleArrowClick} />
          </div>
          <FadeInContainer
            dependencies={[selectedData.items]}
            className={styles.fadeInContainer}
          >
            {isMobile && (
              <>
                <DiagramTitle
                  className={styles.diagramTitle}
                  value={selectedData.title}
                />
                <Separator className={styles.separator} />
              </>
            )}
            <Gallery items={selectedData.items} />
          </FadeInContainer>
          {isMobile && (
            <DiagramPagination
              items={data}
              activeIndex={activeDiagramPointIndex}
              onChangeIndex={handleChangeDiagram}
              className={styles.diagramPagination}
            />
          )}
        </div>
      </div>
    </main>
  );
};
