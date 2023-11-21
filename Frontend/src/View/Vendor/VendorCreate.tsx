import React from "react"
import { useForm, isEmail ,isNotEmpty } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Space, Input, Title, Container ,Text} from '@mantine/core';
import { useError } from "../../Hook";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import vendorService from "../../Services/vendor.service";
import { VendorInput } from "../../Ultils/type";

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
            return res
        },
        onSuccess: (res) => {
            navigate(`/vendor/${res?.id}`)
        },
        onError: (e: Error) => {
            form.setErrors({ABN :"ABN is not valid"})
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

                            label="ABN :" placeholder="ABN"
                        >
                            <NumberInput {...form.getInputProps('ABN')} />
                        </Input.Wrapper>

                        <Input.Wrapper

                            label="Email :" placeholder="Email" mt={"1rem"}
                        >
                            <TextInput {...form.getInputProps('email')} />
                        </Input.Wrapper>
                        <Input.Wrapper

                            label="Phone :" placeholder="Phone" mt={"1rem"}
                        >
                            <TextInput  {...form.getInputProps('phone')} />
                        </Input.Wrapper>
                        <Input.Wrapper

                            label="Link :" placeholder="Link" mt={"1rem"}
                        >
                            <TextInput {...form.getInputProps('link')} />
                        </Input.Wrapper>

                        <Space h="md" />
                        <Button type="submit" disabled={createVendor.isPending} mt="sm">
                            Proceed
                        </Button>
                        <Space h="md" />
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default CreateVendor