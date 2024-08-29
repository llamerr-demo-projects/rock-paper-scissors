import localFont from 'next/font/local';
import type React from 'react';
import tw from 'tailwind-styled-components';

const textFont = localFont({
  src: './Barlow-Medium.otf',
  display: 'swap',
});

type NarrowTextProps = {
  className?: string;
  children?: React.ReactNode;
};

export const NarrowText: React.FC<NarrowTextProps> = ({
  className,
  children,
}) => {
  return <div className={`${textFont.className} ${className}`}>{children}</div>;
};

export const NarrowTextTitle = tw(NarrowText)`
  my-12 
  w-full 
  text-nowrap 
  text-center 
  text-2xl 
  font-bold 
  uppercase 
  text-white
`;
