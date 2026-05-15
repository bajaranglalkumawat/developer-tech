import { useEffect, useRef, useState } from "react";

interface CounterNumberProps {
  end: number;
  duration?: number;
  className?: string;
}

export default function CounterNumber({ end, duration = 2000, className = "" }: CounterNumberProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const startValue = 0;

          const updateCount = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentCount = Math.floor(progress * (end - startValue) + startValue);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(end);
            }
          };

          updateCount();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration]);

  return (
    <div ref={elementRef} className={className}>
      {count}
    </div>
  );
}
