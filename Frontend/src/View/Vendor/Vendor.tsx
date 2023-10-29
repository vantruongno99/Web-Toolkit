import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Anchor, Box, Button, Container, Input, NumberInput, Space, Table, Tabs, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query";
import { Loader } from '@mantine/core';
import { VendorInfo, VendorInput } from "../../Ultils/type";
import vendorService from "../../Services/vendor.service";
import { useForm } from "@mantine/form";



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
                        <VendorDetail vendor={data} isLoading={isLoading} />
                    </Tabs.Panel>
                    <Tabs.Panel value="applications">
                        <VendorApplication vendor={data} isLoading={isLoading} />
                    </Tabs.Panel>

                </Tabs>
            </Container>

        </>
    )
}


const VendorDetail = ({ vendor, isLoading }: { vendor: VendorInfo, isLoading: boolean }) => {

    const [searchParams] = useSearchParams();
    const userSearch = searchParams.get('type') === "user"
    const form = useForm<VendorInfo>({
        initialValues: {
            name: "",
            ABN: 0,
            id: 0,
            email: "",
            link: ""
        },
        validate: {
            name: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null),
            ABN: (value) => (value.toString().length < 5 ? 'Name must have at least 5 letters' : null),

        },
    });


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
                    <Input   size="md" />
                </Input.Wrapper>
                <Input.Wrapper
                    label="ABN :"
                    mt={"1rem"}
                >
                    <NumberInput  value={form.values.ABN} size="md" />
                </Input.Wrapper>
                <Input.Wrapper
                    label="Email :"
                    mt={"1rem"}
                >
                    <Input   value={form.values.email} size="md" />
                </Input.Wrapper>
                <Input.Wrapper
                    label="Link :"
                    mt={"1rem"}
                >
                   <Anchor href={form.values.email} target="_blank">
                        {form.values.email}
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
                <Input.Wrapper
                    label="Name :"
                >
                    <Input   {...form.getInputProps('name')} size="md" />
                </Input.Wrapper>
                <Input.Wrapper
                    label="ABN :"
                    mt={"1rem"}
                >
                    <NumberInput   {...form.getInputProps('ABN')} size="md" />
                </Input.Wrapper>
                <Input.Wrapper
                    label="Email :"
                    mt={"1rem"}
                >
                    <Input   {...form.getInputProps('email')} size="md" />
                </Input.Wrapper>
                <Input.Wrapper
                    label="Link :"
                    mt={"1rem"}
                >
                    <Input   {...form.getInputProps('link')} size="md" />
                </Input.Wrapper>
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
            <Button mb="1rem" onClick={() => !userSearch && navigate(`/find?type=vendor&id=${vendor.id}`)}>Select Application</Button>
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