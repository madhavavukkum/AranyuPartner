import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollRestoration = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef({});

  // Save scroll position before route changes
  useEffect(() => {
    return () => {
      positions.current[location.key] = window.scrollY;
    };
  }, [location]);

  // Restore or reset scroll after route changes
  useLayoutEffect(() => {
    const y = navigationType === 'POP'
      ? positions.current[location.key] || 0
      : 0;
    window.scrollTo(0, y);
  }, [location, navigationType]);

  return null;
};

export default ScrollRestoration;
