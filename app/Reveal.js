'use client';
import { useEffect, useRef, useState } from 'react';

// Plays the section's kinetic-type moment once, when it first enters the screen.
export default function Reveal({ className, children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`${className}${on ? ' on' : ''}`}>{children}</div>;
}
