import {
  AppShell,
  AppShellFooter,
  Box,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import HeroHeader from './HeroHeader';
import Footer from './Footer';

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
      <AppShell.Section mt={"3rem"}>
        <Footer />
      </AppShell.Section>
    </AppShell>
  );
} 
