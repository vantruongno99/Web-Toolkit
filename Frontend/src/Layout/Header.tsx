import { useState } from 'react';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { Menu, Group, Center, Burger, Container, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import Cookies from "js-cookie";
import authservice from '../Services/auth.service';

const vendorLogged = Cookies.get("ABN") !== undefined || null
const adminLogged = Cookies.get("role") === "admin"
const logged = Cookies.get("logged") === "true"


const adminLogout = async () => {
  authservice.logout()
}

const changePassword = async () => {
  window.location.href = '/admin/password'}

const vendorLogout = async () => {
  Cookies.remove("ABN")
  Cookies.remove("logged")
  window.location.reload();
  window.location.href = '/'
}


type Link = {
  link: string,
  label: string,
  links?: {
    label: string,
    onClick: () => Promise<void>
  }[]

}

let links: Link[] = [
  { link: '/about', label: 'About' },
  { link: '/find', label: 'Solution' },
  { link: '/login', label: 'Login' },
];

if (adminLogged) links.push({
  link: '/admin', label: 'Admin',
  links: [
    { label: 'Change Password', onClick: changePassword },
    { label: 'Sign out', onClick: adminLogout },
  ],
})

if (vendorLogged) links.push(
  {
    link: '/vendor', label: 'Vendor',
    links: [
      { label: 'Sign out', onClick: vendorLogout },
    ],
  }
)


if (logged) {
  links = links.filter(a => a.label !== "Login")
}



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
                <span className={classes.linkLabel} onClick={() => navigate(link.link)}>{link.label}</span>
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
      <Container fluid size="md">
        <div className={classes.inner}>
          <Title onClick={() => navigate("/")}>Logo</Title>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}