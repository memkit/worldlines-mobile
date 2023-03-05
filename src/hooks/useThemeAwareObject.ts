import React from 'react';
import useTheme from './useTheme';

type Generator<T extends {}> = (theme: any) => T;
const useThemeAwareObject = <T extends {}>(fn: Generator<T>) => {
  const {AppTheme} = useTheme();
  const ThemeAwareObject = React.useMemo(
    () => fn(AppTheme),
    [fn, AppTheme]
  );
  return ThemeAwareObject;
};
export { useThemeAwareObject };