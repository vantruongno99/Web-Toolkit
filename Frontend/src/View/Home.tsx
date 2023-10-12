import React from "react";
import { Flex, Button, Paper, Title, Text } from "@mantine/core";
import classes from './Home.module.css';
import { LandingData } from "../type";
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const data: LandingData[] = [
        {
            title: "Admin Portal",
            description: "Admin only",
            link: '/admin'
        },
        {
            title: "About this toolkit ",
            description: "Learn more",
            link: '/toolkit'
        },
        {
            title: "About community engagement​",
            description: "Learn more",
            link: '/ca'
        },
        {
            title: "Engagement tool",
            description: "Find",
            link: '/list'
        },
        {
            title: "Vendor Portal",
            description: "Admin only",
            link: '/vendor'

        }
    ]

    return (
        <>
            <Flex
                mih={100}
                gap="lg"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            >
                {data.map(d => <Card data={d} />)}
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
                    {data.description}
                </Title>
                <Text className={classes.category} size="xs">
                    {data.title}
                </Text>
            </div>
        </Paper>
    </>)
}




export default Home