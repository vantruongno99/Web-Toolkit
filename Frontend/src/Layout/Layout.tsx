import {
  AppShell,
  Box,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import  Header  from './Header';

export default function Layout() {
  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>


      <AppShell.Main>
        <Box p={20}>
          <Outlet />
        </Box>
      </AppShell.Main>


    </AppShell>
  );
} 
