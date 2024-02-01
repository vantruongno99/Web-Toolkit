import { Image ,Flex, Button, Paper, Title, Text, Textarea, Grid, Select, MultiSelect, Divider, Modal, Group, TextInput, ActionIcon, Card, Center, Container, Box, PasswordInput } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useMutation } from "@tanstack/react-query";
import authservice from "../../Services/auth.service";
import { forEach } from "lodash";
import adminImage from "../../../public/admin.jpg"



const Admin = () => {
    const navigate = useNavigate()
    const [showed, setShowed] = useState<Boolean>(false)

    useEffect(() => {
        if (Cookies.get("role") === "admin") {
            setShowed(true)
        }
    }, [])

    const form = useForm<{ password: string }>({
        initialValues: {
            password: '',
        },

        validate: {
            password: (value) => value == '12345678' ? null : 'Invalid email',
        },
    });


    const login = useMutation({
        mutationFn: async (input: string) => {
            return await authservice.loging(
                {
                    username: "admin",
                    password: input
                }
            )
        },
        onSuccess: () => {
            setShowed(true)
        },
        onError: (e: Error) => {
            form.setErrors({ password: "Incorrect" })
        },
    })

    const handleSubmit = (input: { password: string }) => {
        login.mutateAsync(input.password)
    }



    if (!showed)
        return (<>
            <Container fluid p="2rem">
                <Grid>
                    <Grid.Col span={6}>
                        <Box mt={"2rem"} maw={500} mx="auto">
                            <form onSubmit={form.onSubmit(handleSubmit)}>
                                <Title c="indigo" mt={"2rem"} order={2}>Admin Login</Title>
                                <Text size="xs">Please use 12345678 for now </Text>
                                <PasswordInput
                                label="Password"
                                    mt={"1rem"}
                                    withAsterisk
                                    {...form.getInputProps('password')}
                                    size="lg"
                                />

                                <Group justify="flex-start" mt="2rem">
                                    <Button size="lg" type="submit">Log in</Button>
                                </Group>
                            </form>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                    <Image h={800} src={adminImage} />

                    </Grid.Col>
                </Grid>

            </Container >
        </>)


    return (
        <Container>
            <Center mt={"2rem"} mb={"1rem"}>
                <Title c="indigo">ADMIN PORTAL</Title>
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
                <Button onClick={() => navigate(`/admin/vendor`)}>Vendor List</Button>

            </Flex>
        </Container>
    )

}



export default Admin