import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { FileInput, Image, Box, Card, Container, Divider, Grid, Group, Input, NumberInput, Select, Space, Table, Tabs, Textarea, Title, Text, MultiSelect, TextInput, Button, Modal, ActionIcon, Fieldset, Center } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from '@mantine/core';
import technologyService from "../../Services/technology.service";
import { isNotEmpty, useForm } from '@mantine/form';
import { TechnologyInput } from "../../Ultils/type";
import { IconTablePlus, IconTrashX } from "@tabler/icons-react";
import applicationService from "../../Services/application.service";
import imageService from "../../Services/image.service";
import dataService from "../../Services/data.service";
import ApplicationCard from "../../Component/ApplicationCard/ApplicationCard";
import classes from './AdminTechnology.module.css'
import { showErorNotification, showSuccessNotification } from "../../Ultils/notification";
import { DeleteModal } from "../../Ultils/modals";


const AdminTechnology = () => {

    const params = useParams();
    if (!params.id) {
        return (<>
            404
        </>)
    }
    const id = parseInt(params.id)

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const form = useForm<TechnologyInput>({
        initialValues: {
            technology: "",
            description: ""
        },
        validate: {
            description: isNotEmpty("can not be empty"),
            technology: isNotEmpty("can not be empty"),
        },
    })


    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['admin', 'technology', id],
        queryFn: async () => {
            try {
                const res = await technologyService.getTechnology(id)
                if (!res) {
                    throw new Error()
                }

                const data: TechnologyInput = {
                    technology: res.technology,
                    description: res.description
                }

                form.setInitialValues(data);
                form.setValues(data);

                return res
            }
            catch (e: any) {
                showErorNotification(e.message)
            }
        },

    }
    )

    const updateTechnology = useMutation({
        mutationFn: async (data: TechnologyInput) => {
            return await technologyService.editTechnology(data, id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'technology', id] })
            showSuccessNotification("Technology has been updated")
        },
        onError: (e: Error) => {
            showErorNotification(e.message)
        },
    })

    const deleteTechnology = useMutation({
        mutationFn: async () => {
            return await technologyService.deleteTechnology(id)

        },
        onSuccess: () => {
            navigate('/admin/data')
            showErorNotification("Technology has been deleted successfully")
            queryClient.invalidateQueries({ queryKey: ['admin', 'technologies'] })
        },
        onError: (e: Error) => {
            showErorNotification(e.message)
        },
    })

    return (<>
        <Container fluid maw={1100}>
            
        <form onSubmit={form.onSubmit(data => updateTechnology.mutateAsync(data))}>
            <Container fluid  pt={"1rem"} pb={"1rem"} className={classes.area}>
                <Title c={"indigo"} order={2}>DETAILS</Title>
                <Title order={2}>
                    <TextInput
                        withAsterisk
                        label="Technology"
                        size="md"
                        {...form.getInputProps('technology')}
                    />
                </Title>
                <Text fz="sm" mt={"1rem"} >
                    <Textarea
                        mt={"1rem"}
                        size="md"
                        autosize
                        minRows={3}
                        withAsterisk
                        label="Description"
                        {...form.getInputProps('description')}
                    />
                </Text>
                <Group justify="space-between" mt={"2rem"}>

                    <Button disabled={!form.isDirty()} type="submit" > Save change</Button>
                    <DeleteModal title="Technology" func={() => deleteTechnology.mutateAsync()} />
                </Group>
            </Container>
            </form>
            <Divider size="lg" mt="2rem" mb={"2rem"} color={"dark"} />

            <Title c="indigo" order={3} mt="2rem" mb={"2rem"}>APPLICATION LIST</Title>

            <Grid justify="left" align="stretch" gutter="xl">
                {data?.Application.map((a, i) => <Grid.Col span={3}> <ApplicationCard data={{ label: a.potentialApplications, link: `/admin/application/${a.id}`, imageUrl: a.imageUrl }} key={i} />   </Grid.Col>
                )}
            </Grid>


            <NewApplicationForm technologyId={data?.id as number} />

        </Container>
    </>)
}


interface newApplicationForm {
    purposeOfEngagement: string[];
    potentialApplications: string;
    explanation: string;
    maturity: string;
    stageOfParticipation: string[]
    levelOfEngagement: string
    scale: string;
    budget: string;
    solutionFor: string[];
    considerations: string;
    image: File | null
}


