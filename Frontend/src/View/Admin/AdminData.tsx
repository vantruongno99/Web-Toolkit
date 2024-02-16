import React, { useState } from "react";
import { Flex, Button, Paper, Title, Text, Textarea, Grid, Select, MultiSelect, Divider, Modal, Group, TextInput, ActionIcon, Card, Center, Container } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import technologyService from "../../Services/technology.service";
import { isNotEmpty, useForm } from '@mantine/form';
import { TechnologyInfo, TechnologyInput } from "../../Ultils/type";
import { IconCheck, IconCirclePlus, IconTablePlus, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TechnologyCard from "../../Component/ApplicationCard/TechnologyCard";
import { showErorNotification } from "../../Ultils/notification";


const AdminData = () => {
    const navigate = useNavigate()
    const { isLoading, error, isError, data } = useQuery({
        queryKey: ["admin , technologies"],
        queryFn: async () => {
            try {
                const res = await technologyService.getAllTechnology()
                if (!res) {
                    throw new Error()
                }

                return res
            }
            catch (e: any) {
                showErorNotification(e.message)
            }
        }
    }
    )
    if (!data) {
        return <>
        </>
    }



    return (
        <Container fluid maw={1050}>
            <Center mt={"1rem"} mb={"2rem"}>
                <Title order={2} c="indigo">
                    TECHNOLOGY LIST
                </Title>
            </Center>
            <Grid gutter={"md"}>

                {data.map((a, i) =>
                    <Grid.Col span={3}>
                        <TechnologyCard data={{
                            label: a.technology,
                            link: `/admin/technology/${a.id}`,
                        }}></TechnologyCard>
                    </Grid.Col>
                )}

            </Grid>
            <NewTechology />

        </Container>
    )

}

const NewTechology = () => {
    const [opened, setOpened] = useState<boolean>(false)

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

    const queryClient = useQueryClient()
    const navigate = useNavigate()


    const createApplication = useMutation({
        mutationFn: async (input: TechnologyInput) => {
            const output = await technologyService.createTechnology(input)
            if (!output) {
                throw new Error()
            }
            return output
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ["admin , technologies"] })
            setOpened(!opened)
            navigate(`/admin/technology/${result.id}`)
        },
        onError: (e) => {
            showErorNotification(e.message)
        },
    })

    return (<>
        <Group justify="center" mt={"3rem"}>
            <Button onClick={() => setOpened(!opened)} size={'lg'}>
                ADD MORE
            </Button>
        </Group>


        <Modal withCloseButton={false} size="xl" opened={opened} onClose={() => setOpened(false)}>
            <Center mb={"1rem"}>
                <Title order={3}>
                    ADD NEW TECHNOLOGY
                </Title>
            </Center>
            <Divider color={"dark"} />
            <form onSubmit={form.onSubmit(data => createApplication.mutate(data))}>
                <Title order={2}>
                    <TextInput
                        withAsterisk
                        label="Technology"
                        {...form.getInputProps('technology')}
                    />
                </Title>
                <Text fz="sm" mt={"1rem"} >
                    <Textarea
                        mt={"1rem"}
                        autosize
                        withAsterisk
                        label="Description"
                        {...form.getInputProps('description')}
                    />                            </Text>
                <Group justify="flex-end" mt={"1rem"}>
                    <Button type="submit">Save</Button>
                </Group>
            </form>
        </Modal >





    </>)
}





export default AdminData