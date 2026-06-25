/**
 * Reusable Framer Motion animation variants
 * Used across all premium-enhanced components
 */

// Fade up animation for section entrances
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Fade in with no vertical movement
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Slide in from left
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Slide in from right
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Scale up animation
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Stagger children container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Stagger children with slower delay
export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

// Card hover animation preset
export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 0 0 0 rgba(195, 192, 255, 0)",
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 60px -10px rgba(195, 192, 255, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Counter number animation config
export const counterConfig = {
  duration: 2.5,
  ease: [0.16, 1, 0.3, 1],
};

// Floating animation for decorative elements
export const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const floatingAnimationSlow = {
  y: [0, -10, 0],
  opacity: [0.3, 0.6, 0.3],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Navbar scroll states
export const navbarVariants = {
  transparent: {
    backgroundColor: "rgba(16, 20, 21, 0)",
    backdropFilter: "blur(0px)",
    boxShadow: "0 0 0 0 rgba(0,0,0,0)",
    height: 72,
  },
  scrolled: {
    backgroundColor: "rgba(16, 20, 21, 0.8)",
    backdropFilter: "blur(24px)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
    height: 64,
  },
};