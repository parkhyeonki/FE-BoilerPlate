'use client';

import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  // queryClient 인스턴스 생성: 애플리케이션에서 사용할 쿼리 클라이언트를 정의합니다.
  // 이 인스턴스를 통해 React Query의 모든 설정을 관리합니다.
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime 설정: 쿼리가 가져온 데이터가 "Fresh"함을 유지하는 시간을 설정합니다.
            // 여기서는 1분(60,000밀리초)으로 설정했습니다.
            // 이 시간이 지나기 전까지는 데이터를 다시 가져오지 않습니다.
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  // QueryClientProvider와 ReactQueryDevtools를 사용하여 애플리케이션에 React Query 설정을 적용합니다.
  // QueryClientProvider: 생성한 queryClient 인스턴스를 애플리케이션의 다른 부분에서 사용할 수 있도록 제공합니다.
  // ReactQueryDevtools: 개발 중 쿼리 상태를 쉽게 모니터링하고 디버깅할 수 있게 해주는 도구입니다.
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* initialIsOpen={false}는 Devtools 창을 기본적으로 닫힌 상태로 유지합니다. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
