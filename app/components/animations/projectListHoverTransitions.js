import eases from 'eases';

const transitions = [
  {
    from: 'idle',
    to: 'hover',
    animation: {
      duration: 0.25,
      delay: 0,
      ease: eases.quadOut,
      image: {
        delay: 0.25,
        duration: 1
      }
    }
  },
  { from: 'hover', to: 'idle' }
];

export default transitions;
