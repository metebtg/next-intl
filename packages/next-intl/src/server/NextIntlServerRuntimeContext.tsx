import {notFound} from 'next/navigation';
// @ts-expect-error `cSC` is not officially released yet
import React, {createServerContext, use} from 'react';
import IntlProviderProps from 'use-intl/dist/react/IntlProviderProps';
import {NextIntlRuntimeConfig} from './NextIntlConfig';
import SyncLocaleCookie from './SyncLocaleCookie';
import staticConfig from './staticConfig';

const NextIntlServerRuntimeContext = createServerContext<NextIntlRuntimeConfig>(
  'next-intl',
  undefined
);

export function useServerRuntimeConfig() {
  let value: NextIntlRuntimeConfig;
  try {
    value = use(NextIntlServerRuntimeContext) as NextIntlRuntimeConfig;
  } catch (error) {
    throw new Error(
      "Currently all hooks from next-intl (like `useTranslations`) can only be used in Server Components that are not marked with `async`. We're working on removing this limitation.\n\nFor now, you can work around this by removing the `async` keyword and instead using the `use` hook from React to unwrap async values. See https://beta.nextjs.org/docs/data-fetching/fetching#use-in-client-components"
    );
  }

  if (!value) {
    throw new Error(
      'No intl context found. Have you configured `NextIntlServerProvider`?'
    );
  }

  return value;
}

export function NextIntlServerProvider({
  children,
  locale,
  now,
  timeZone
}: IntlProviderProps) {
  if (!staticConfig.locales.includes(locale)) {
    notFound();
  }

  return (
    <NextIntlServerRuntimeContext.Provider
      value={{
        locale,
        now,
        timeZone
      }}
    >
      {children}
      <SyncLocaleCookie locale={locale} />
    </NextIntlServerRuntimeContext.Provider>
  );
}