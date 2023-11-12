import { Image, Container, ScrollArea, Modal, Card, Text, Group, ActionIcon, Flex, Textarea, Grid, Select, Title, MultiSelect, Center, Divider, TextInput, Button, Radio, Chip, RangeSlider, Collapse, UnstyledButton } from '@mantine/core'
import { useEffect, useState } from "react"
import styles from './index.module.css'
import { useForm } from '@mantine/form';

import { IconCircleMinus, IconCirclePlus } from '@tabler/icons-react'
import classes from './Find.module.css';
import { ApplicationInfo } from "../Ultils/type"
import applicationService from "../Services/application.service"
import { useNavigate, useSearchParams } from "react-router-dom"

const Find = () => {
    const [applications, setApplications] = useState<ApplicationInfo[] | undefined>([])
    const [filtered, setFiltered] = useState<ApplicationInfo[] | undefined>([])


    useEffect(() => {
        getData()
    }, [])

    const check = (array1: string[], array2: string[]) => array2.length == 0 || array1.length === 0 ? true : array2.every(val => array1.includes(val))



    const getData = async () => {
        const data = await applicationService.getAllApplication()
        console.log(data)
        setApplications(data)
        setFiltered(data)
    }

    const form = useForm<FilterForm>({
        initialValues: {
            purpose: [],
            engagement: [],
            scale: [],
            budget: [],
            stage: [],
            solution: []
        },
    });


    const optionForm = useForm<FilterOption>({
        initialValues: {
            purpose: false,
            engagement: false,
            scale: false,
            budget: false,
            stage: false,
            solution: false
        },
    });

    interface FilterForm {
        purpose: string[],
        engagement: string[],
        scale: string[],
        budget: string[],
        stage: string[],
        solution: string[]
    }

    interface FilterOption {
        purpose: boolean,
        engagement: boolean,
        scale: boolean,
        budget: boolean,
        stage: boolean,
        solution: boolean
    }

    const filterData = (data: FilterForm) => {
        const b = applications?.filter((a: ApplicationInfo) =>
            (data.engagement.length === 0 ? true : data.engagement.includes(a.levelOfEngagement))
            && (data.budget.length === 0 ? true : data.budget.includes(a.budget))
            && (data.scale.length === 0 ? true : data.scale.includes(a.scale))
            && check(a.purposeOfEngagement.split(', ').map(a => a == '' ? '' : a[0].toUpperCase() +
                a.slice(1)), data.purpose)
            && check(a.stageOfParticipation.split(', ').map(a => a == '' ? '' : a[0].toUpperCase() +
                a.slice(1)), data.stage)
            && check(a.solutionFor.split(', ').map(a => a == '' ? '' : a[0].toUpperCase() +
                a.slice(1)), data.solution)
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

                        <UnstyledButton onClick={() => optionForm.setFieldValue("purpose", !optionForm.values.purpose)} component="button">
                            <Flex
                                justify="center"
                                align="center"
                                mt="1rem"
                                gap={"0.5rem"}
                            >
                                <Title order={4} >
                                    Purpose (IAP2)
                                </Title>
                                {optionForm.values.purpose ? <IconCircleMinus /> : <IconCirclePlus />}
                            </Flex>
                        </UnstyledButton>
                        <Collapse in={optionForm.values.purpose} transitionTimingFunction="linear">
                            <Chip.Group multiple {...form.getInputProps('purpose')}>
                                <Flex
                                    mt={"1rem"}
                                    gap="sm"
                                    justify="flex-start"
                                    align="flex-start"
                                    direction="row"
                                    wrap="wrap"
                                >
                                    <Chip value="Problem identification" size="md"  >Inform</Chip>
                                    <Chip value="Consult" size="md" >Consult</Chip>
                                    <Chip value="Involve" size="md">Involve</Chip>
                                    <Chip value="Collaborate" size="md">Collaborate</Chip>
                                    <Chip value="Empower" size="md">Empower</Chip>
                                </Flex>
                            </Chip.Group>
                        </Collapse>
                        <br />

                        <UnstyledButton onClick={() => optionForm.setFieldValue("stage", !optionForm.values.stage)} component="button">
                            <Flex
                                justify="center"
                                align="center"
                                mt="1rem"
                                gap={"0.5rem"}
                            >
                                <Title order={4} >
                                    Stage of participation
                                </Title>
                                {optionForm.values.stage ? <IconCircleMinus /> : <IconCirclePlus />}
                            </Flex>
                        </UnstyledButton>

                        <Collapse in={optionForm.values.stage} transitionTimingFunction="linear">
                            <Chip.Group multiple {...form.getInputProps('stage')}>
                                <Flex
                                    mt={"1rem"}
                                    gap="sm"
                                    justify="flex-start"
                                    align="flex-start"
                                    direction="row"
                                    wrap="wrap"
                                >
                                    <Chip value="Problem identification" size="md"  >Problem identification</Chip>
                                    <Chip value="Problem definition/prioritization" size="md" >Problem definition/prioritization</Chip>
                                    <Chip value="Input/feedback" size="md">Input/feedback</Chip>
                                    <Chip value="Evaluation" size="md">Evaluation</Chip>
                                    <Chip value="Co-creation" size="md">Co-creation</Chip>
                                </Flex>
                            </Chip.Group>
                        </Collapse>
                        <br />
                        <UnstyledButton onClick={() => optionForm.setFieldValue("engagement", !optionForm.values.engagement)} component="button">
                            <Flex
                                justify="center"
                                align="center"
                                mt="1rem"
                                gap={"0.5rem"}
                            >
                                <Title order={4} >
                                    Level of Engagement
                                </Title>
                                {optionForm.values.engagement ? <IconCircleMinus /> : <IconCirclePlus />}
                            </Flex>
                        </UnstyledButton>
                        <Collapse in={optionForm.values.engagement} transitionTimingFunction="linear">
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
                        </Collapse>

                        <br />
                        <UnstyledButton onClick={() => optionForm.setFieldValue("scale", !optionForm.values.scale)} component="button">
                            <Flex
                                justify="center"
                                align="center"
                                mt="1rem"
                                gap={"0.5rem"}
                            >
                                <Title order={4} >
                                    Scale
                                </Title>
                                {optionForm.values.scale ? <IconCircleMinus /> : <IconCirclePlus />}
                            </Flex>
                        </UnstyledButton>
                        <Collapse in={optionForm.values.scale} transitionTimingFunction="linear">
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
                        </Collapse>

                        <br />
                        <UnstyledButton onClick={() => optionForm.setFieldValue("budget", !optionForm.values.budget)} component="button">
                            <Flex
                                justify="center"
                                align="center"
                                mt="1rem"
                                gap={"0.5rem"}
                            >
                                <Title order={4} >
                                    Budget
                                </Title>
                                {optionForm.values.budget ? <IconCircleMinus /> : <IconCirclePlus />}
                            </Flex>
                        </UnstyledButton>
                        <Collapse in={optionForm.values.budget} transitionTimingFunction="linear">
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
                        </Collapse>

                        <br />
                        <UnstyledButton onClick={() => optionForm.setFieldValue("solution", !optionForm.values.solution)} component="button">
                            <Flex
                                justify="center"
                                align="center"
                                mt="1rem"
                                gap={"0.5rem"}
                            >
                                <Title order={4} >
                                    Solution for
                                </Title>
                                {optionForm.values.solution ? <IconCircleMinus /> : <IconCirclePlus />}
                            </Flex>
                        </UnstyledButton>
                        <Collapse in={optionForm.values.solution} transitionTimingFunction="linear">
                            <Chip.Group multiple {...form.getInputProps('solution')}>
                                <Flex
                                    mt={"1rem"}
                                    gap="sm"
                                    justify="flex-start"
                                    align="flex-start"
                                    direction="row"
                                    wrap="wrap"
                                >
                                    <Chip size="md" value="Lack of knowledge and understanding">Lack of knowledge and understanding</Chip>
                                    <Chip size="md" value="Dialogue">Dialogue</Chip>
                                    <Chip size="md" value="Lack of interest and time">Lack of interest and time</Chip>
                                    <Chip size="md" value="Distrust">Distrust</Chip>
                                    <Chip size="md" value="Resistance to change">Resistance to change</Chip>
                                    <Chip size="md" value="Conflict in interests">Conflict in interests</Chip>
                                </Flex>
                            </Chip.Group>
                        </Collapse>
                        <br/>

                        <Button mt="2rem" type="submit">
                            Search
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={8} className={classes.cardSection} >
                        <ScrollArea className={classes.scrollbar} scrollbarSize={2} scrollHideDelay={0}>
                            <Container fluid p={"2rem"}>
                                <Grid justify="left" align="stretch" gutter="xl">
                                    {filtered?.map((a, i) => <Grid.Col span={4}> <Inside data={a} key={i} />                                    </Grid.Col>
                                    )}
                                </Grid>
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


const Inside = ({ data }: { data: ApplicationInfo }) => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const value = Object.fromEntries([...searchParams]);
    const objString = '?' + new URLSearchParams(value).toString();



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
        <div >

            <Card
                shadow="sm"
                padding="xl"
                component="a"
                radius="md"
                onClick={() => navigate(`/data/application/${data.id}${objString}`)}
                target="_blank"
                className={classes.app}
            >
                <Card.Section>
                    <Image
                        src={data.imageUrl}
                        height={160}
                        alt="Image"
                    />
                </Card.Section>

                <Text fw={500} size="lg" mt="md">
                    {data.potentialApplications}
                </Text>


                <Text size="sm" c="dimmed">
                    {data.explanation}
                </Text>
            </Card >
        </div >
    )
}



export default Find