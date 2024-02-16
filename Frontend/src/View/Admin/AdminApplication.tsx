import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Image, Box, Card, Container, Divider, Flex, Grid, Group, ActionIcon, NumberInput, Select, Space, Table, Tabs, Textarea, Title, Text, MultiSelect, TextInput, Button, Modal, FileButton, Center } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from '@mantine/core';
import applicationService from "../../Services/application.service";
import { isNotEmpty, useForm } from '@mantine/form';
import { ApplicationInput } from "../../Ultils/type";
import { IconCircleX, IconCircleCheck, IconTrashX } from "@tabler/icons-react";
import adminService from "../../Services/admin.service";
import imageService from "../../Services/image.service";
import classes from "./AdminApplication.module.css"
import { showErorNotification, showSuccessNotification } from "../../Ultils/notification";
import { DeleteModal } from "../../Ultils/modals"
import dataService from "../../Services/data.service";

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
    solutionFor: string[];
    considerations: string;
}





const AdminApplication = () => {

    const [file, setFile] = useState<File | null>(null)

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
            solutionFor: [],
            considerations: "",
        },
        validate: {
            potentialApplications: isNotEmpty("can not be empty"),
        },
    })



    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['admin', 'application', id],
        queryFn: async () => {
            try {
                const res = await applicationService.getApplication(id)
                if (!res) {
                    throw new Error()
                }

                console.log(res)


                const { Vendor, ...application } = res

                const localData = {
                    ...application,
                    purposeOfEngagement: application.purposeOfEngagement.split(', ').map(a => a == '' ? '' : a[0].toUpperCase() +
                        a.slice(1)),
                    stageOfParticipation: application.stageOfParticipation.split(', ').map(a => a == '' ? '' : a[0].toUpperCase() +
                        a.slice(1)),
                    solutionFor: application.solutionFor.split(', ').map(a => a == '' ? '' : a[0].toUpperCase() +
                        a.slice(1)),
                }

                form.setInitialValues(localData);
                form.setValues(localData);

                return res
            }
            catch (e: any) {
                showErorNotification(e.message)
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
            showSuccessNotification(`Application has been updated`)
        },
        onError: (e) => {
            showErorNotification(e.message)
        },
    })

    const deleteApplication = useMutation({
        mutationFn: async () => {
            return await applicationService.deleteApplication(id)

        },
        onSuccess: () => {
            navigate(`/admin/technology/${data?.technologyId}`)
            queryClient.invalidateQueries({ queryKey: ['admin', 'technologies'] })
            showErorNotification("Application has been successfully deleted")
        },
        onError: (e) => {
            showErorNotification(e.message)
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
            showErorNotification(e.message)
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
            showErorNotification(e.message)
        },
    })

    const update = async () => {

        const updateData = {
            ...form.values,
            purposeOfEngagement: form.values.purposeOfEngagement.join(', '),
            stageOfParticipation: form.values.stageOfParticipation.join(', '),
            solutionFor: form.values.solutionFor.join(', ')


        }

        await updateApplication.mutateAsync(updateData)
    }

    const uploadImage = useMutation({
        mutationFn: async (input: File | null) => {
            if (!input) {
                return;
            }
            const link = await imageService.uploadImage(input)
            if (!link) {
                return;
            }
            await applicationService.editApplicationImage(link.url, id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['approval'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'application', id] })
        },
        onError: (e) => {
            showErorNotification(e.message)
        },
    })

    const dataQuery = useQuery({
        queryKey: ["admin , input"],
        queryFn: async () => {
            try {
                const res = await dataService.getAll()
                if (!res) {
                    throw new Error()
                }

                const values = {
                    purpose: res.purpose.map(a => a.name),
                    engagement: res.engagement.map(a => a.name),
                    scale: res.scale.map(a => a.name),
                    budget: res.budget.map(a => a.name),
                    participation: res.participation.map(a => a.name),
                    solution: res.solution.map(a => a.name)
                }
                return values
            }
            catch (e: any) {
                showErorNotification(e.message)
            }
        }
    }
    )



    let rows = data?.Vendor?.map((v, i) =>
        <Table.Tr key={i}>
            <Table.Td onClick={() => navigate(`/vendor/${v.vendorId}`)} >{v.Vendor.name}</Table.Td>
            <Table.Td onClick={() => navigate(`/vendor/${v.vendorId}`)}><a href={v.showcase}>{v.showcase}</a></Table.Td>
            <Table.Td onClick={() => navigate(`/vendor/${v.vendorId}`)}>{v.approved}</Table.Td>
            {v.approved === "PENDING" &&
                <>
                    <Table.Td>
                        <ActionIcon onClick={() => confirmApprove.mutateAsync({ vendorId: v.vendorId, applicationId: v.applicationId })} aria-label="Settings" variant="light" color="green" >
                            <IconCircleCheck style={{ width: '80%', height: '80%' }} stroke={1.5} />
                        </ActionIcon>
                    </Table.Td>
                    <Table.Td>
                        <ActionIcon onClick={() => confirmDisapprove.mutateAsync({ vendorId: v.vendorId, applicationId: v.applicationId })} aria-label="Settings" variant="light" color="red" >
                            <IconCircleX style={{ width: '80%', height: '80%' }} stroke={1.5} />
                        </ActionIcon>
                    </Table.Td>
                </>
            }
        </Table.Tr>)

    if (!data) {
        return (<></>)
    }

    return (<>
        <Container p={"2rem"} pl={"4rem"} pr={"4rem"} fluid>

            <Center>
                <Title mb={'4rem'} order={2} c="indigo">DETAILS</Title>
            </Center>
            <Grid
                gutter="md">
                <Grid.Col span={7} >
                    <Title order={2} >
                        <TextInput
                            size="md"
                            withAsterisk
                            label="Technology"
                            {...form.getInputProps('potentialApplications')}
                        />
                    </Title>
                    <Text fz="md" mt={"1rem"} >
                        <Textarea
                            mt={"1rem"}
                            autosize
                            minRows={5}
                            withAsterisk
                            label="Description"
                            {...form.getInputProps('explanation')}
                        />                            </Text>
                    <Text fz="md" >
                        <Textarea
                            mt={"1rem"}
                            autosize
                            minRows={3}
                            label="Maturity"
                            {...form.getInputProps('maturity')}
                        />                            </Text>
                </Grid.Col>
                <Grid.Col span={5} >
                    <Image className={classes.image} h={400}
                        fit="contain" src={data.imageUrl} />
                    <Space h="md" />
                    <Group justify="flex-end" mt="1rem" gap="xs">

                        <FileButton onChange={uploadImage.mutateAsync} accept="image/png,image/jpeg">
                            {(props) => <Button color="indigo" {...props}>Upload photo</Button>}
                        </FileButton>
                    </Group>
                </Grid.Col>
            </Grid>


            <Divider mt="1rem" size="xs" color="black" />


            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="md" >
                    Stage of participation :
                </Text >
                </Grid.Col>
                <Grid.Col span={9} >
                    <MultiSelect
                        {...form.getInputProps('stageOfParticipation')}
                        data={
                            dataQuery.data?.participation.map(d => ({ value: d, label: d }))
                        }
                    />
                </Grid.Col>
            </Grid >


            <Grid justify="flex-start" align="center" mt={"1rem"}  >
                <Grid.Col span={3} ><Text fz="md" >
                    Purpose :
                </Text >
                </Grid.Col>
                <Grid.Col span={9} >
                    <MultiSelect
                        {...form.getInputProps('purposeOfEngagement')}
                        data={dataQuery.data?.purpose.map(d => ({ value: d, label: d }))
                        }
                    />
                </Grid.Col>
            </Grid >

            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="md" >
                    Level :
                </Text >
                </Grid.Col>
                <Grid.Col span={3} >
                    <Select
                        {...form.getInputProps('levelOfEngagement')}
                        data={dataQuery.data?.engagement.map(d => ({ value: d, label: d }))
                        }

                    />
                </Grid.Col>
            </Grid >

            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="md" >
                    Scale :
                </Text >
                </Grid.Col>
                <Grid.Col span={3} >
                    <Select
                        {...form.getInputProps('scale')}
                        data={dataQuery.data?.scale.map(d => ({ value: d, label: d }))
                        }
                    />
                </Grid.Col>
            </Grid >

            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="md" >
                    Budget :
                </Text >
                </Grid.Col>
                <Grid.Col span={3} >
                    <Select
                        {...form.getInputProps('budget')}
                        data={dataQuery.data?.budget.map(d => ({ value: d, label: d }))
                        }
                    />
                </Grid.Col>
            </Grid >


            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="md" >
                    Solution to :
                </Text >
                </Grid.Col>
                <Grid.Col span={9} >
                    <MultiSelect
                        {...form.getInputProps('solutionFor')}
                        data={dataQuery.data?.solution.map(d => ({ value: d, label: d }))
                        }
                    />
                </Grid.Col>
            </Grid >
            <Group justify="space-between" mt={"2rem"} mb={"1rem"} >
                <Button disabled={!form.isDirty()} onClick={() => update()}>Save</Button>




                <DeleteModal title={"Application"} func={() => deleteApplication.mutateAsync()} />

            </Group>

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


