import React from 'react';

// Define an enum for readability and maintainability
enum ColorCode {
  Transparent = 0,
  Secondary = 1,  // X color
  Quaternary = 2, // O color
}

// Type for the color map
type ColorMap = {
  [key in ColorCode]: string;
};

// Define the color map with type annotation
const colorMap: ColorMap = {
  [ColorCode.Transparent]: 'transparent',
  [ColorCode.Quaternary]: '#D62839',
  [ColorCode.Secondary]: '#FFFFFF',
};

interface Props {
  colorCode: ColorCode; // Use the enum here for the type of colorCode
}

const Piece: React.FC<Props> = ({ colorCode }) => {
  return (
    <div style={{
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorMap[colorCode],
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
      backgroundImage: colorCode !== ColorCode.Transparent ? `radial-gradient(circle at 40%, ${colorMap[colorCode]}, #000)` : 'none',
      transition: 'transform 0.3s, box-shadow 0.3s',
    }}
    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0px) scale(1)')}
    >
    </div>
  );
}

export default Piece;