import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Anchor, Box, Button, Container, Input, NumberInput, Space, Table, Tabs, Title } from "@mantine/core"
import { UseMutateAsyncFunction, UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from '@mantine/core';
import { VendorEdit, VendorInfo, VendorInput } from "../../Ultils/type";
import vendorService from "../../Services/vendor.service";
import { isNotEmpty, useForm } from '@mantine/form';



const Vendor = () => {

    const params = useParams();
    const id = params.id

    if (!id) {
        return <div>
            404
        </div>
    }

    const vendorId = parseInt(id)


    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['vendor', vendorId],
        queryFn: async () => {
            try {
                const res = await vendorService.getVendor(vendorId)
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

    const queryClient = useQueryClient()


    const updateApplication = useMutation({
        mutationFn: async (input: VendorEdit
        ) => {
            return await vendorService.editVendor(vendorId, input)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vendor', vendorId] })
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


const VendorDetail = ({ vendor, isLoading, update }: { vendor: VendorInfo, isLoading: boolean, update: UseMutationResult<void, Error, VendorEdit, unknown>}) => {

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

                    <Button mt={"2rem"} mb={"1rem"} disabled={!form.isDirty()||update.isPending} type="submit">Save</Button>
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