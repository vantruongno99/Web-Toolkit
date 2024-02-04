import { useState, useEffect } from "react"
import { Modal, Anchor, Button, Group, Space, Text, Tooltip, Title, Table, Container, Center, Burger } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom';
import { IconChevronUp, IconSelector } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IconCirclePlus } from '@tabler/icons-react';
import vendorService from "../../Services/vendor.service";
import { VendorInfo } from "../../Ultils/type";
import { useForm, isNotEmpty, isEmail } from '@mantine/form';
import { MantineThemeProvider, NumberInput, TextInput, Box, Input, Grid } from '@mantine/core';
import { useError } from "../../Hook";
import { VendorInput } from "../../Ultils/type";
import { showErorNotification, showSuccessNotification } from "../../Ultils/notification";


const AdminVendors = () => {
    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['vendors'],
        queryFn: async () => {
            try {
                const res: VendorInfo[] | undefined = await vendorService.getAllVendor()
                if (!res) {
                    throw new Error()
                }
                return res
            }
            catch (e:any) {
                showErorNotification(e.message)
            }
        }

    })


    if (isError || !data) return <>'An error has occurred: ' + {JSON.stringify(error)}</>

    return (
        <Container p={"2rem"}>
            <Center>
                <Title c={"indigo"} order={2} >VENDOR LIST</Title>
            </Center>
            <Space h="xl" />
            <VendorTable data={data} isLoading={isLoading} />

        </Container>
    )
}


const VendorTable = ({ data, isLoading }: { data: VendorInfo[], isLoading: boolean }) => {

    const [vendors, setVendors] = useState<VendorInfo[]>(data)

    useEffect(() => {
        setVendors(data)
    }, [data])

    const navigate = useNavigate()


    const rows = vendors.map((element, i) => (
        <Table.Tr onClick={() => navigate(`/admin/vendor/${element.id}`)} key={i}>
            <Table.Td>{element.ABN}</Table.Td>
            <Table.Td>{element.name}</Table.Td>

        </Table.Tr>
    ));

    return (
        <>
            <AddVendor />
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>ABN</Table.Th>
                        <Table.Th>Name</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    )
}



const AddVendor = () => {

    const [showed, setShowed] = useState<boolean>(false)
    const queryClient = useQueryClient()


    const form = useForm({
        initialValues: { ABN: 0, email: ' ', link: '', phone: '' },
        // functions will be used to validate values at corresponding key
        validate: {
            phone: (value) => (value.length < 10 ? 'phone must have at least 10 letters' : null),
            ABN: (value) => (value.toString().length !== 11 ? 'ABN must have 11 numbers' : null),
            email: isEmail('Invalid email'),
        },
    });

    const createVendor = useMutation({
        mutationFn: async (input: VendorInput) => {
            const res = await vendorService.createVendor({ ...input, ABN: Number(input.ABN) })
            if (!res) {
                form.setErrors({ ABN: "ABN is not valid" })
            }
            return res
        },
        onSuccess: (res) => {
            if (res)
                showSuccessNotification(`Vendor with ABN ${res.ABN} has been created `)
            setShowed(false)
            queryClient.invalidateQueries({ queryKey: ['vendors'] })


        },
        onError: (e: Error) => {
            if (e.message === "Vendor_name_key already exist") {
                form.setErrors({ ABN: "ABN is already exist" })
            }
            else if (e.message === "ABN is not valid") {
                form.setErrors({ ABN: "ABN is not valid" })
            }
            else {
                showErorNotification(e.message)
            }
        },
    })


    return (
        <>
            <Button mb={"1rem"} onClick={() => setShowed(true)}>
                Create new Vendor
            </Button>
            <Modal opened={showed} onClose={() => setShowed(false)} title="Create new Vendor">
                <Grid>
                    <Grid.Col span={6}>
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
                                    Create new vendor
                                </Button>
                                <Space h="md" />
                            </form>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Modal>
        </>
    )
}


export default AdminVendors

