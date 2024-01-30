import { Title, Text, Grid, Container, Divider, Image } from "@mantine/core";
import homeImage from "../../public/home.jpg"
import aboutImage from "../../public/about.jpg"


const About = () => {



    return (
        <Container fluid pl="4rem" pr="4rem" pt={"2rem"}>
             <Grid gutter="lg" pb={"2rem"}>
                <Grid.Col span={6} p={"2rem"}>
                    <Title>ABOUT THE TOOLKIT</Title>
                    <Text mt={"1rem"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non sem rhoncus, hendrerit felis malesuada, ornare nulla. Maecenas eu placerat urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ut fringilla lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
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
            <Grid pt="2rem" >
                <Grid.Col span={6}>
                    <Image
                        radius="md"
                        src={aboutImage }
                        h={300}
                    />
                </Grid.Col>
                <Grid.Col span={6} pl="4rem" p={"2rem"}>
                    <Title>Our Vision</Title>
                    <Text mt={"1rem"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non sem rhoncus, hendrerit felis malesuada, ornare nulla. Maecenas eu placerat urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ut fringilla lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    </Text>
                </Grid.Col>
            </Grid>
        </Container>
    )

}




export default About