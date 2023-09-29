const svgPathVariant1 = {
  open: { d: 'M3.06061 2.99999L21.0606 21' },
  closed: { d: 'M0 9.5L24 9.5' },
};

const svgPathVariant2 = {
  open: { d: 'M3.00006 21.0607L21 3.06064' },
  closed: { d: 'M0 14.5L15 14.5' },
};

const firstVariant = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 0.5,
    },
  },
  closed: { y: -300, opacity: 0 },
};
const secondVariant = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 0.5,
    },
  },
  closed: { x: -100, opacity: 0 },
};

const thirdVariant = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 0.75,
    },
  },
  closed: { x: -100, opacity: 0 },
};

const fourthVariant = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 1,
    },
  },
  closed: { x: -100, opacity: 0 },
};

const fifthVariant = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 1.25,
    },
  },
  closed: { x: -100, opacity: 0 },
};

const sixthVariant = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 1.5,
    },
  },
  closed: { x: -100, opacity: 0 },
};

const seventhVariant = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 1.75,
    },
  },
  closed: { y: 300, opacity: 0 },
};

export {
  svgPathVariant1,
  svgPathVariant2,
  firstVariant,
  secondVariant,
  thirdVariant,
  fourthVariant,
  fifthVariant,
  sixthVariant,
  seventhVariant,
};
