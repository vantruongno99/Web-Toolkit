import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './HeroHeader.module.css';

export default function HeroHeader() {
  return (
    <div className={classes.root}>
      <div className={classes.cover}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                Technologies for crafting compelling campaigns with stronger impact
              </Title>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}