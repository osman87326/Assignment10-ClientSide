/**
 * Animation variants — spring-based, physical motion
 * Built for the dark neo-brutalist theme
 */

// Spring config presets
export const springSnappy = { type: "spring", stiffness: 260, damping: 20, mass: 0.8 };
export const springSoft = { type: "spring", stiffness: 120, damping: 18, mass: 1 };
export const springBouncy = { type: "spring", stiffness: 320, damping: 14, mass: 0.6 };

// Fade + rise with a touch of blur-to-focus (feels more premium than plain opacity/y)
export const fadeInUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...springSoft, duration: 0.6 },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -48, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: springSoft },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 48, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: springSoft },
};

// Pop-in scale — great for cards, badges, icons
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: springSnappy },
};

// Rotate-in — for playful mascot / icon elements
export const rotateIn = {
  hidden: { opacity: 0, scale: 0.8, rotate: -8 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: springBouncy },
};

// Stagger containers
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.15 },
  },
};

// Card hover — lift + subtle glow via box-shadow, no rotation drift
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.015,
    transition: { ...springSnappy, duration: 0.25 },
  },
};

// Magnetic button press feedback
export const buttonTap = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: springSnappy },
  tap: { scale: 0.96, transition: { duration: 0.1 } },
};

// Text container for word-by-word reveal
export const textContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.045, delayChildren: 0.1 },
  },
};

export const textWord = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Marquee-style infinite float for decorative elements
export const floatingAnimation = {
  y: [0, -14, 0],
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
};

export const floatingAnimationSlow = {
  y: [0, -10, 0],
  opacity: [0.4, 0.7, 0.4],
  transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
};

// Underline draw-in (for nav links / headings)
export const underlineDraw = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

// Counter/number pop
export const counterConfig = {
  duration: 2.2,
  ease: [0.16, 1, 0.3, 1],
};