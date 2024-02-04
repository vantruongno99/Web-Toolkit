import React, { useEffect, useState } from "react";
import { Image, Tabs, Button, Paper, Title, Text, Container, Center, NumberInput, Input, Box, Loader, Table, Space, Anchor, Group, Divider, Grid, PasswordInput } from "@mantine/core";
import classes from './Home.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import vendorService from "../Services/vendor.service";
import { useError } from "../Hook";
import { LandingData, VendorEdit, VendorInfo } from "../Ultils/type";
import Cookies from "js-cookie";
import { useForm, isNotEmpty } from "@mantine/form";
import authservice from "../Services/auth.service";
import loginImage from "../../public/login.jpg"
import { showErorNotification } from "../Ultils/notification";

const Login = () => {
    const [showed, setShowed] = useState<boolean>(false)
    const [ABN, setABN] = useState<string | number>('')
    const params = useParams();
    const isAdmin = params.role === "admin"
    const isUser = params.role === "user"
    const errorMessage = useError()
    const navigate = useNavigate()


    useEffect(() => {
        if (Cookies.get("logged") === "true") {
            if(Cookies.get("ABN")){
                navigate("/vendor")
            }
            else if(Cookies.get("role") === "admin"){
                navigate("/admin")
            }
            else {
                navigate("/")
            }
        }
    }, [])




    const vendorLogin = useMutation({
        mutationFn: async (input: string | number) => {
            const ABN = Number(input)
            const output = await vendorService.getVendorByABN(ABN)
            return output
        },
        onSuccess: (result: VendorInfo | undefined) => {
            Cookies.set("ABN", String(result?.ABN))
            Cookies.set("logged", "true")
            window.location.reload()
            navigate('/vendor')
        },
        onError: (e: Error) => {
            errorMessage.set("No Vendor found with this ABN")
        },
    })


    const form = useForm<{ password: string }>({
        initialValues: {
            password: '',
        },

        validate: {
            password: isNotEmpty("Password cant be empty")
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
        onError: (e: Error) => {
            form.setErrors({ password: "Incorrect" })
        },
    })

    const handleSubmit = (input: { password: string }) => {
        login.mutateAsync(input.password)
    }


    const vendorABN = Number(Cookies.get("ABN"))

    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['vendor', vendorABN],
        queryFn: async () => {
            try {
                if (isAdmin) {
                    setShowed(true)
                    return;
                }

                if (vendorABN) {
                    const res = await vendorService.getVendorByABN(vendorABN)
                    if (!res) {
                        throw new Error()
                    }
                    setShowed(true)

                    return res
                }
            }
            catch (e:any) {
                showErorNotification(e.message)
            }
        }
    }
    )

    const queryClient = useQueryClient()


    return (
        <div>
            <Tabs defaultValue="vendor">
                <Grid>
                    <Grid.Col span={6}>
                        <Container p={"1rem"}>
                            <Group>
                                Your are :
                                <Tabs.List>
                                    <Tabs.Tab value="vendor" >
                                        Vendor
                                    </Tabs.Tab>
                                    <Tabs.Tab value="admin" >
                                        Admin
                                    </Tabs.Tab>
                                </Tabs.List>
                            </Group>

                            <Tabs.Panel value="vendor">
                                <Box mt={"4rem"} maw={500} mx="auto">
                                    <Title c="indigo" mt={"2rem"} order={2}>Vendor Login</Title>
                                    <Input.Wrapper
                                        label="ABN"
                                        mt={"1rem"}
                                        withAsterisk
                                    >
                                        <NumberInput width="1px" value={ABN} onChange={setABN} size="md" />
                                    </Input.Wrapper>
                                    <Group justify="space-between" mt="xl">
                                        <a href="/vendor/create">Don't have an account? Register</a>
                                        <Button size="md" onClick={() => vendorLogin.mutateAsync(ABN)}>Continue</Button>
                                    </Group>
                                    {errorMessage.value !== " " && <Text c="red">
                                        {errorMessage.value}
                                    </Text>}
                                </Box>
                            </Tabs.Panel>

                            <Tabs.Panel value="admin">
                                <Box mt={"4rem"} maw={500} mx="auto">
                                    <form onSubmit={form.onSubmit(handleSubmit)}>
                                        <Title c="indigo" mt={"2rem"} order={2}>Admin Login</Title>
                                        <PasswordInput
                                            label="Password"
                                            mt={"1rem"}
                                            withAsterisk
                                            {...form.getInputProps('password')}
                                        />

                                        <Group justify="flex-end" mt="2rem">
                                            <Button size="md" type="submit">Log in</Button>
                                        </Group>
                                    </form>
                                </Box>
                            </Tabs.Panel>
                        </Container>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Image src={loginImage} />
                    </Grid.Col>

                </Grid>
            </Tabs>
        </div>
    )
}








export default Login