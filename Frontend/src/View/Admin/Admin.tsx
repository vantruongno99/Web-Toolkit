import { Image, Flex, Button, Paper, Title, Text, Textarea, Grid, Select, MultiSelect, Divider, Modal, Group, TextInput, ActionIcon, Card, Center, Container, Box, PasswordInput } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import adminImage from "../../../public/login.jpg"
import ApplicationCard from "../../Component/ApplicationCard/ApplicationCard";



const Admin = () => {
    const cards = [
        {
            label: "Data Magemement",
            link: `/admin/data`,
            url : adminImage
        }, {
            label: "Approval",
            link: `/admin/approve`,
            url : adminImage

        }, {
            label: "Input",
            link: `/admin/input`,
            url : adminImage

        }, {
            label: "Vendor List",
            link: `/admin/vendors`,
            url : adminImage

        },
    ]


    return (
        <Container>
            <Center mt={"2rem"} mb={"1rem"}>
                <Title c="indigo">ADMIN PORTAL</Title>
            </Center>
            <Flex
                mt={"3rem"}
                gap="md"
                justify="center"
                align="center"
            >

               {cards.map((a,i)=><ApplicationCard data={{
                   label: a.label,
                   link: a.link,
                   imageUrl: a.url
               }}></ApplicationCard>)}

            </Flex>
        </Container>
    )

}



export default Admin