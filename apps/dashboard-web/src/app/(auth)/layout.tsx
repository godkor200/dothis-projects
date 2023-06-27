// import type { NextLayoutProps } from '@dothis/share';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>auth</div>
      {children}
    </div>
  );
}
