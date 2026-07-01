interface HairlineDividerProps {
  light?: boolean;
  className?: string;
}

export function HairlineDivider({ light = true, className = '' }: HairlineDividerProps) {
  return (
    <div
      className={`w-full ${light ? 'hairline-light' : 'hairline-dark'} ${className}`}
    />
  );
}
