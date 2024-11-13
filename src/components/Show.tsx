import { PropsWithChildren } from 'react';

interface ShowProps {
  when: boolean;
}

export function Show({ when, children }: PropsWithChildren<ShowProps>) {
  if (when) return children;
}
