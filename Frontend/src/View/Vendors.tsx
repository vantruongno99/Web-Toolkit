import React from "react";
import { Flex, Button, Paper, Title, Text, Container } from "@mantine/core";
import classes from './Home.module.css';
import { LandingData } from "../type";
import { useNavigate } from 'react-router-dom';


const Vendor = () => {

    const navigate = useNavigate()


    return (
        <>
            <Container p="2rem">
                <Title>ABOUT THE TOOLKIT</Title>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non sem rhoncus, hendrerit felis malesuada, ornare nulla. Maecenas eu placerat urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ut fringilla lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </Text>
                <Flex
                    mih={50}
                    gap="xl"
                    justify="center"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                >
                    <Button onClick={() => {
                        navigate(`/vendor/create`)
                    }}>Register</Button>
                    <Button onClick={() => {
                        navigate(`/vendor/list`)
                    }}>List</Button>

                </Flex>
            </Container>
        </>
    )

}




export default Vendor