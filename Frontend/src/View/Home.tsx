import { Flex, Button, Paper, Title, Text, Grid, Image, Divider, Container, TextInput, Card, Center, Box, Group } from "@mantine/core";
import classes from './Home.module.css';



const Home = () =>

    <>
        <Header />
        <Container pb={"2rem"} fluid bg="var(--mantine-color-indigo-light)">
            <Center>
                <Title  className={classes.header}  order={1} mt="2rem" mb={"3rem"}>HOW TO USE ENGAGEMENT TOOL KIT</Title>
            </Center>

            <Grid pt={"1rem"} pr={"2rem"} pl={"2rem"}>
                <Grid.Col span={5.5}>
                    <Card >
                        <Text size='lg' m={"1rem"}>
                            1.Discover the range of engagement techniques avaible in our library,
                            or use the search filters to narrow down yours option
                        </Text>
                    </Card>
                </Grid.Col>
                <Grid.Col span={1}>
                </Grid.Col>
                <Grid.Col span={5.5}>
                    <Card  >
                        <Text  size='lg' m={"1rem"}>
                            2. Would you like to sahre a technology tip or method?
                            Head over and login yoursalf to contribute your suggestion
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                    </Card>
                </Grid.Col>

            </Grid>
            <Center mt={"4rem"}>
                <Button
                    component="a"
                    href="/find"
                    variant="filled" color="indigo" size="lg">Explore methods</Button>
            </Center>
        </Container>

        <Container fluid m="2rem" pb={"1rem"}>
            <Center>
                <Title order={1} mb={"4rem"} >Working towards <span className={classes.underline} >technology</span > to improve community engagement </Title>
            </Center>
            <Grid gutter="xl">
                <Flex
                    gap="xl"
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                    wrap="wrap"
                >
                    <Card withBorder p="2rem" radius="md" className={classes.card}>
                        <Title order={2}>
                            ABOUT US
                        </Title>
                        <Text pt={"1rem"} pb="1rem" size="lg">
                            Join us at the Transport Accident Commission (TAC) on our journey to create a safer future.
                            With a commitment to eliminating road deaths and injuries by 2050, we've launched this toolkit, embodying our relentless dedication to ensuring every journey is synonymous with safety.
                        </Text>
                    </Card>
                    <Card withBorder p="2rem" radius="md" className={classes.card}>
                        <Title order={2}>
                            Our Vision
                        </Title>
                        <Text pt={"1rem"} pb="1rem" size="lg">
                            TAC envisions a future without road fatalities or injuries by 2050.
                            Our commitment propels us to surmount challenges in implementing safety improvements, advocating for community support through best practice engagement for a secure journey.
                        </Text>
                    </Card>
                    <Card withBorder p="2rem" radius="md" className={classes.card}>
                        <Title order={2}>
                            OUR TEAM
                        </Title>
                        <Text pt={"1rem"} pb="1rem" size="lg">
                            Our TAC team, driven by a passion for a safer future, created this toolkit to tackle road safety challenges.
                            In a dynamic tech landscape, we make innovations accessible, offering updated info, practical cases, and showcasing service providers, breaking adoption barriers through technology.
                        </Text>
                    </Card>

                </Flex>


            </Grid>
        </Container>
        <Container className={classes.vendor} fluid bg="var(--mantine-color-blue-light)">
            <Container fluid p={"3rem"} pb={"7rem"}>
                <Center>
                    <Title order={1} >
                        For <span className={classes.underline}>Vendor</span> , follow these steps to submit a new use case
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
                            Step 3 : Go to vendor portal
                        </Title>
                        <Text pt={"1rem"} size="lg">
                            A vendor can find a list of applications that they can apply request to offer ,<br />
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Title order={2}>
                            Step 4 : Offer a solution
                        </Title>
                        <Text pt={"1rem"} size="lg">
                            Inside Application detail , click a button to make a solution request<br />
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

    </>

const HomeImage = ({ url }: { url: string }) => {
    return (<>
        <Container>
            <Card className={classes.img1} shadow="sm" padding="lg" radius="md" withBorder />
            <Image h={300} w={450} src={url} className={classes.img} />
            <Card className={classes.img2} shadow="sm" padding="lg" radius="md" withBorder />
        </Container>
    </>)
}

const Header = () =>
    <>
        <div className={classes.cover}>
            <Flex
                mih={50}
                gap="md"
                justify="center"
                align="flex-start"

                direction="column"
                wrap="wrap"
            >

                <Title textWrap="balance" className={classes.title} >
                    EASY AND NOVEL WAYS TO ENGAGE COMMUNITY AROUND ROAD SAFETY
                </Title>
                <Title className={classes.title2}>
                    Injury-Free Roads by 2050
                </Title>
                <Button component="a"
                    href="/about"
                    variant="filled" color="violet" size="lg" >LEARN MORE</Button>
            </Flex>
        </div>
    </>






export default Home