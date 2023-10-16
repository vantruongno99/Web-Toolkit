import {
  AppShell,
  Box,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import  Header  from './Header';

export default function Layout() {
  return (
    <AppShell
      header={{ height: "70px" }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
          <Outlet />
      </AppShell.Main>

    </AppShell>
  );
} 
