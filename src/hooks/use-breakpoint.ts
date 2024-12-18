import { Grid } from 'antd';

export const { useBreakpoint } = Grid;

export const useIsXXlScreen = () => {
  const { xxl } = useBreakpoint();

  return xxl;
};

export const useInputSize = () => {
  const size = useBreakpoint();
  if (size.xxl) {
    return 'large';
  }

  if (size.xl) {
    return 'middle';
  }

  return 'small';
};

export const useHeaderSize = () => {
  const isXXl = useIsXXlScreen();

  if (isXXl) {
    return 115;
  }

  return 'small';
};
