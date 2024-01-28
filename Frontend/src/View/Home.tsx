import React from "react";
import { Flex, Button, Paper, Title, Text, Grid ,Image, Divider} from "@mantine/core";
import classes from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { LandingData } from "../Ultils/type";
import homeImage from "../../public/cover.jpeg"

const Home = () => {

    const data: LandingData[] = [
        {
            title: "Admin Portal",
            description: "Admin only",
            link: '/admin'
        },
        {
            title: " About ",
            description: "Learn more",
            link: '/about'
        },
        {
            title: "Toolkit : Find solutions",
            description: "Find",
            link: '/find'
        },
        {
            title: "Vendor Portal",
            description: "Learn more",
            link: '/vendor'

        }
    ]

    return (
        <>
         <Grid gutter="lg">
                <Grid.Col span={6} p={"2rem"}>
                    <Title order={3}>
                        WE ARE
                    </Title>
                    <Text mt={"1rem"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras non sem rhoncus, hendrerit felis malesuada, ornare nulla.
                        Maecenas eu placerat urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                        Morbi ut fringilla lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    </Text>
                    <Button variant="filled" color="indigo" mt={"2rem"} component="a" href="/about">
                        FIND OUT MORE
                    </Button>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Image
                        radius="md"
                        src={homeImage}
                        h={300}
                    />
                </Grid.Col>
            </Grid>
            <Divider size="md" mt={"2rem"} />
            <Flex
            mt="2rem"
                mih={100}
                gap="lg"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            >
                {data.map((d,i) => <Card data={d} key={i} />)}
            </Flex>
        </>
    )
}


const Card = ({ data }: { data: LandingData }) => {
    const navigate = useNavigate()
    return (<>
        <Paper onClick={() => {
            navigate(`${data.link}`)
        }} shadow="md" p="xl" radius="md" className={classes.card}>
            <div>

                <Title order={3} className={classes.title}>
                    {data.title}
                </Title>
                <Text className={classes.category} size="xs">
                    {data.description}

                </Text>
            </div>
        </Paper>
    </>)
}




export default Home