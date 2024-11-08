import React from 'react';

interface ImageWrapperProps {
  children: React.ReactNode;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({ children }) => {
  const wrapperStyle = {
    display: 'block',
    margin: '20px',
  };

  return <div style={wrapperStyle}>{children}</div>;
};
