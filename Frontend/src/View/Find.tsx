import { Table, Container, ScrollArea, Modal, Card, Text, Group, ActionIcon, Flex, Textarea, Grid, Select, Title, MultiSelect, Center, Divider, TextInput, Button, Radio, Chip, RangeSlider, Collapse, UnstyledButton, rem, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from "react"
import { useForm } from '@mantine/form';
import { IconCircleMinus, IconCirclePlus, IconEye, IconMessageCircle } from '@tabler/icons-react'
import classes from './Find.module.css';
import { ApplicationInfo } from "../Ultils/type"
import applicationService from "../Services/application.service"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query';
import dataService from '../Services/data.service';
import { showErorNotification } from '../Ultils/notification';

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



    interface FilterForm {
        purpose: string[],
        engagement: string[],
        scale: string[],
        budget: string[],
        stage: string[],
        solution: string[]
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


    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['input'],
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


    return (
        <Container fluid p="1rem" >
            <form onSubmit={form.onSubmit(filterData)}>
                <div className={classes.outside}>
                    <Flex
                        gap="md"
                        justify="center"
                        align="center"
                        direction="column"
                        wrap="wrap"
                        pl={"8rem"}
                        pr={"8rem"}

                    >
                        <Title className={classes.header} order={1}>Find the right technology usecase for your project</Title>
                        <Title className={classes.header}  order={3} mt={"3rem"}>
                            You'll discover various engagement scenarios tailored to different contexts, levels of participation, budget, and scale, all designed to fulfill specific needs and objectives.
                        </Title>
                        <Title className={classes.header}   order={3} mt={"3rem"} mb={"5rem"}>
                            Browse through the entire database of usecases to find inspiration, or apply our search filters to. narrow down technology usecases that are well-suited for your specific needs.
                        </Title>
                    </Flex>

                    <Group mr={"1rem"} justify="flex-end">
                        <Text>Propose a usecase based on filter selection</Text>
                    </Group>
                    <Container fluid className={classes.outerFilter}>
                        <br />
                        <Container className={classes.filter} m={"2rem"} fluid pt={"1rem"} pb={"1rem"} >
                            <Grid>
                                <Grid.Col span={2.4} className={classes.leftFilter}>
                                    <Center pb={"1rem"}>
                                        <Title order={6}>Stage of participation</Title>
                                    </Center>
                                    <MultiSelect
                                        data={data?.participation}
                                        {...form.getInputProps('stage')}
                                    />
                                </Grid.Col>
                            
                                <Grid.Col span={2.4} className={classes.leftFilter}>
                                    <Center pb={"1rem"}>
                                        <Title order={5}>Purpose</Title>
                                    </Center>
                                    <MultiSelect
                                        data={data?.purpose}
                                        {...form.getInputProps('purpose')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={2.4} className={classes.leftFilter}>
                                    <Center pb={"1rem"}>
                                        <Title order={5}>Scale</Title>
                                    </Center>
                                    <MultiSelect
                                        data={data?.scale}
                                        {...form.getInputProps('scale')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={2.4} className={classes.leftFilter}>
                                    <Center pb={"1rem"}>
                                        <Title order={5}>Budget</Title>

                                    </Center>
                                    <MultiSelect
                                        data={data?.budget}
                                        {...form.getInputProps('budget')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={2.4} >
                                    <Center pb={"1rem"}>
                                        <Title order={5}>Solution For</Title>

                                    </Center>
                                    <MultiSelect
                                        data={data?.solution}
                                        {...form.getInputProps('solution')}
                                    />
                                </Grid.Col>

                            </Grid>


                        </Container>
                        <Center className={classes.searchButton}>
                            <Button size='xl' variant="filled" color="indigo" radius="xl" type="submit" className={classes.findButton}>
                                <Title order={1}>&nbsp;&nbsp; &nbsp;SEARCH&nbsp;&nbsp;&nbsp;</Title>
                            </Button>
                        </Center>

                    </Container>
                </div>



                <br />


                <div className={classes.cardSection} >
                    <ScrollArea className={classes.scrollbar} scrollbarSize={2} scrollHideDelay={0}>
                        <Container fluid p={"2rem"}>
                            <Grid justify="left" align="stretch" gutter="xl">
                                {filtered?.map((a, i) => <Grid.Col span={3}> <Inside data={a} key={i} />                                    </Grid.Col>
                                )}
                            </Grid>
                        </Container>
                    </ScrollArea>
                </div>
            </form >
        </Container >
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



    return (
        <div>
            <Card
                shadow='xl'
                component="a"
                radius="xs"
                href={`/data/application/${data.id}${objString}`}
                className={classes.card}
            >
                <div
                    className={classes.image}
                    style={{
                        backgroundImage:
                            `url(${data.imageUrl})`,
                    }}
                />
                <div className={classes.overlay} />

                <div className={classes.content}>
                    <div>
                        <Text size="lg" className={classes.title} fw={700}>
                            {data.potentialApplications}
                        </Text>
                    </div>
                </div>
            </Card>
        </div>
    )
}



export default Find