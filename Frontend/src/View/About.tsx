import { Title, Text, Grid, Container, Divider, Image } from "@mantine/core";
import homeImage from "../../public/home.jpg"
import aboutImage from "../../public/about.jpg"


const About = () => {



    return (
        <Container fluid pl="4rem" pr="4rem" pt={"2rem"}>
             <Grid gutter="lg" pb={"2rem"}>
                <Grid.Col span={6} p={"2rem"}>
                    <Title>About Us</Title>
                    <Text  size="lg" mt={"1rem"}>Welcome to the Transport Accident Commission (TAC), where our journey toward a safer future begins.
                     Committed to our vision of eradicating deaths and serious injuries on roads by 2050, we have initiated the development of this toolkit.
                      Our dedication extends beyond mere intentions, reflecting a continuous effort to create a future where every journey is synonymous with safety.
                    </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Image
                        radius="md"
                        src={homeImage}
                        h={300}
                    />
                </Grid.Col>
            </Grid>
            <Divider size="lg" color={"dark"}/>
            <Grid pt="2rem" pb="2rem">
                <Grid.Col span={6}>
                    <Image
                        radius="md"
                        src={aboutImage }
                        h={300}
                    />
                </Grid.Col>
                <Grid.Col span={6} pl="4rem" p={"2rem"}>
                    <Title>Our Vision</Title>
                    <Text  size="lg" mt={"1rem"}>At TAC, we aspire to usher in an era where roads are free from the specter of fatalities and severe injuries by the year 2050.
                     Envisaging a future where every journey is inherently secure, our commitment propels us to overcome challenges associated with implementing road safety improvements.
                      We recognize that garnering community support is paramount for the realization of this vision, and we advocate for it through the application of best practice community engagement methods.
                    </Text>
                </Grid.Col>
            </Grid>
            <Divider size="lg" color={"dark"}/>
            <Grid gutter="lg"pb={"1rem"} pt="2rem">
                <Grid.Col span={6} p={"2rem"}>
                    <Title>Our Team</Title>
                    <Text  size="lg" mt={"1rem"}>Behind the creation of this toolkit stands the dedicated team at TAC.
                     Comprising passionate individuals driven by the vision of a safer future, we understand the challenges and objections that may arise in the pursuit of road safety enhancements.
                      In an ever-evolving landscape of technological innovation, our team is committed to making these advancements accessible. This toolkit is designed not only for community engagement practitioners but also for those unfamiliar with emerging technologies.
                       Providing updated information, practical use cases, and showcasing companies offering relevant services, our team strives to lower the barriers to adopting these innovative solutions.
                    </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Image
                        radius="md"
                        src={homeImage}
                        h={300}
                    />
                </Grid.Col>
            </Grid>
        </Container>
    )

}




export default About