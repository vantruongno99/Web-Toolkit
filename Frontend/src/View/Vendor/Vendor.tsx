import React, { useEffect, useState } from "react";
import { Flex, Button, Paper, Title, Text, Container, Center, NumberInput, Input, Box, Loader, Tabs, Table, Space, Anchor, Group } from "@mantine/core";
import classes from './Home.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import vendorService from "../../Services/vendor.service";
import { useError } from "../../Hook";
import { LandingData, VendorEdit, VendorInfo } from "../../Ultils/type";
import Cookies from "js-cookie";
import { useForm, isNotEmpty } from "@mantine/form";


const Vendor = () => {

    const navigate = useNavigate()
    const [showed, setShowed] = useState<boolean>(false)
    const [ABN, setABN] = useState<string | number>('')
    const errorMessage = useError()


    const ABNCheck = useMutation({
        mutationFn: async (input: string | number) => {
            const ABN = Number(input)
            const output = await vendorService.getVendorByABN(ABN)
            return output
        },
        onSuccess: (result) => {
            Cookies.set("ABN", String(result?.ABN))
            setShowed(true)
        },
        onError: (e) => {
            errorMessage.set("No Vendor found with this ABN")
        },
    })


    const vendorABN = Number(Cookies.get("ABN"))

    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['vendor', vendorABN],
        queryFn: async () => {
            try {
                if (vendorABN) {
                    const res = await vendorService.getVendorByABN(vendorABN)
                    if (!res) {
                        throw new Error()
                    }
                    setShowed(true)

                    return res
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    )

    const queryClient = useQueryClient()


    const updateApplication = useMutation({
        mutationFn: async (input: VendorEdit
        ) => {
            return await vendorService.editVendor(vendorABN, input)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vendor', vendorABN] })
        }
    })

    if (!showed) {
        return (<>
            <Container p="2rem" maw={600}>
                Enter your ABN to continue
                <Input.Wrapper
                    label="ABN :"
                    mt={"1rem"}
                >
                    <NumberInput width="1px" value={ABN} onChange={setABN} size="md" />
                </Input.Wrapper>
                <Group justify="space-between" mt="xl">
                    <a href="/vendor/create">Don't have an account? Register</a>
                    <Button  onClick={() => ABNCheck.mutateAsync(ABN)}>Continue</Button>
                </Group>
                {errorMessage.value !== " " && <Text c="red">
                    {errorMessage.value}
                </Text>}
            </Container>

        </>)
    }



    if (isLoading) {
        return <Loader />
    }


    if (!data) {
        return <>
            404
        </>
    }



    return (
        <>
            <Container mt={"1rem"}>
                <Tabs defaultValue="detail">
                    <Tabs.List justify="center">
                        <Tabs.Tab value="detail">DETAILS</Tabs.Tab>
                        <Tabs.Tab value="applications">APPLICATIONS</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="detail">
                        <VendorDetail vendor={data} isLoading={isLoading} update={updateApplication} />
                    </Tabs.Panel>
                    <Tabs.Panel value="applications">
                        <VendorApplication vendor={data} isLoading={isLoading} />
                    </Tabs.Panel>

                </Tabs>
            </Container>
        </>
    )

}


const VendorDetail = ({ vendor, isLoading, update }: { vendor: VendorInfo, isLoading: boolean, update: UseMutationResult<void, Error, VendorEdit, unknown> }) => {

    const [searchParams] = useSearchParams();
    const userSearch = searchParams.get('type') === "user"
    const form = useForm<VendorInfo>({
        initialValues: {
            name: "",
            ABN: 0,
            id: 0,
            email: "",
            link: "",
            phone: ""
        },
        validate: {
            phone: (value) => (value.length < 10 ? 'phone must have at least 10 letters' : null),
            email: isNotEmpty('Email must not be empty'),
        },
    });


    const handleUpdate = async (data: VendorInfo) => {
        const input = (({ email, link, phone }) => ({ email, link, phone }))(data);
        update.mutateAsync(input)
    }


    useEffect(() => {
        form.setValues(vendor)
    }, [vendor])

    if (userSearch) {
        return (<>
            <Title mt={"1rem"} order={3} >INFORMATION</Title>
            <Space h="xl" />
            <Box maw={440} >
                <Input.Wrapper
                    label="Name :"
                >
                    <Input size="md" value={form.values.name} />
                </Input.Wrapper>
                <Input.Wrapper
                    label="ABN :"
                    mt={"1rem"}
                >
                    <NumberInput value={form.values.ABN} size="md" />
                </Input.Wrapper>
                <Input.Wrapper
                    label="Email :"
                    mt={"1rem"}
                >
                    <Input value={form.values.email} size="md" />
                </Input.Wrapper>

                <Input.Wrapper
                    label="Phone :"
                    mt={"1rem"}
                >
                    <Input value={form.values.phone} size="md" />
                </Input.Wrapper>
                <Input.Wrapper
                    label="Link :"
                    mt={"1rem"}
                >
                    <Anchor href={form.values.email} target="_blank">
                        <Input value={form.values.email} size="md" />
                    </Anchor>
                </Input.Wrapper>
            </Box>
        </>)
    }

    return (
        <>
            <Title mt={"1rem"} order={3} >INFORMATION</Title>
            <Space h="xl" />
            <Box maw={440} >
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <Input.Wrapper
                        label="Name :"
                    >
                        <Input size="md" value={form.values.name} />
                    </Input.Wrapper>
                    <Input.Wrapper
                        label="ABN :"
                        mt={"1rem"}
                    >
                        <Input size="md" value={form.values.ABN} />
                    </Input.Wrapper>
                    <Input.Wrapper
                        label="Email :"
                        mt={"1rem"}
                    >
                        <Input   {...form.getInputProps('email')} size="md" />
                        <Input.Wrapper
                            label="Phone :"
                            mt={"1rem"}
                        >
                            <Input   {...form.getInputProps('phone')} size="md" />
                        </Input.Wrapper>
                    </Input.Wrapper>
                    <Input.Wrapper
                        label="Link :"
                        mt={"1rem"}
                    >
                        <Input   {...form.getInputProps('link')} size="md" />
                    </Input.Wrapper>

                    <Button mt={"2rem"} mb={"1rem"} disabled={!form.isDirty() || update.isPending} type="submit">Save</Button>
                </form>
            </Box>


        </>
    )
}

const VendorApplication = ({ vendor, isLoading }: { vendor: VendorInfo, isLoading: boolean }) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const userSearch = searchParams.get('type') === "user"
    const localQuery = useQuery({
        queryKey: ['vendorApplication', vendor.id],
        queryFn: async () => {
            try {
                const res = await vendorService.getAllVendorApplication(vendor.id)
                if (!res) {
                    throw new Error()
                }
                console.log(res)

                return res
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    )

    const rows = localQuery?.data && localQuery?.data.map((e, i) => (
        <Table.Tr key={i} onClick={() => !userSearch && navigate(`/data/application/${e.Application.id}?type=vendor&id=${e.Vendor.id}`)}>
            <Table.Td>{e.Application.potentialApplications}</Table.Td>
            <Table.Td>{e.approved}</Table.Td>
        </Table.Tr>
    )
    )


    return (
        <>
            <Button mb="1rem" onClick={() => !userSearch && navigate(`/find?type=vendor&id=${vendor.id}`)}>Application List</Button>
            <Table >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>APPROVAL</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>)
}




export default Vendor