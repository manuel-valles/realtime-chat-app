import { Flex } from '@mantine/core';
import { ReactElement } from 'react';

const MainLayout = ({ children }: { children: ReactElement }) => {
  return <Flex>{children}</Flex>;
};

export default MainLayout;
