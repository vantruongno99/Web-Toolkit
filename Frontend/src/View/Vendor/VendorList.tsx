import { useState, useEffect } from "react"
import { ActionIcon, Anchor, Button, Group, Space, Text, Tooltip, Title, Table, Container, Center } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom';
import { IconChevronUp, IconSelector } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { useQuery } from "@tanstack/react-query";
import { IconCirclePlus } from '@tabler/icons-react';
import vendorService from "../../Services/vendor.service";
import { VendorInfo } from "../../Ultils/type";
import { showErorNotification } from "../../Ultils/notification";


const Vendors = () => {

    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['vendor'],
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
            <Title order={3} >VENDOR LIST</Title>
            </Center>
            <Space h="xl" />
            <VendorTable data={data} isLoading={isLoading} />

        </Container>
    )
}


const VendorTable = ({ data, isLoading }: { data: VendorInfo[], isLoading: boolean }) => {
    const navigate = useNavigate()

    const [vendors, setVendors] = useState<VendorInfo[]>(data)

    useEffect(() => {
        setVendors(data)
    }, [data])


    const rows = vendors.map((element) => (
        <Table.Tr key={element.name} onClick={() => navigate(`/vendor/${element.id}`)}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.ABN}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Table highlightOnHover withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>ABN</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    )
}


export default Vendors