import { useState, useEffect } from "react"
import { ActionIcon, Anchor, Button, Group, Space, Text, Tooltip, Title, Table, Container, Center } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom';
import { IconChevronUp, IconSelector } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IconCirclePlus } from '@tabler/icons-react';
import vendorService from "../../Services/vendor.service";
import { ApplicationVendor, VendorInfo } from "../../Ultils/type";
import adminService from "../../Services/admin.service";
import { showErorNotification } from "../../Ultils/notification";


const Approval = () => {
    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['approval'],
        queryFn: async () => {
            try {
                const res: ApplicationVendor[] | undefined = await adminService.getAllApproval()
                if (!res) {
                    throw new Error()
                }
                return res.filter(a => a.approved === "PENDING")
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
                <Title c={"indigo"} order={2} >PENDING APPROVAL LIST</Title>
            </Center>
            <Space h="xl" />
            <VendorTable data={data} isLoading={isLoading} />

        </Container>
    )
}


const VendorTable = ({ data, isLoading }: { data: ApplicationVendor[], isLoading: boolean }) => {

    const queryClient = useQueryClient()


    const [vendors, setVendors] = useState<ApplicationVendor[]>(data)

    useEffect(() => {
        setVendors(data)
    }, [data])

    const navigate = useNavigate()


    const rows = vendors.map((element, i) => (
        <Table.Tr onClick={() => navigate(`/admin/application/${element.applicationId}`)} key={i}>
            <Table.Td>{element.Application.potentialApplications}</Table.Td>
            <Table.Td>{element.Vendor.name}</Table.Td>

        </Table.Tr>
    ));

    return (
        <>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
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


export default Approval