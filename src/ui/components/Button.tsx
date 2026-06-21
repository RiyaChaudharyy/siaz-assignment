import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  block?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  block = true,
  className,
  children,
  ...rest
}) => {
  const classes = [
    'saiz-btn',
    `saiz-btn--${variant}`,
    block ? 'saiz-btn--block' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};
