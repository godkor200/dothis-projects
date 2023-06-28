// import type { NextLayoutProps } from '@dothis/share';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>keyword layout</div>
      {children}
    </div>
  );
}
