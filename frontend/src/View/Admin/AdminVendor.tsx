import { useState, useEffect } from "react"
import { ActionIcon, Anchor, Button, Group, Space, Text, Tooltip, Title, Table, Container } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom';
import { IconChevronUp, IconSelector } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IconCirclePlus } from '@tabler/icons-react';
import vendorService from "../../Services/vendor.service";
import { ApplicationVendor, VendorInfo } from "../../Ultils/type";
import adminService from "../../Services/admin.service";


const Approval = () => {
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
            catch (e) {
                console.log(e)
            }
        }

    })


    if (isError || !data) return <>'An error has occurred: ' + {JSON.stringify(error)}</>

    return (
        <Container p={"2rem"}>
            <Title order={3} >VENDOR LIST</Title>
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
        <Table.Tr onClick={()=>navigate(`/vendor/${element.id}?type=admin`)} key={i}>
            <Table.Td>{element.ABN}</Table.Td>
            <Table.Td>{element.name}</Table.Td>

        </Table.Tr>
    ));

    return (
        <>
            <Table highlightOnHover withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>ABN</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    )
}


export default Approval