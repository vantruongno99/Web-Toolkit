import React, { useRef } from "react";
import { Flex, Button, Paper, Title, Text, Grid, Image, Divider, Container, TextInput, Card, Center } from "@mantine/core";
import classes from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { LandingData } from "../Ultils/type";
import homeImage from "../../public/home.jpg"
import homeImage2 from "../../public/home2.jpg"
import homeImage3 from "../../public/home3.jpg"
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

const Home = () => {

    const autoplay = useRef(Autoplay({ delay: 2000 }));



    return (
        <Container fluid >
            <Container fluid m="2rem">
                <Title order={1} mb={"2rem"}>Working towards technology to improve <br /> community engagement </Title>
                <Grid gutter="xl">
                    <Grid.Col span={6}>
                        <Flex
                            gap="md"
                            justify="flex-start"
                            align="flex-start"
                            direction="column"
                            wrap="wrap"
                        >
                            <Card withBorder p="1rem" radius="md" className={classes.card}>
                                <Title order={2}>
                                    ABOUT US
                                </Title>
                                <Text pt={"1rem"} pb="1rem">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Text>
                            </Card>
                            <Card withBorder p="1rem" radius="md" className={classes.card}>
                                <Title order={2}>
                                    WHAT WE DO
                                </Title>
                                <Text pt={"1rem"} pb="1rem">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Text>
                            </Card>
                            <Card withBorder p="1rem" radius="md" className={classes.card}>
                                <Title order={2}>
                                    OUR TEAM
                                </Title>
                                <Text pt={"1rem"} pb="1rem">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Text>
                            </Card>
                        </Flex>

                    </Grid.Col>
                    <Grid.Col span={6}>
                        <HomeImage url={homeImage2} />
                        <div className={classes.second}>
                            <HomeImage url={homeImage3} />
                        </div>

                    </Grid.Col>
                </Grid>
            </Container>
            <Container className={classes.vendor} fluid bg="var(--mantine-color-blue-light)">
                <Container fluid p={"3rem"} pb={"7rem"}>
                    <Center>
                        <Title order={1} mt="1rem">
                            For Vendor , follow this to submit a new use case
                        </Title>
                    </Center>

                    <Grid mt="6rem" gutter="xl">
                        <Grid.Col span={6}>
                            <Title order={2}>
                                Step 1 : Create new Account
                            </Title>
                            <Text pt={"1rem"}>
                                A vendor can navigate either to vendor navigation<br />
                                tab or clikc on login to my venodr button down below and slect doesn't have<br />
                                an account option
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Title order={2}>
                                Step 2 : Set up an Account
                            </Title>
                            <Text pt={"1rem"}>
                                A vendor can create an account by signing-up adminfilling all the necessary deatils such as ABN ,<br />
                                Email , Phone Number etc
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Grid mt="4rem"gutter="xl">

                        <Grid.Col span={6}>
                            <Title order={2}>
                                Step 2 : Set up an Account
                            </Title>
                            <Text pt={"1rem"}>
                                A vendor can create an account by signing-up adminfilling all the necessary deatils such as ABN ,<br />
                                Email , Phone Number etc
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Title order={2}>
                                Step 2 : Set up an Account
                            </Title>
                            <Text pt={"1rem"}>
                                A vendor can create an account by signing-up adminfilling all the necessary deatils such as ABN ,<br />
                                Email , Phone Number etc
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Center  pt={"6rem"}>
                        <Button size="lg" mr="10rem" >Login to Vendor portal</Button>
                    </Center>
                </Container>

            </Container>

        </Container>
    )
}

const HomeImage = ({ url }: { url: string }) => {
    return (<>
        <Container>
            <Card className={classes.img1} shadow="sm" padding="lg" radius="md" withBorder />
            <Image h={300} w={450} src={url} className={classes.img} />
            <Card className={classes.img2} shadow="sm" padding="lg" radius="md" withBorder />
        </Container>
    </>)
}






export default Home