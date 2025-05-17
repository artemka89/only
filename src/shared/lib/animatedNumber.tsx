import { FC, useEffect, useState } from 'react';

interface AnimatedNumberProps {
  start: number;
  end: number;
  duration?: number;
  className?: string;
}

export const AnimatedYear: FC<AnimatedNumberProps> = ({
  start,
  end,
  duration = 1000,
  className
}) => {
  const [current, setCurrent] = useState(start);

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCurrent(Math.floor(start + progress * (end - start)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [start, end, duration]);

  return <span className={className}>{current}</span>;
};
