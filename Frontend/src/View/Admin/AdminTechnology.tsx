import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Box, Card, Container, Divider, Flex, Grid, Group, Input, NumberInput, Select, Space, Table, Tabs, Textarea, Title, Text, MultiSelect, TextInput, Button, Modal, ActionIcon } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from '@mantine/core';
import technologyService from "../../Services/technology.service";
import { useForm } from "@mantine/form";
import { TechnologyInput } from "../../Ultils/type";
import { IconTablePlus } from "@tabler/icons-react";
import applicationService from "../../Services/application.service";

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

    let rows =
        (data?.Application.map((e, i) => (
            <Table.Tr key={i} onClick={() => navigate(`/admin/application/${e.id}`)}>
                <Table.Td>{e.potentialApplications}</Table.Td>
            </Table.Tr>
        )))





    return (<>
        <Container p={"2rem"}>
            <Group justify="space-between">
                <Title order={3}>Details</Title>
                <Button onClick={() => deleteTechnology.mutateAsync()} color={"red"}>Delete</Button>
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

            <Button disabled={!form.isDirty()} onClick={() => update()} mt={"1rem"}> Save change</Button>

            <Title order={4} mt="2rem">Application list</Title>

            <Table highlightOnHover withTableBorder mb="1rem" mt="1rem">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

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
    solutionFor: string;
    considerations: string;
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
            solutionFor: "",
            considerations: ""
        },
    })


    const createApplication = useMutation({
        mutationFn: async (input: newApplicationForm) => {
            console.log(input)
            const data = {
                ...input,
                stageOfParticipation: input.purposeOfEngagement.join(', '),
                purposeOfEngagement: input.purposeOfEngagement.join(', '),
                technologyId
            }
            const output = await applicationService.createApplication(data)
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



    return (
        <>
            <Modal size="xl" opened={opened} onClose={() => setOpened(false)} title="Add new technology">
                <form onSubmit={form.onSubmit(data => createApplication.mutate(data))}>
                    <Group justify="left">
                        <Title order={2}>
                            <TextInput
                                variant="unstyled"
                                size="lg"
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
                    <Group justify="flex-end" mt={"1rem"} >
                        <Button type="submit">Save</Button>
                    </Group>
                </form>
            </Modal>


            <ActionIcon onClick={() => setOpened(!opened)} size={'lg'}>
                <IconTablePlus />
            </ActionIcon>

        </>

    )
}


export default AdminTechnology

