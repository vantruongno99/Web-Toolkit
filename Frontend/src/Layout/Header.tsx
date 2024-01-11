import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const links = [
  { link: '/about', label: 'About' },
  { link: '/solution', label: 'Solution' },
  { link: '/login', label: 'Login' },
];

export default function Header() {
  const navigate = useNavigate()


  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <h3>
          Logo
        </h3>
        {/* <Group gap={5} visibleFrom="xs">
          {items}
        </Group> */}
        <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
          {items}
        </Group>
      </Container>
    </header>
  );
}