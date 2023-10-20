import { useState, useEffect } from "react"
import { useNavigate, useParams , useSearchParams } from "react-router-dom"
import { Box, Container, Input, NumberInput, Space, Table, Tabs, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query";
import { Loader } from '@mantine/core';
import { VendorInfo, VendorInput } from "../Ultils/type";
import vendorService from "../Services/vendor.service";
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


    const form = useForm<VendorInfo>({
        initialValues: {
            name: "",
            ABN: 0,
            id: 0
        },
        validate: {
            name: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null),
            ABN: (value) => (value.toString().length < 5 ? 'Name must have at least 5 letters' : null),

        },
    });

    useEffect(() => {
        form.setValues(vendor)
    }, [vendor])

    return (
        <>
            <Title order={3} >INFORMATION</Title>
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
        <Table.Tr key={i} onClick={() =>!userSearch && navigate(`/application/${e.Application.id}?type=vendor&id=${e.Vendor.id}`)}>
            <Table.Td>{e.Application.potentialApplications}</Table.Td>
            <Table.Td>{e.approval === true ? "APPROVED" : "PENDING"}</Table.Td>
        </Table.Tr>
    )
    )


    return (<>
        <Table highlightOnHover withTableBorder>
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