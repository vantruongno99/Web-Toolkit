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
                <Title>Vendor Portal</Title>
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