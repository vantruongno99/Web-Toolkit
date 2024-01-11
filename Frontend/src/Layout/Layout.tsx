import {
  AppShell,
  Box,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import HeroHeader from './HeroHeader';

export default function Layout() {
  return (
    <AppShell
      header={{ height: "10px" }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <HeroHeader />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

    </AppShell>
  );
} 
