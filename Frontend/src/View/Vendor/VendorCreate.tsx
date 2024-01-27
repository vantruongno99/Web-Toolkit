import React from "react"
import { useForm, isEmail, isNotEmpty } from '@mantine/form';
import { MantineThemeProvider, NumberInput, TextInput, Button, Box, Space, Input, Title, Container, Text, createTheme, Grid, GridCol } from '@mantine/core';
import { useError } from "../../Hook";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import vendorService from "../../Services/vendor.service";
import { VendorInput } from "../../Ultils/type";
import Cookies from "js-cookie";

const CreateVendor = () => {





    const errorMessage = useError()
    const navigate = useNavigate();

    const form = useForm({
        initialValues: { ABN: 0, email: ' ', link: '', phone: '' },
        // functions will be used to validate values at corresponding key
        validate: {
            phone: (value) => (value.length < 10 ? 'phone must have at least 10 letters' : null),
            ABN: (value) => (value.toString().length !== 11 ? 'ABN must have 11 numbers' : null),
            email: isNotEmpty('Email must not be empty'),

        },
    });

    const createVendor = useMutation({
        mutationFn: async (input: VendorInput) => {
            const res = await vendorService.createVendor({ ...input, ABN: Number(input.ABN) })
            if(!res){
                form.setErrors({ ABN: "ABN is not valid" })
            }
            return res
        },
        onSuccess: (res) => {
            if (res && res.ABN) {
                Cookies.set("ABN",String (res?.ABN))
            }
            navigate(`/vendor`)
        },
        onError: (e: Error) => {
            form.setErrors({ ABN: "ABN is not valid" })
        },
    })


    return (
        <>
            <Container p={"1rem"}>
                <Grid>
                    <Grid.Col span={6}>
                        <Title order={3}>Sign Up</Title>
                        <Space h="xl" />
                        <Box maw={320}>

                            <form onSubmit={form.onSubmit(data => createVendor.mutate(data))}>
                                <Input.Wrapper

                                    label="ABN" description=""
                                >
                                    <NumberInput {...form.getInputProps('ABN')} />
                                </Input.Wrapper>

                                <Input.Wrapper

                                    label="Email" mt={"1rem"}
                                >
                                    <TextInput {...form.getInputProps('email')} />
                                </Input.Wrapper>
                                <Input.Wrapper

                                    label="Phone" mt={"1rem"}
                                >
                                    <TextInput  {...form.getInputProps('phone')} />
                                </Input.Wrapper>
                                <Input.Wrapper

                                    label="Link" mt={"1rem"}
                                >
                                    <TextInput {...form.getInputProps('link')} />
                                </Input.Wrapper>

                                <Space h="md" />
                                <Button variant="filled" color="indigo" type="submit" disabled={createVendor.isPending} mt="sm">
                                    Sign Up
                                </Button>
                                <Space h="md" />
                            </form>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}

export default CreateVendor