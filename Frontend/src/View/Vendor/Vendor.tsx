import React, { useEffect, useState } from "react";
import { Flex, Button, Image, Title, Text, Container, Center, NumberInput, Input, Box, Loader, Tabs, Table, Space, Anchor, Group, Divider, Grid, TextInput } from "@mantine/core";
import classes from './Vendor.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import vendorService from "../../Services/vendor.service";
import { useError } from "../../Hook";
import { LandingData, VendorEdit, VendorInfo } from "../../Ultils/type";
import Cookies from "js-cookie";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import loginImage from "../../../public/login.jpg"
import { showErorNotification, showSuccessNotification } from "../../Ultils/notification";

const Vendor = () => {

    const errorMessage = useError()


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


    const updateApplication = useMutation({
        mutationFn: async (input: VendorEdit
        ) => {
            if (data && data.id) {
                return await vendorService.editVendor(data.id, input)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vendor', vendorABN] })
            showSuccessNotification("Vendor has been updated")
        }
    })

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
            <Container fluid p={"2rem"} >
                <VendorDetail vendor={data} isLoading={isLoading} update={updateApplication} />
                <Divider size="md" mt={"1rem"} mb={"2rem"} color={"dark"} />
                <Container className={classes.vendor} fluid bg="var(--mantine-color-blue-light)">
                    <Container fluid p={"3rem"} pb={"7rem"}>
                        <Center>
                            <Title order={1} mt="1rem">
                                For Vendor , follow this to submit a new use case
                            </Title>
                        </Center>

                        <Grid mt="6rem" gutter="xl">
                            <Grid.Col mt="2rem" span={6}>
                                <Title order={2}>
                                    Step 1 : Create new Account
                                </Title>
                                <Text pt={"1rem"} size="lg">
                                    A vendor can navigate either to vendor navigation<br />
                                    tab or clikc on login to my venodr button down below and slect doesn't have<br />
                                    an account option
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Title order={2}>
                                    Step 2 : Set up an Account
                                </Title>
                                <Text pt={"1rem"} size="lg">
                                    A vendor can create an account by signing-up adminfilling all the necessary deatils such as ABN ,<br />
                                    Email , Phone Number etc
                                </Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt="4rem" gutter="xl">

                            <Grid.Col span={6}>
                                <Title order={2}>
                                    Step 2 : Set up an Account
                                </Title>
                                <Text pt={"1rem"} size="lg">
                                    A vendor can create an account by signing-up adminfilling all the necessary deatils such as ABN ,<br />
                                    Email , Phone Number etc
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Title order={2}>
                                    Step 2 : Set up an Account
                                </Title>
                                <Text pt={"1rem"} size="lg">
                                    A vendor can create an account by signing-up adminfilling all the necessary deatils such as ABN ,<br />
                                    Email , Phone Number etc
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </Container>

                </Container>
                <Divider size="md" mt={"1rem"} mb={"2rem"} color={"dark"} />
                <VendorApplication vendor={data} isLoading={isLoading} />

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
            email: isEmail('Invalid email'),
        },
    });


    const handleUpdate = async (data: VendorInfo) => {
        const input = (({ email, link, phone }) => ({ email, link, phone }))(data);
        update.mutateAsync(input)
    }


    useEffect(() => {
        form.setValues(vendor)
    }, [vendor])


    return (
        <>
            <Grid>
                <Grid.Col span={6} pl="7rem">
                    <Title c="indigo" mt={"1rem"} mb={"1rem"} order={2} >DETAILS</Title>
                    <Box maw={300} >
                        <form onSubmit={form.onSubmit(handleUpdate)}>
                            <Input.Wrapper
                                label="Name :"
                            >
                                <TextInput size="md" value={form.values.name} />
                            </Input.Wrapper>
                            <Input.Wrapper
                                label="ABN :"
                                mt={"1rem"}
                            >
                                <TextInput size="md" value={form.values.ABN} />
                            </Input.Wrapper>
                            <Input.Wrapper
                                label="Email :"
                                mt={"1rem"}
                            >
                                <TextInput   {...form.getInputProps('email')} size="md" />
                                <Input.Wrapper
                                    label="Phone :"
                                    mt={"1rem"}
                                >
                                    <TextInput   {...form.getInputProps('phone')} size="md" />
                                </Input.Wrapper>
                            </Input.Wrapper>
                            <Input.Wrapper
                                label="Link :"
                                mt={"1rem"}
                            >
                                <TextInput   {...form.getInputProps('link')} size="md" />
                            </Input.Wrapper>

                            <Button size="lg" color="indigo" mt={"2rem"} mb={"1rem"} disabled={!form.isDirty() || update.isPending} type="submit">SAVE</Button>
                        </form>
                    </Box>
                </Grid.Col>
                <Grid.Col span={6}>
                        <Image src={loginImage} />
                    </Grid.Col>
            </Grid>



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
            catch (e:any) {
                showErorNotification(e.message)
            }
        }
    }
    )

    const rows = localQuery?.data && localQuery?.data.map((e: any, i: number) => (
        <Table.Tr key={i} onClick={() => !userSearch && navigate(`/data/application/${e.Application.id}?type=vendor&id=${e.Vendor.id}`)}>
            <Table.Td>{e.Application.potentialApplications}</Table.Td>
            <Table.Td>{e.approved}</Table.Td>
        </Table.Tr>
    )
    )


    return (
        <>
            <Center>  <Title c={"indigo"} mt={"1rem"} mb={"1rem"} order={3}>OFFERED APPLICATION </Title></Center>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead >
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>APPROVAL</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Center>
                <Button size="lg" mt="2rem" onClick={() => navigate(`/find?type=vendor&id=${vendor.id}`)}>Add new offer </Button>
            </Center>
        </>)
}




export default Vendor