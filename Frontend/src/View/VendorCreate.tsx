import React from "react"
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Space, Input, Title, Container } from '@mantine/core';
import { useError } from "../Hook";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import vendorService from "../Services/vendor.service";
import { VendorInput } from "../Ultils/type";

const CreateVendor = () => {
    const errorMessage = useError()
    const navigate = useNavigate();

    const form = useForm({
        initialValues: { name: '', ABN: 0 },
        // functions will be used to validate values at corresponding key
        validate: {
            name: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null)
        },
    });

    const createVendor = useMutation({
        mutationFn: async (input: VendorInput) => {
            return await vendorService.createVendor(input)
        },
        onSuccess: () => {
            navigate("/vendor")
        },
        onError: (e: Error) => {
            console.log(e)
        },
    })


    return (
        <>
            <Container p={"1rem"}>
                <Title order={3}>DETAILS</Title>
                <Space h="xl" />
                <Box maw={320}>
                    <form onSubmit={form.onSubmit(data => createVendor.mutate(data))}>
                        <Input.Wrapper

                            label="Name :" placeholder="Name"
                        >
                            <TextInput  {...form.getInputProps('name')} />
                        </Input.Wrapper>
                        <Space h="xs" />
                        <Input.Wrapper

                            label="ABN :" placeholder="ABN"
                        >
                            <NumberInput {...form.getInputProps('ABN')} />
                        </Input.Wrapper>

                        <Space h="md" />
                        <Button type="submit" disabled={createVendor.isPending} mt="sm">
                            Save
                        </Button>
                        <Space h="md" />
                        {errorMessage.value}
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default CreateVendor