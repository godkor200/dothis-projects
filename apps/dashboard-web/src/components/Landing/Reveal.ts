import RevealList from './RevealList';
import RevealWrapper from './RevealWrapper';

export const reveal = {
  delay: 250,
  distance: '50px',
  duration: 1500,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  opacity: 0,
  origin: 'top',
  rotate: {
    x: 0,
    y: 0,
    z: 0,
  },
  scale: 1,
  cleanup: false,
  // container: document.documentElement,
  desktop: true,
  mobile: true,
  reset: false,
  useDelay: 'always',
  viewFactor: 0.0,
  viewOffset: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  // afterReset: function (el: any) {},
  // afterReveal: function (el: any) {},
  // beforeReset: function (el: any) {},
  // beforeReveal: function (el: any) {},
};

export { RevealList, RevealWrapper };
