import React from "react";
import { Flex, Button, Paper, Title, Text } from "@mantine/core";
import classes from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { LandingData } from "../Ultils/type";


const Home = () => {

    const data: LandingData[] = [
        {
            title: "Admin Portal",
            description: "Admin only",
            link: '/admin'
        },
        {
            title: " Toolkit ",
            description: "Learn more",
            link: '/about'
        },
        {
            title: "Find solutions",
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