import { Overlay, Container, Title, Button, Text, Box } from '@mantine/core';
import classes from './HeroHeader.module.css';

export default function HeroHeader() {
  return (
    <div className={classes.root}>
      <div className={classes.cover}>
        <Container size="lg" fluid>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Box>
                <Title className={classes.title}>
                  EASY AND NOVEL WAYS TO ENGAGE COMMUNITY AROUND ROAD SAFETY
                </Title>
              </Box>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}