import { type FC, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface AnimatedDigitProps {
  from?: string | number;
  to: string | number;
  duration?: number;
  className?: string;
}

export const AnimatedDigit: FC<AnimatedDigitProps> = ({
  from = '0',
  to,
  duration = 1,
  className
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        {
          textContent: from.toString(),
          roundProps: 'textContent',
          ease: 'none'
        },
        {
          duration,
          textContent: to.toString(),
          roundProps: 'textContent',
          ease: 'none'
        }
      );
    },
    { dependencies: [from, to], scope: containerRef }
  );

  return (
    <span ref={containerRef} className={className}>
      {from}
    </span>
  );
};
