import {
    AppShell,
    AppShellFooter,
    Box,
  } from '@mantine/core';
  import { Outlet } from 'react-router-dom';
  import Header from './Header';
  import HeroHeader from './HeroHeader';
  import Footer from './Footer';
  
  export default function LayoutWithoutHeroHeader() {
    return (
      <AppShell
        header={{ height: "10px" }}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
        <AppShell.Section >
          <Footer />
        </AppShell.Section>
      </AppShell>
    );
  } 
  