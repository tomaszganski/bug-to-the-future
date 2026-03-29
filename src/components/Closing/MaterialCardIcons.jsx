/**
 * Illustrations echoing the reference card artwork; fills use currentColor (set via CSS).
 */
export function MaterialCardIcon({ name, className }) {
  const common = {
    className,
    viewBox: '0 0 64 64',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  };

  switch (name) {
    case 'brain':
      return (
        <svg {...common}>
          <path
            d="M32 8c-4.5 0-8.2 2.8-9.7 6.8-.9-.5-2-.8-3.1-.8-3.3 0-6 2.5-6.3 5.7-3.6 1.2-6.2 4.6-6.2 8.6 0 2.2.8 4.2 2.1 5.8-.7 1.2-1.1 2.6-1.1 4.1 0 4.4 3.6 8 8 8h.2c1.3 2.6 4 4.4 7.1 4.4 1.2 0 2.3-.3 3.3-.8 1.5 4 5.2 6.8 9.7 6.8s8.2-2.8 9.7-6.8c1 .5 2.1.8 3.3.8 3.1 0 5.8-1.8 7.1-4.4h.2c4.4 0 8-3.6 8-8 0-1.5-.4-2.9-1.1-4.1 1.3-1.6 2.1-3.6 2.1-5.8 0-4-2.6-7.4-6.2-8.6-.3-3.2-3-5.7-6.3-5.7-1.1 0-2.2.3-3.1.8C40.2 10.8 36.5 8 32 8Z"
            fill="currentColor"
            opacity="0.35"
          />
          <path
            d="M26 22v6M30 20v10M34 24v8M38 21v7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      );
    case 'scales':
      return (
        <svg {...common}>
          <path
            d="M32 52V20M32 20l-14-6v8l14 6 14-6v-8L32 20Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M12 34c0-4 4-10 8-10s8 6 8 10H12Zm24 0c0-4 4-10 8-10s8 6 8 10H36Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.35"
          />
        </svg>
      );
    case 'pie':
      return (
        <svg {...common}>
          <circle cx="32" cy="34" r="18" fill="currentColor" opacity="0.2" />
          <path
            d="M32 34V16a18 18 0 0 1 15.6 9l-15.6 9Z"
            fill="currentColor"
            opacity="0.55"
          />
          <path
            d="M32 34 18.4 25a18 18 0 0 0 3.1 12.2L32 34Z"
            fill="currentColor"
            opacity="0.4"
          />
          <path
            d="M32 34l13.6 9A18 18 0 0 1 32 52V34Z"
            fill="currentColor"
            opacity="0.75"
          />
          <circle cx="32" cy="34" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'factory':
      return (
        <svg {...common}>
          <path
            d="M14 52V28l8 6V30l8 6V52H14Z"
            fill="currentColor"
            opacity="0.3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M38 52V36h12v16H38Z"
            fill="currentColor"
            opacity="0.45"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M44 30v6M40 14h8v10h-8V14Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.25" />
          <ellipse cx="48" cy="44" rx="3" ry="2" fill="currentColor" opacity="0.6" />
          <path
            d="M22 46h16M22 50h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M52 40c2 0 3-1.5 3-3s-1-2.5-3-2.5c0-1.5-1-2.5-2.5-2.5S45 33 45 34.5c-1.5 0-2.5 1-2.5 2.5v1h6"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      );
    case 'bar':
      return (
        <svg {...common}>
          <rect
            x="14"
            y="22"
            width="36"
            height="24"
            rx="4"
            fill="currentColor"
            opacity="0.25"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M18 26h28v4H18z" fill="currentColor" opacity="0.45" />
          <rect x="22" y="34" width="20" height="8" rx="2" fill="currentColor" opacity="0.35" />
          <path
            d="M40 30c0-2 1.5-3.5 3.5-3.5S47 28 47 30s-1.5 2-3.5 2c0 1-1 2-2 2h-2"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
        </svg>
      );
    default:
      return null;
  }
}
