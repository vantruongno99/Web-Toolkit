import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { FileInput, Image, Box, Card, Container, Divider, Flex, Grid, Group, Input, NumberInput, Select, Space, Table, Tabs, Textarea, Title, Text, MultiSelect, TextInput, Button, Modal, ActionIcon, Fieldset, Center } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from '@mantine/core';
import technologyService from "../../Services/technology.service";
import { useForm } from '@mantine/form';
import { TechnologyInput } from "../../Ultils/type";
import { IconTablePlus, IconTrashX } from "@tabler/icons-react";
import applicationService from "../../Services/application.service";
import imageService from "../../Services/image.service";
import dataService from "../../Services/data.service";
import ApplicationCard from "../../Component/ApplicationCard/ApplicationCard";
import classes from './AdminTechnology.module.css'

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
        }
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
            catch (e) {
                console.log(e)
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
        }
    })

    const deleteTechnology = useMutation({
        mutationFn: async () => {
            return await technologyService.deleteTechnology(id)

        },
        onSuccess: () => {
            navigate('/admin/data')
            queryClient.invalidateQueries({ queryKey: ['admin', 'technologies'] })


        },
    })

    const update = async () => await updateTechnology.mutateAsync(form.values)









    return (<>
        <Container p={"2rem"}>
            <Container pt={"1rem"} pb={"1rem"} className={classes.area}>
                <Group justify="space-between">
                    <Title c={"indigo"} order={2}>DETAILS</Title>
                    <ActionIcon variant="outline" color="red" aria-label="Settings" onClick={() => deleteTechnology.mutateAsync()}>
                        <IconTrashX style={{ width: '80%', height: '80%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>
                <Input.Wrapper
                    label="Name:"
                    mt={"1rem"}
                >
                    <TextInput size="md"   {...form.getInputProps('technology')} />
                </Input.Wrapper>
                <Input.Wrapper
                    label="Description:"
                    mt={"1rem"}

                >
                    <Textarea autosize
                        minRows={3} size="md"   {...form.getInputProps('description')} />
                </Input.Wrapper>

                <Button disabled={!form.isDirty()} onClick={() => update()} mt={"2rem"}> Save change</Button>

            </Container>
            <Divider size="lg" mt="2rem" mb={"2rem"} color={"dark"}/>

            <Title c="indigo" order={3} mt="2rem" mb={"2rem"}>APPLICATION LIST</Title>

            <Grid justify="left" align="stretch" gutter="xl">
                {data?.Application.map((a, i) => <Grid.Col span={4}> <ApplicationCard data={a} key={i} />   </Grid.Col>
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
    })


    const createApplication = useMutation({
        mutationFn: async (input: newApplicationForm) => {

            let { image, ...rest } = input

            const data = {
                ...rest,
                stageOfParticipation: rest.purposeOfEngagement.join(', '),
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
            setOpened(!opened)
        },
        onError: (e) => {
            console.log(e)
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
                return res
            }
            catch (e) {
                console.log(e)
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
                            label="Technology"
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

