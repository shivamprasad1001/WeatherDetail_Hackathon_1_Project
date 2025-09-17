import React, { ReactNode, HTMLAttributes } from 'react';

// FIX: Extend HTMLAttributes<HTMLDivElement> to allow passing standard div props like onClick.
interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 relative overflow-hidden transition-all duration-300 hover:border-white/30 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const SkeletonLoader: React.FC = () => (
  <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-10 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/50"></div>
  </div>
);