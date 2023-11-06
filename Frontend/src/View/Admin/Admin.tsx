import { Flex, Button, Paper, Title, Text, Textarea, Grid, Select, MultiSelect, Divider, Modal, Group, TextInput, ActionIcon, Card, Center, Container, Box, PasswordInput } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import { useForm } from "@mantine/form";
import { useState } from "react";
import Cookies from 'js-cookie';



const Admin = () => {
    const navigate = useNavigate()
    const [showed, setShowed] = useState<Boolean>(false)

    const form = useForm<{ password: string }>({
        initialValues: {
            password: '',
        },

        validate: {
            password: (value) => value == '12345678' ? null : 'Invalid email',
        },
    });

    const handleSubmit = (input: { password: string }) => {
        setShowed(true)
        Cookies.set("role","admin")
    }



    if (!showed)
        return (<>
            <Container>
                <Box mt={"2rem"} maw={340} mx="auto">
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Title mt={"2rem"} mb={"1rem"} order={4}>Enter password to continue</Title>
                        <PasswordInput
                            withAsterisk
                            placeholder="password"
                            {...form.getInputProps('password')}
                        />

                        <Group justify="flex-start" mt="1rem">
                            <Button type="submit">Submit</Button>
                        </Group>
                    </form>
                </Box>
            </Container>
        </>)


    return (
        <Container>
            <Center mt={"2rem"} mb={"1rem"}>
                <Title>Admin Portal</Title>
            </Center>
            <Flex
                mt={"2rem"}
                mb="2rem"
                gap="md"
                justify="center"
                align="center"
                wrap="wrap"
            >
                <Button onClick={() => navigate(`/admin/data`)}>Data Magemement</Button>
                <Button onClick={() => navigate(`/admin/approve`)}>Approval Magemement</Button>
                <Button onClick={() => navigate(`/admin/input`)}>Input Magemement</Button>
            </Flex>
        </Container>
    )

}



export default Admin