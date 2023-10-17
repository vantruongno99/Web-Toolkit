import data from "../data.json"
import { Container, ScrollArea, Modal, Card, Text, Group, ActionIcon, Flex, Textarea, Grid, Select, Title, MultiSelect, Center, Divider, TextInput, Button, Radio, Chip, RangeSlider } from '@mantine/core'
import { Technology, Application, TechnologyForm } from "../type"
import { useEffect, useState } from "react"
import styles from './index.module.css'
import { useForm } from '@mantine/form'
import { IconTrash, IconCheck, IconTablePlus } from '@tabler/icons-react'
import classes from './Find.module.css';
import { ApplicationInfo } from "../Ultils/type"
import ApplicationService from "../Services/application.service"

const Find = () => {
    const [applications, setApplications] = useState<ApplicationInfo[] | undefined>([])
    const [filtered, setFiltered] = useState<ApplicationInfo[] | undefined>([])


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await ApplicationService.getAllApplication()
        setApplications(data)
        setFiltered(data)
    }

    const form = useForm<FilterForm>({
        initialValues: {
            keyword: '',
            purpose: [],
            engagement: [],
            scale: [],
            budget: []
        },
    });

    interface FilterForm {
        keyword: string,
        purpose: string[],
        engagement: string[],
        scale: string[],
        budget: string[]
    }

    const filterData = (data: FilterForm) => {
        console.log(data)
        const b = applications?.filter((a: ApplicationInfo) => 
            (data.engagement.length === 0 ?  true  : data.engagement.includes(a.levelOfEngagement))
            &&(data.budget.length === 0 ? true : data.budget.includes(a.budget))
            &&(data.scale.length === 0 ? true : data.scale.includes(a.scale))
        )

        setFiltered(b)
    }


    return (
        <div >
            <form onSubmit={form.onSubmit(filterData)}>
                <Grid  >
                    <Grid.Col span={4} p={'3rem'} >
                        <Title order={3}>
                            TOOLS
                        </Title>
                        <Text mt={"1rem"}>
                            Use the filter below to identify the engagement tools that best suit your specific road safety engagement needs.
                        </Text>
                        <Title order={4} mt="1rem">
                            Keyword
                        </Title>
                        <TextInput mt="1rem"  {...form.getInputProps('keyword')} />
                        <Title order={4} mt="1rem">
                            Purpose (IAP2)
                        </Title>


                        <Chip.Group multiple {...form.getInputProps('purpose')}>
                            <Flex
                                mt={"1rem"}
                                gap="sm"
                                justify="flex-start"
                                align="flex-start"
                                direction="row"
                                wrap="wrap"
                            >
                                <Chip value="Inform" size="md"  >Inform</Chip>
                                <Chip value="Consult" size="md" >Consult</Chip>
                                <Chip value="Involve" size="md">Involve</Chip>
                                <Chip value="Collaborate" size="md">Collaborate</Chip>
                                <Chip value="Empower" size="md">Empower</Chip>
                            </Flex>
                        </Chip.Group>



                        <Title order={4} mt="1rem">
                            Level of Engagement
                        </Title>
                        <Chip.Group multiple {...form.getInputProps('engagement')}>
                            <Flex
                                mt={"1rem"}
                                gap="sm"
                                justify="flex-start"
                                align="flex-start"
                                direction="row"
                                wrap="wrap"
                            >
                                <Chip value="Active" size="md">Active</Chip>
                                <Chip value="Passive" size="md">Passive</Chip>
                                <Chip value="Immersive" size="md">Immersive</Chip>

                            </Flex>
                        </Chip.Group>

                        <Title order={4} mt="1rem">
                            Scale
                        </Title>
                        <Chip.Group multiple {...form.getInputProps('scale')}>
                            <Flex
                                mt={"1rem"}
                                gap="sm"
                                justify="flex-start"
                                align="flex-start"
                                direction="row"
                                wrap="wrap"
                            >
                                <Chip value="Invidual" size="md">Invidual</Chip>
                                <Chip value="Small Group" size="md">Small Group</Chip>
                                <Chip value="Large Group" size="md">Large Group</Chip>
                                <Chip value="Public" size="md">Public</Chip>

                            </Flex>
                        </Chip.Group>

                        <Title order={4} mt="1rem">
                            Budget
                        </Title>
                        <Chip.Group multiple {...form.getInputProps('budget')}>
                            <Flex
                                mt={"1rem"}
                                gap="sm"
                                justify="flex-start"
                                align="flex-start"
                                direction="row"
                                wrap="wrap"
                            >
                                <Chip size="md" value="$">$</Chip>
                                <Chip size="md" value="$$">$$</Chip>
                                <Chip size="md" value="$$$">$$$</Chip>
                                <Chip size="md" value="$$$$">$$$$</Chip>
                            </Flex>
                        </Chip.Group>
                        <Button mt={"1rem"} type="submit">
                            Search
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={8} className={classes.cardSection} >
                        <ScrollArea className={classes.scrollbar} scrollbarSize={2} scrollHideDelay={0}>
                            <Container fluid p={"2rem"}>
                                {filtered?.map((a, i) => <Inside data={a} key={i} />)}

                            </Container>
                        </ScrollArea>
                    </Grid.Col>
                </Grid>
            </form>
        </div >
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
            purposeOfEngagement: data.purposeOfEngagement.split(',').map((a: string) => a.charAt(0).toUpperCase()
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





                    </Card.Section>
                </Card>
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
                        size="md"
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

export default Find