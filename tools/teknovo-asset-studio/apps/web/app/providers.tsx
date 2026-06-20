'use client';

import * as React from 'react';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());
  const Provider = QueryClientProvider as unknown as React.ComponentType<{ client: QueryClient; children?: ReactNode }>;
  return <Provider client={queryClient}>{children}</Provider>;
}
