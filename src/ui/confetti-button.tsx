import React from 'react';
import confetti from 'canvas-confetti';

interface ConfettiButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  confettiOptions?: confetti.Options;
}

const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  children,
  className = '',
  onClick,
  confettiOptions = {}
}) => {
  const handleClick = () => {
    // Default confetti options for anniversary with pink and sky blue colors
    const defaultOptions: confetti.Options = {
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f472b6', '#f9a8d4', '#0ea5e9', '#7dd3fc'],
      ...confettiOptions
    };

    confetti(defaultOptions);
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ConfettiButton;