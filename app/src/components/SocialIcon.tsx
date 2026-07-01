import { Linkedin, Github, Instagram, Mail, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  mail: Mail,
};

interface SocialIconProps {
  type: 'linkedin' | 'github' | 'instagram' | 'mail';
  href: string;
  size?: number;
  className?: string;
}

export function SocialIcon({ type, href, size = 24, className = '' }: SocialIconProps) {
  const Icon = iconMap[type];
  const isMail = href.startsWith('mailto:');

  return (
    <a
      href={href}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noopener noreferrer'}
      aria-label={type}
      className={`text-[#666666] hover:text-[#FFEB3B] hover:scale-110 transition-all duration-300 ${className}`}
    >
      <Icon size={size} strokeWidth={1.5} />
    </a>
  );
}
