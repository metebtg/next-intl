export {default as createSharedPathnamesNavigation} from './createSharedPathnamesNavigation';
export {default as createLocalizedPathnamesNavigation} from './createLocalizedPathnamesNavigation';
export {default as createNavigation} from './createNavigation';

import type {
  Locales,
  Pathnames as PathnamesDeprecatedExport
} from '../../routing/types';

/** @deprecated Please import from `next-intl/routing` instead. */
export type Pathnames<AppLocales extends Locales> =
  PathnamesDeprecatedExport<AppLocales>;
