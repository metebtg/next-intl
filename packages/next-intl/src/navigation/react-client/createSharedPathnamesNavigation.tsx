import React, {ComponentProps, ReactElement, forwardRef} from 'react';
import {
  AllLocales,
  LocalePrefix,
  ParametersExceptFirst
} from '../../shared/types';
import ClientLink from './ClientLink';
import clientRedirect from './clientRedirect';
import useBasePathname from './useBasePathname';
import useBaseRouter from './useBaseRouter';

export default function createSharedPathnamesNavigation<
  Locales extends AllLocales
>(opts: {locales: Locales; localePrefix?: LocalePrefix}) {
  type LinkProps = Omit<
    ComponentProps<typeof ClientLink<Locales>>,
    'localePrefix'
  >;
  function Link(props: LinkProps, ref: LinkProps['ref']) {
    return (
      <ClientLink<Locales>
        ref={ref}
        localePrefix={opts.localePrefix}
        {...props}
      />
    );
  }
  const LinkWithRef = forwardRef(Link) as (
    props: LinkProps & {ref?: LinkProps['ref']}
  ) => ReactElement;
  (LinkWithRef as any).displayName = 'Link';

  function redirect(
    pathname: string,
    ...args: ParametersExceptFirst<typeof clientRedirect>
  ) {
    return clientRedirect({...opts, pathname}, ...args);
  }

  return {
    Link: LinkWithRef,
    redirect,
    usePathname: useBasePathname,
    useRouter: useBaseRouter
  };
}