import React from 'react';
import './HamburgerMenu.css';

export interface HamburgerMenuProps {
  strokeColor?: string;
  strokeWidth?: number;
  size?: number;
  checked?: boolean;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
  className?: string;
  ariaLabel?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  strokeColor = '#FFFFFF',
  strokeWidth = 2.5,
  size = 44,
  checked,
  defaultChecked = false,
  onToggle,
  className,
  ariaLabel = 'Toggle menu'
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = !isChecked;
    if (checked === undefined) {
      setInternalChecked(next);
    }
    onToggle?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const next = !isChecked;
      if (checked === undefined) {
        setInternalChecked(next);
      }
      onToggle?.(next);
    }
  };

  return (
    <button
      type="button"
      className={`hamburger-menu-btn ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={isChecked ? 'Close menu' : ariaLabel}
      aria-expanded={isChecked}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size
      }}
    >
      <svg
        viewBox="0 0 32 32"
        className="hamburger-menu-svg"
        style={{
          transform: isChecked ? 'rotate(-45deg)' : 'rotate(0deg)'
        }}
        aria-hidden="true"
      >
        <path
          className="hamburger-line hamburger-line-top-bottom"
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          strokeDasharray={isChecked ? '20 300' : '12 63'}
          strokeDashoffset={isChecked ? -32.42 : 0}
        />
        <path
          className="hamburger-line hamburger-line-middle"
          d="M7 16 27 16"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </svg>
    </button>
  );
};

export default HamburgerMenu;
