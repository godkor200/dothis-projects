import type { NextLayoutProps } from '@dothis/share';

export default function AuthLayout({ children }: NextLayoutProps) {
  return (
    <div>
      <div>auth</div>
      {children}
    </div>
  );
}
