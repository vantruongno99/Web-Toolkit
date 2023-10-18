import React, { useState } from "react";
import { Flex, Button, Paper, Title, Text, Textarea, Grid, Select, MultiSelect, Divider, Modal, Group, TextInput, ActionIcon, Card, Center } from "@mantine/core";
import classes from './Home.module.css';
import { Application, LandingData } from "../type";
import { useNavigate } from 'react-router-dom';
import technologyService from "../Services/technology.service";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { TechnologyInfo } from "../Ultils/type";
import { IconCheck, IconTablePlus, IconTrash } from "@tabler/icons-react";
import styles from './Admin.module.css'


const Admin = () => {

    const [data, setData] = useState<TechnologyInfo[] | undefined>([])

    const getTechData = async () => {
        try {
            const technologies = await technologyService.getAllTechnology()
            setData(technologies)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => { getTechData() }, [])

    if (!data) {
        return <>
        </>
    }



    return (
        <>
            <Title>ABOUT THE TOOLKIT</Title>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non sem rhoncus, hendrerit felis malesuada, ornare nulla. Maecenas eu placerat urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ut fringilla lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            </Text>
            {data.map((d, i) => <Outside data={d} key={i} />)}

        </>
    )

}




const Outside = ({ data }: { data: TechnologyInfo }) => {

    const [showed, setShowed] = useState<boolean>(false)


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
                    {data.Application.map(d => <Inside data={d} />)}
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








export default Admin