const NewApplicationForm = ({ technologyId }: { technologyId: number }) => {

    const [opened, setOpened] = useState<boolean>(false);
    const queryClient = useQueryClient()

    const form = useForm<newApplicationForm>({
        initialValues: {
            potentialApplications: "",
            explanation: "",
            maturity: "",
            stageOfParticipation: [],
            purposeOfEngagement: [],
            levelOfEngagement: "",
            scale: "",
            budget: "",
            solutionFor: [],
            considerations: "",
            image: null

        },
        validate: {
            potentialApplications: isNotEmpty("can not be empty"),
        },

    })


    const createApplication = useMutation({
        mutationFn: async (input: newApplicationForm) => {

            let { image, ...rest } = input

            const data = {
                ...rest,
                stageOfParticipation: rest.stageOfParticipation.join(', '),
                purposeOfEngagement: rest.purposeOfEngagement.join(', '),
                solutionFor: rest.solutionFor.join(', '),
                technologyId
            }

            let imageUrl = ""

            if (input.image) {
                const link = await imageService.uploadImage(input.image)
                if (link) {
                    imageUrl = link.url
                }
            }

            const dataInput = {
                ...data,
                imageUrl
            }

            const output = await applicationService.createApplication(dataInput)
            if (!output) {
                throw new Error()
            }
            return output
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'technology', technologyId] })
            form.reset()
            setOpened(!opened)
        },
        onError: (e) => {
            showErorNotification(e.message)
        },
    })


    const { isLoading, error, isError, data } = useQuery({
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

    if (!data) {
        return (<>
            Loading
        </>)
    }



    return (
        <>
            <Modal withCloseButton={false} size="xl" opened={opened} onClose={() => setOpened(false)}>
                <Center mb={"1rem"}>
                    <Title order={3}>
                        ADD NEW APPLICATION
                    </Title>
                </Center>
                <Divider color={"dark"} />
                <form onSubmit={form.onSubmit(data => createApplication.mutate(data))}>
                    <Title order={2}>
                        <TextInput
                            withAsterisk
                            label="Application"
                            {...form.getInputProps('potentialApplications')}
                        />
                    </Title>
                    <Text fz="sm" mt={"1rem"} >
                        <Textarea
                            mt={"1rem"}
                            autosize
                            withAsterisk
                            label="Description"
                            {...form.getInputProps('explanation')}
                        />                            </Text>
                    <Text fz="sm" >
                        <Textarea
                            mt={"1rem"}
                            autosize
                            withAsterisk
                            label="Maturity"
                            {...form.getInputProps('maturity')}
                        />                            </Text>
                    <Divider mt="1rem" size="xs" color="black" />

                    <FileInput accept="image/png,image/jpeg" label="Upload Image" placeholder="Upload file"   {...form.getInputProps('image')} />

                    {form.values.image !== null && <>
                        <Image
                            mt={"1rem"}
                            radius="md"
                            h={300}
                            w={500}
                            src={URL.createObjectURL(form.values.image)}
                        />
                    </>}

                    <Divider mt="1rem" size="xs" color="black" />


                    <Grid justify="flex-start" align="center" mt={"1rem"} >
                        <Grid.Col span={3} ><Text fz="sm" >
                            Stage of participation :
                        </Text >
                        </Grid.Col>
                        <Grid.Col span={9} >
                            <MultiSelect
                                {...form.getInputProps('stageOfParticipation')}
                                data={
                                    data.participation.map(d => ({ value: d, label: d }))
                                }
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
                                data={
                                    data.purpose.map(d => ({ value: d, label: d }))
                                }
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
                                data={
                                    data.engagement.map(d => ({ value: d, label: d }))
                                }

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
                                data={
                                    data.scale.map(d => ({ value: d, label: d }))
                                }
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
                                data={
                                    data.budget.map(d => ({ value: d, label: d }))
                                }
                            />
                        </Grid.Col>
                    </Grid >


                    <Grid justify="flex-start" align="center" mt={"1rem"} >
                        <Grid.Col span={3} ><Text fz="sm" >
                            Solution to :
                        </Text >
                        </Grid.Col>
                        <Grid.Col span={9} >
                            <MultiSelect
                                {...form.getInputProps('solutionFor')}
                                data={
                                    data.solution.map(d => ({ value: d, label: d }))
                                }
                            />
                        </Grid.Col>
                    </Grid >
                    <Group justify="flex-end" mt={"1rem"} >
                        <Button disabled={createApplication.isPending || !form.isDirty()} mt="2rem" type="submit">Save {createApplication.isPending && <Loader ml={"1rem"} size="sm" />} </Button>
                    </Group>
                </form>
            </Modal>


            <Center>
                <Button variant="filled" mt={"2rem"} color="indigo" onClick={() => setOpened(!opened)} size={'md'}>
                    ADD MORE
                </Button>
            </Center>

        </>

    )
}



export default AdminTechnology

