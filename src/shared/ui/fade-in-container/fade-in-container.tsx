import { type FC, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
interface FadeInContainerProps {
  dependencies?: unknown[];
  onComplete?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const FadeInContainer: FC<FadeInContainerProps> = ({
  dependencies = [],
  onComplete,
  children,
  className
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          duration: 1,
          y: 30,
          onComplete
        },

        {
          opacity: 1,
          duration: 1,
          y: 0
        }
      );
    },
    { dependencies, scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
