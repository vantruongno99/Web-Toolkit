import React, { useState } from "react";
import { Flex, Button, Paper, Title, Text, Textarea, Grid, Select, MultiSelect, Divider, Modal, Group, TextInput, ActionIcon, Card, Center, Container } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import technologyService from "../../Services/technology.service";
import { useForm } from "@mantine/form";
import { TechnologyInfo, TechnologyInput } from "../../Ultils/type";
import { IconCheck, IconCirclePlus, IconTablePlus, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


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
            catch (e) {
                console.log(e)
            }
        }
    }
    )
    if (!data) {
        return <>
        </>
    }



    return (
        <Container>
            {data.map((d, i) => <Outside data={d} key={i} />)}
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
            console.log(e)
        },
    })

    return (<>
        <Card p={"2rem"} radius="md" withBorder >
            <Card.Section onClick={() => setOpened(!opened)}>
                <Group justify="center">
                    <ActionIcon size={'lg'}>
                        <IconCirclePlus />
                    </ActionIcon>
                </Group>
                <Text fz="sm" mt="1rem">
                </Text>
            </Card.Section>
        </Card>


        <Modal size="xl" opened={opened} onClose={() => setOpened(false)} title="Add new technology">
            <form onSubmit={form.onSubmit(data => createApplication.mutate(data))}>
                <Title order={2}>
                    <TextInput
                        variant="unstyled"
                        size="lg"
                        withAsterisk
                        placeholder="Technology"
                        {...form.getInputProps('technology')}
                    />
                </Title>
                <Text fz="sm" mt={"1rem"} >
                    <Textarea
                        variant="unstyled"
                        mt={"1rem"}
                        autosize
                        withAsterisk
                        placeholder="Description"
                        {...form.getInputProps('description')}
                    />                            </Text>
                <Group justify="flex-end" mt={"1rem"}>
                    <Button type="submit">Save</Button>
                </Group>
            </form>
        </Modal >





    </>)
}




const Outside = ({ data }: { data: TechnologyInfo }) => {

    const [showed, setShowed] = useState<boolean>(false)
    const navigate = useNavigate()


    return (<>
        <div style={{ width: "auto" }}>
            <Card p={"2rem"} radius="md" withBorder onClick={()=>navigate(`/admin/technology/${data.id}`)}>
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
        </div>

    </>
    )
}





export default AdminData