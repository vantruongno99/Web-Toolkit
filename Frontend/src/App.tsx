import data from "./data.json"
import { Modal, Card, Text, Group, ActionIcon, Flex, Textarea, Grid, Select, Title, MultiSelect, Center, Divider, TextInput, Button } from '@mantine/core'
import { Technology, Application, TechnologyForm } from "./type"
import { useEffect, useState } from "react"
import styles from './index.module.css'
import { useForm } from '@mantine/form'
import { IconTrash, IconCheck, IconTablePlus } from '@tabler/icons-react'

const App = () => {
    const [filter, setFilter] = useState<string>('')
    return (
        <>
            <Group p={"1rem"} justify="space-between">
                <TextInput size='md' placeholder="Input for search" mb="1rem" value={filter} onChange={(event) => setFilter(event.currentTarget.value)} />
                <NewTechnologyForm />
            </Group>
            {data.map((d, i) => <Outside data={d} filter={filter} key={i} />)}

        </>
    )
}

const Outside = ({ data, filter }: { data: Technology, filter: string }) => {

    const [showed, setShowed] = useState<boolean>(false)
    const [filteredApplications, setFiltededApllication] = useState<Application[]>(data.potential)

    useEffect(() => {
        if (filter.length !== 0) {
            const newList = data.potential.filter(a =>
                a.explanation.toLowerCase().includes(filter.toLowerCase()) || a.potentialApplications.toLowerCase().includes(filter.toLowerCase())
            )

            console.log(newList)
            setFiltededApllication(newList)

        }
        else {
            setFiltededApllication(data.potential)
        }

    }, [filter])

    if (filteredApplications.length === 0) {
        return
    }

    return (<>
        <div style={{ width: "auto" }}>
            <Card p={"2rem"} radius="md" withBorder >
                <Card.Section onClick={() => setShowed(!showed)}>
                    <Group justify="center">
                        <Title order={3}>
                            {data.technology}
                        </Title>
                    </Group>
                    <Text fz="sm" mt="1rem">
                        {data.description}
                    </Text>
                </Card.Section>
            </Card>
            {showed &&
                <div>
                    {filteredApplications.map(d => <Inside data={d} />)}
                    <Center mt={"1rem"} mb={"2rem"}>
                        <NewApplicationForm />
                    </Center>
                </div>
            }
        </div>

    </>
    )
}

interface ApplicationForm {
    potentialApplications: string,
    explanation: string,
    maturity: string,
    stageOfParticipation: string,
    purposeOfEngagement: string[],
    levelOfEngagement: string,
    scale: string,
    budget: string,
    solutionFor: string,
    considerations: string
}


const Inside = ({ data }: { data: Application }) => {




    const form = useForm<ApplicationForm>({
        initialValues: {
            potentialApplications: "",
            explanation: "",
            maturity: "",
            stageOfParticipation: "",
            purposeOfEngagement: [],
            levelOfEngagement: "",
            scale: "",
            budget: "",
            solutionFor: "",
            considerations: ""
        },
    })

    useEffect(() => {
        const newData = {
            ...data,
            purposeOfEngagement: data.purposeOfEngagement.split(',').map(a => a.charAt(0).toUpperCase()
                + a.slice(1))
        }
        form.setValues(newData)
    }, [data])


    return (
        <div className={styles.app}>
            <Flex gap="md" >
                <Card shadow="sm" radius="md" withBorder p="2rem" className={styles.insideCard} >
                    <Card.Section>
                        <Group justify="apart">
                            <Title order={2}>
                                {data.potentialApplications}
                            </Title>
                        </Group>
                        <Text fz="sm" mt={"1rem"} >
                            {data.explanation}
                        </Text>
                        <Text fz="sm" >
                            {data.maturity}
                        </Text>
                        <Divider mt="1rem" size="xs" color="black" />


                        <Grid justify="flex-start" align="center" mt={"1rem"} >
                            <Grid.Col span={3} ><Text fz="sm" >
                                Stage of participation :
                            </Text >
                            </Grid.Col>
                            <Grid.Col span={9} >
                                <Textarea
                                    {...form.getInputProps('stageOfParticipation')}
                                    autosize
                                    minRows={1}
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
                    </Card.Section>
                </Card>
                <Flex gap="md"
                    justify="center"
                    align="flex-start"
                    direction="column"
                    wrap="wrap">

                    <ActionIcon size="lg">
                        <IconCheck />
                    </ActionIcon>
                    <ActionIcon size="lg" color="red">
                        <IconTrash />
                    </ActionIcon>

                </Flex>


            </Flex>
        </div>
    )
}

const NewTechnologyForm = () => {
    const [opened, setOpened] = useState<boolean>(false);

    const form = useForm<TechnologyForm>({
        initialValues: {
            technology: '',
            description: ''
        },
    })


    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Add new technology">
                <Title order={2}>
                    <TextInput
                        size="lg"
                        variant="unstyled"
                        withAsterisk
                        placeholder="Technology"
                        {...form.getInputProps('Tmail')}
                    />
                </Title>
                <Textarea
                    mt={"1rem"}
                    autosize
                    variant="unstyled"
                    withAsterisk
                    placeholder="Description"
                    {...form.getInputProps('description')}
                />
                <Group justify="flex-end" mt={"1rem"}>
                    <Button>Save</Button>
                </Group>
            </Modal>


            <ActionIcon onClick={() => setOpened(!opened)} size={'lg'}>
                <Button ></Button>
            </ActionIcon>

        </>

    )
}

const NewApplicationForm = () => {
    const [opened, setOpened] = useState<boolean>(false);

    const form = useForm<ApplicationForm>({
        initialValues: {
            potentialApplications: "",
            explanation: "",
            maturity: "",
            stageOfParticipation: "",
            purposeOfEngagement: [],
            levelOfEngagement: "",
            scale: "",
            budget: "",
            solutionFor: "",
            considerations: ""
        },
    })


    return (
        <>
            <Modal size="xl" opened={opened} onClose={() => setOpened(false)} title="Add new technology">

                <Group justify="center">
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
                        <Textarea
                            {...form.getInputProps('stageOfParticipation')}
                            autosize
                            minRows={1}
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
                <Group justify="flex-end" mt={"1rem"}>
                    <Button>Save</Button>
                </Group>
            </Modal>


            <ActionIcon onClick={() => setOpened(!opened)} size={'lg'}>
                <IconTablePlus />
            </ActionIcon>

        </>

    )
}

export default App