import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Box, Card, Container, Divider, Flex, Grid, Group, ActionIcon, NumberInput, Select, Space, Table, Tabs, Textarea, Title, Text, MultiSelect, TextInput, Button, Modal } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from '@mantine/core';
import applicationService from "../../Services/application.service";
import { useForm } from "@mantine/form";
import { ApplicationInput } from "../../Ultils/type";
import { IconCircleX, IconCircleCheck, IconTablePlus } from "@tabler/icons-react";
import adminService from "../../Services/admin.service";

interface localApplicationForm {
    purposeOfEngagement: string[];
    technologyId: number;
    potentialApplications: string;
    explanation: string;
    maturity: string;
    stageOfParticipation: string[]
    levelOfEngagement: string
    scale: string;
    budget: string;
    solutionFor: string;
    considerations: string;
}





const AdminApplication = () => {

    const params = useParams();
    if (!params.id) {
        return (<>
            404
        </>)
    }
    const id = parseInt(params.id)

    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const form = useForm<localApplicationForm>({
        initialValues: {
            purposeOfEngagement: [],
            technologyId: 0,
            potentialApplications: "",
            explanation: "",
            maturity: "",
            stageOfParticipation: [],
            levelOfEngagement: "",
            scale: "",
            budget: "",
            solutionFor: "",
            considerations: "",
        }
    })



    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['admin', 'application', id],
        queryFn: async () => {
            try {
                const res = await applicationService.getApplication(id)
                if (!res) {
                    throw new Error()
                }


                const { Vendor, ...application } = res

                const localData = {
                    ...application,
                    purposeOfEngagement: application.purposeOfEngagement.split(', ').map(a => a == '' ? '' : a[0].toUpperCase() +
                        a.slice(1)),
                    stageOfParticipation: application.stageOfParticipation.split(', ').map(a => a == '' ? '' : a[0].toUpperCase() +
                        a.slice(1)),

                }

                console.log(localData)


                form.setInitialValues(localData);
                form.setValues(localData);

                return res
            }
            catch (e) {
                console.log(e)
            }
        },

    }
    )

    const updateApplication = useMutation({
        mutationFn: async (data: ApplicationInput) => {
            return await applicationService.editApplication(data, id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'application', id] })
        }
    })

    const deleteApplication = useMutation({
        mutationFn: async () => {
            return await applicationService.deleteApplication(id)

        },
        onSuccess: () => {
            navigate(`/admin/technology/${data?.technologyId}`)
            queryClient.invalidateQueries({ queryKey: ['admin', 'technologies'] })


        },
    })


    interface ApprovalInput {
        vendorId: number,
        applicationId: number
    }


    const confirmApprove = useMutation({
        mutationFn: async (input: ApprovalInput) => {
            await adminService.confirmApprove(input.vendorId, input.applicationId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['approval'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'application', id] })
        },
        onError: (e) => {
            console.log(e)
        },
    })


    const confirmDisapprove = useMutation({
        mutationFn: async (input: ApprovalInput) => {
            await adminService.confirmDisapprove(input.vendorId, input.applicationId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['approval'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'application', id] })
        },
        onError: (e) => {
            console.log(e)
        },
    })

    const update = async () => {

        const updateData = {
            ...form.values,
            purposeOfEngagement: form.values.purposeOfEngagement.join(', '),
            stageOfParticipation: form.values.stageOfParticipation.join(', ')

        }


        await updateApplication.mutateAsync(updateData)
    }

    let rows = data?.Vendor?.map((v, i) =>
        <Table.Tr key={i}>
            <Table.Td onClick={() => navigate(`/vendor/${v.vendorId}`)} >{v.Vendor.name}</Table.Td>
            <Table.Td onClick={() => navigate(`/vendor/${v.vendorId}`)}><a href={v.showcase}>{v.showcase}</a></Table.Td>
            <Table.Td onClick={() => navigate(`/vendor/${v.vendorId}`)}>{v.approved}</Table.Td>
            {v.approved === "PENDING" &&
                <>
                    <Table.Td>
                        <ActionIcon onClick={() => confirmApprove.mutateAsync({ vendorId: v.vendorId, applicationId: v.applicationId })} aria-label="Settings" variant="light" color="green" >
                            <IconCircleCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Table.Td>
                    <Table.Td>
                        <ActionIcon onClick={() => confirmDisapprove.mutateAsync({ vendorId: v.vendorId, applicationId: v.applicationId })} aria-label="Settings" variant="light" color="red" >
                            <IconCircleX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Table.Td>
                </>
            }
        </Table.Tr>)

    if(!data){
        return(<></>)
    }





    return (<>
        <Container p={"2rem"}>
            <Group justify="space-between">
                <Title order={3}>Details</Title>
                <Button onClick={() => deleteApplication.mutateAsync()} color={"red"}>Delete</Button>
            </Group>
            <Group justify="center">
                <Title order={2}>
                    <TextInput
                        variant="unstyled"
                        size="md"
                        withAsterisk
                        placeholder="Technology"
                        {...form.getInputProps('potentialApplications')}
                    />
                </Title>
            </Group>
            <Text fz="sm" mt={"1rem"} >
                <Textarea
                    variant="unstyled"
                    mt={"1rem"}
                    autosize
                    withAsterisk
                    placeholder="Description"
                    {...form.getInputProps('explanation')}
                />                            </Text>
            <Text fz="sm" >
                <Textarea
                    variant="unstyled"
                    mt={"1rem"}
                    autosize
                    withAsterisk
                    placeholder="Maturity"
                    {...form.getInputProps('maturity')}
                />                            </Text>
            <Divider mt="1rem" size="xs" color="black" />


            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="sm" >
                    Stage of participation :
                </Text >
                </Grid.Col>
                <Grid.Col span={9} >
                    <MultiSelect
                        {...form.getInputProps('stageOfParticipation')}
                        data={[
                            { value: 'Problem identification', label: 'Problem identification' },
                            { value: 'InfProblem definition/prioritizationorm', label: 'Problem definition/prioritization' },
                            { value: 'Input/feedback', label: 'Input/feedback' },
                            { value: 'Evaluation', label: 'Evaluation' },
                            { value: 'Co-creation', label: 'Co-creation' },
                        ]}
                    />
                </Grid.Col>
            </Grid >


            <Grid justify="flex-start" align="center" mt={"1rem"}  >
                <Grid.Col span={3} ><Text fz="sm" >
                    Purpose :
                </Text >
                </Grid.Col>
                <Grid.Col span={9} >
                    <MultiSelect
                        {...form.getInputProps('purposeOfEngagement')}
                        data={[
                            { value: 'Collaborate', label: 'Collaborate' },
                            { value: 'Inform', label: 'Inform' },
                            { value: 'Involve', label: 'Involve' },
                            { value: 'Consult', label: 'Consult' },
                            { value: 'Empower', label: 'Empower' },
                        ]}
                    />
                </Grid.Col>
            </Grid >

            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="sm" >
                    Level :
                </Text >
                </Grid.Col>
                <Grid.Col span={3} >
                    <Select
                        {...form.getInputProps('levelOfEngagement')}
                        data={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Passive', label: 'Passive' },
                            { value: 'Immersive', label: 'Immersive' },
                        ]}

                    />
                </Grid.Col>
            </Grid >

            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="sm" >
                    Scale :
                </Text >
                </Grid.Col>
                <Grid.Col span={3} >
                    <Select
                        {...form.getInputProps('scale')}
                        data={[
                            { value: 'Individual', label: 'Individual' },
                            { value: 'Small group', label: 'Small group' },
                            { value: 'Large group', label: 'Large group' },
                            { value: 'Public', label: 'Public' },

                        ]}
                    />
                </Grid.Col>
            </Grid >

            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="sm" >
                    Budget :
                </Text >
                </Grid.Col>
                <Grid.Col span={3} >
                    <Select
                        {...form.getInputProps('budget')}
                        data={[
                            { value: '$', label: '$' },
                            { value: '$$', label: '$$' },
                            { value: '$$$', label: '$$$' },
                        ]}
                    />
                </Grid.Col>
            </Grid >


            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="sm" >
                    Solution to :
                </Text >
                </Grid.Col>
                <Grid.Col span={9} >
                    <Textarea
                        {...form.getInputProps('solutionFor')}
                        autosize
                        minRows={1}
                    />
                </Grid.Col>
            </Grid >
                <Button mt={"1rem"} mb={"1rem"} disabled={!form.isDirty()} onClick={() => update()}>Save</Button>

            <Title mt="2rem" order={4}>Vendor</Title>
            <Table mt={"1rem"} mb={"1rem"} highlightOnHover withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Showcase</Table.Th>
                        <Table.Th>Approved</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Container >
    </>)
}




export default AdminApplication

