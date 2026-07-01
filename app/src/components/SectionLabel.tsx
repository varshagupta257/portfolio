interface SectionLabelProps {
  text: string;
  className?: string;
  light?: boolean;
}

export function SectionLabel({ text, className = '', light = false }: SectionLabelProps) {
  return (
    <span
      className={`text-label block mb-4 ${light ? 'text-mid-gray' : 'text-mid-gray'} ${className}`}
    >
      {text}
    </span>
  );
}
