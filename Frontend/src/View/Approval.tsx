import { useState, useEffect } from "react"
import { ActionIcon, Anchor, Button, Group, Space, Text, Tooltip, Title, Table, Container } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom';
import { IconChevronUp, IconSelector } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IconCirclePlus } from '@tabler/icons-react';
import vendorService from "../Services/vendor.service";
import { ApplicationVendor, VendorInfo } from "../Ultils/type";
import adminService from "../Services/admin.service";


const Approval = () => {
    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['approval'],
        queryFn: async () => {
            try {
                const res: ApplicationVendor[] | undefined = await adminService.getAllApproval()
                if (!res) {
                    throw new Error()
                }
                return res.filter(a => a.approved === false)
            }
            catch (e) {
                console.log(e)
            }
        }

    })


    if (isError || !data) return <>'An error has occurred: ' + {JSON.stringify(error)}</>

    return (
        <Container p={"2rem"}>
            <Title order={3} >REQUEST LIST</Title>
            <Space h="xl" />
            <VendorTable data={data} isLoading={isLoading} />

        </Container>
    )
}


const VendorTable = ({ data, isLoading }: { data: ApplicationVendor[], isLoading: boolean }) => {

    const queryClient = useQueryClient()

    interface ApprovalInput {
        vendorId: number,
        applicationId: number
    }


    const ConfirmApprove = useMutation({
        mutationFn: async (input: ApprovalInput) => {
            console.log(input)
            await adminService.ConfirmApprove(input.vendorId, input.applicationId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['approval'] })
        },
        onError: (e) => {
            console.log(e)
        },
    })

    const [vendors, setVendors] = useState<ApplicationVendor[]>(data)

    useEffect(() => {
        setVendors(data)
    }, [data])


    const rows = vendors.map((element, i) => (
        <Table.Tr key={i}>
            <Table.Td>{element.Application.potentialApplications}</Table.Td>
            <Table.Td>{element.Vendor.name}</Table.Td>
            <Table.Td><Button onClick={() => ConfirmApprove.mutateAsync({ vendorId: element.vendorId, applicationId: element.applicationId })}>Approve</Button></Table.Td>

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