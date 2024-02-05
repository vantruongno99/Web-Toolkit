import React, { useEffect, useState } from "react";
import { Flex, Button, Paper, Title, Text, Container, Center, Image, Input, Box, Loader, Tabs, Table, Space, Anchor, Group, Divider, Grid, TextInput } from "@mantine/core";
import classes from './Home.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import vendorService from "../../Services/vendor.service";
import { useError } from "../../Hook";
import { LandingData, VendorEdit, VendorInfo } from "../../Ultils/type";
import Cookies from "js-cookie";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import { showErorNotification, showSuccessNotification } from "../../Ultils/notification";
import loginImage from "../../../public/login.jpg"
import { DeleteModal } from "../../Ultils/modals";

const AdminVendor = () => {

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
            catch (e: any) {
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
            queryClient.invalidateQueries({ queryKey: ['vendor', "id", Number(id)] })
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
            <Container fluid p={"2rem"}>
                <VendorDetail vendor={data} isLoading={isLoading} update={updateApplication} />
                <Divider size="md" mt={"1rem"} mb={"2rem"} color={"dark"} />
                <VendorApplication vendor={data} isLoading={isLoading} />

            </Container>
        </>
    )

}


const VendorDetail = ({ vendor, isLoading, update }: { vendor: VendorInfo, isLoading: boolean, update: UseMutationResult<void, Error, VendorEdit, unknown> }) => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            name: "",
            ABN: 0,
            id: 0,
            email: "",
            link: "",
            phone: ""
        },
        // functions will be used to validate values at corresponding key
        validate: {
            phone: (value) => (value.length < 10 ? 'phone must have at least 10 letters' : null),
            ABN: (value) => (value.toString().length !== 11 ? 'ABN must have 11 numbers' : null),
            email: isEmail('Invalid email'),
        },
    });

    const deleteVendor = useMutation({
        mutationFn: async () => {
            return await vendorService.deleteVendor(vendor.id)

        },
        onSuccess: () => {
            navigate(`/admin/vendors`)
            showErorNotification("Vendor has been successfully deleted")
        },
        onError: (e) => {
            showErorNotification(e.message)
         },
    })


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

                            <Group justify="space-between" mt={"2rem"} mb={"1rem"} >

                            <Button  color="indigo"  disabled={!form.isDirty() || update.isPending} type="submit">SAVE</Button>

                            <DeleteModal title={"Vendor"} func={() => deleteVendor.mutateAsync()} />

                            </Group>

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
            catch (e: any) {
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
        <Container>
            <Center>  <Title c={"indigo"} mt={"1rem"} mb={"1rem"} order={3}>OFFERED APPLICATION </Title></Center>
            <Table striped >
                <Table.Thead >
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>APPROVAL</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Container>)
}




export default AdminVendor