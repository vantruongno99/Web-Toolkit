import React, { useEffect, useState } from "react";
import { Flex, Button, Image, Title, Text, Container, Center, NumberInput, Input, Box, Loader, Tabs, Table, Space, Anchor, Group, Divider, Grid, TextInput } from "@mantine/core";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import vendorService from "../Services/vendor.service";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import { VendorInfo } from "../Ultils/type";
import loginImage from "../../public/login.jpg"
import { showErorNotification } from "../Ultils/notification";


const Vendor = () => {
    let { id } = useParams();

    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['vendor', 'id', Number(id)],
        queryFn: async () => {
            try {
                if (Number(id)) {
                    const res = await vendorService.getVendor(Number(id))
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
                <VendorDetail vendor={data} isLoading={isLoading} />
                <Divider size="md" mt={"1rem"} mb={"2rem"} color={"dark"} />
                <VendorApplication vendor={data} isLoading={isLoading} />

            </Container>
        </>
    )

}


const VendorDetail = ({ vendor, isLoading }: { vendor: VendorInfo, isLoading: boolean }) => {

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
            phone: (value: string) => (value.length < 10 ? 'phone must have at least 10 letters' : null),
            email: isEmail('Invalid email'),
        },
    });

    useEffect(() => {
        form.setValues(vendor)
    }, [vendor])

    return (<>

<Grid>
                <Grid.Col span={6} pl="7rem">
                <Grid.Col span={6}>
                <Title c="indigo" mt={"1rem"} order={3} >DETAILS</Title>
                <Space h="xl" />
                <Box maw={440} >
                    <Input.Wrapper
                        label="Name :"
                    >
                        <TextInput size="md" value={form.values.name} />
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
                        <TextInput value={form.values.email} size="md" />
                    </Input.Wrapper>

                    <Input.Wrapper
                        label="Phone :"
                        mt={"1rem"}
                    >
                        <TextInput value={form.values.phone} size="md" />
                    </Input.Wrapper>
                    <Input.Wrapper
                        label="Link :"
                        mt={"1rem"}
                    >
                        <Anchor href={form.values.link} target="_blank">
                            <TextInput value={form.values.link} size="md" />
                        </Anchor>
                    </Input.Wrapper>
                </Box>
            </Grid.Col>
                </Grid.Col>
                <Grid.Col span={6}>
                        <Image src={loginImage} />
                    </Grid.Col>
            </Grid>
    </>)
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

    const rows = localQuery?.data && localQuery?.data.filter(a => a.approved === "APPROVED").map((e: any, i: number) => (
        <Table.Tr key={i} onClick={() => !userSearch && navigate(`/data/application/${e.Application.id}?type=vendor&id=${e.Vendor.id}`)}>
            <Table.Td>{e.Application.potentialApplications}</Table.Td>
        </Table.Tr>
    )
    )


    return (
        <Container>
            <Center>  <Title c={"indigo"} mt={"1rem"} mb={"1rem"} order={3}>OFFERED APPLICATION </Title></Center>
            <Table striped >
                <Table.Thead >
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

        </Container>)
}




export default Vendor