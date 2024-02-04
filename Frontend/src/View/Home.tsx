import { Flex, Button, Paper, Title, Text, Grid, Image, Divider, Container, TextInput, Card, Center } from "@mantine/core";
import classes from './Home.module.css';
import homeImage2 from "../../public/home2.jpg"
import homeImage3 from "../../public/home3.jpg"
import dataService from "../Services/data.service";
import { useQuery } from "@tanstack/react-query";
import { showErorNotification } from "../Ultils/notification";
import { domain } from "../Ultils/config";


const Home = () => 
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
                                <Text pt={"1rem"} pb="1rem" size="lg">
                                    Join us at the Transport Accident Commission (TAC) on our journey to create a safer future.
                                    With a commitment to eliminating road deaths and injuries by 2050, we've launched this toolkit, embodying our relentless dedication to ensuring every journey is synonymous with safety.
                                </Text>
                            </Card>
                            <Card withBorder p="1rem" radius="md" className={classes.card}>
                                <Title order={2}>
                                    Our Vision
                                </Title>
                                <Text pt={"1rem"} pb="1rem" size="lg">
                                    TAC envisions a future without road fatalities or injuries by 2050.
                                    Our commitment propels us to surmount challenges in implementing safety improvements, advocating for community support through best practice engagement for a secure journey.
                                </Text>
                            </Card>
                            <Card withBorder p="1rem" radius="md" className={classes.card}>
                                <Title order={2}>
                                    OUR TEAM
                                </Title>
                                <Text pt={"1rem"} pb="1rem" size="lg">
                                    Our TAC team, driven by a passion for a safer future, created this toolkit to tackle road safety challenges.
                                    In a dynamic tech landscape, we make innovations accessible, offering updated info, practical cases, and showcasing service providers, breaking adoption barriers through technology.
                                </Text>
                            </Card>
                            <Button component="a"
                                href="/about"
                                mt={"2rem"} size="lg" color={"indigo"}>FIND OUT MORE</Button>
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
                            <Text pt={"1rem"} size="lg">
                                A vendor can navigate either to vendor navigation<br />
                                tab or clikc on login to my venodr button down below and slect doesn't have<br />
                                an account option
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Title order={2}>
                                Step 2 : Set up an Account
                            </Title>
                            <Text pt={"1rem"} size="lg">
                                A vendor can create an account by signing-up adminfilling all the necessary deatils such as ABN ,<br />
                                Email , Phone Number etc
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Grid mt="4rem" gutter="xl">

                        <Grid.Col span={6}>
                            <Title order={2}>
                                Step 2 : Set up an Account
                            </Title>
                            <Text pt={"1rem"} size="lg">
                                A vendor can create an account by signing-up adminfilling all the necessary deatils such as ABN ,<br />
                                Email , Phone Number etc
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Title order={2}>
                                Step 2 : Set up an Account
                            </Title>
                            <Text pt={"1rem"} size="lg">
                                A vendor can create an account by signing-up adminfilling all the necessary deatils such as ABN ,<br />
                                Email , Phone Number etc
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Center pt={"6rem"}>
                        <Button
                            component="a"
                            href="/login"
                            size="lg" mr="10rem" >GO TO LOGIN</Button>
                    </Center>
                </Container>

            </Container>

        </Container>

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