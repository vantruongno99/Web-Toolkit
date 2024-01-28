import { useState } from 'react';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import Cookies from "js-cookie";
import authservice from '../Services/auth.service';

const vendorLogged = Cookies.get("ABN") !== undefined||null
const adminLogged = Cookies.get("role") === "admin"


const adminLogout = async () => {
  authservice.logout()
}

const vendorLogout = async () => {
  Cookies.remove("ABN")
  window.location.reload();
  window.location.href = '/'
}

const links = [
  { link: '/about', label: 'About' },
  { link: '/find', label: 'Solution' },
  {
    link: '/admin', label: 'Admin',
    ...(adminLogged && {
      links: [
        { label: 'Sign out', onClick: adminLogout },
      ],
    })
  },
  {
    link: '/vendor', label: 'Vendor',
    ...(vendorLogged && {
      links: [
        { label: 'Sign out', onClick: vendorLogout },
      ],
    })
  },

];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const navigate = useNavigate()



  const items = links.map((link) => {
    const menuItems = link.links?.map((item, i) => (
      <Menu.Item onClick={() => item.onClick()} key={i}>{item.label}</Menu.Item>
    ));


    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }



    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => {
          navigate(link.link)
        }}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          Logo
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}