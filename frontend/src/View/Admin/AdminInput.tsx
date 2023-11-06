import React, { useState, useRef } from "react";
import { Flex, Button, Paper, Title, Text, Textarea, Grid, Select, MultiSelect, Divider, Modal, Group, TextInput, ActionIcon, Card, Center, Container, TagsInput } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import { IconCheck, IconCirclePlus, IconTablePlus, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Data } from "../../Ultils/type";
import { useForm } from "@mantine/form";
import dataService from "../../Services/data.service";


const AdminInput = () => {
    const navigate = useNavigate()
    let initial = useRef<Data>({
        purpose: [],
        engagement: [],
        scale: [],
        budget: [],
        participation: [],
        solution: []
    })

    useQuery({
        queryKey: ["admin , input"],
        queryFn: async () => {
            try {
                const res = await dataService.getAll()
                if (!res) {
                    throw new Error()
                }
                else {
                    form.setInitialValues(res)
                    form.setValues(res)
                    initial.current = res
                    return res
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    )

    interface MutationFormat {
        add: Data,
        remove: Data
    }

    const queryClient = useQueryClient()


    const updateInput = useMutation({
        mutationFn: async (data: MutationFormat) => {
            for await (const [key, value] of Object.entries(data.add)) {
                await all("add", key, value)
            }
            for (const [key, value] of Object.entries(data.remove)) {
                await all("delete", key, value)
            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin , input"] })
        }
    })




    const form = useForm<Data>({
        initialValues: {
            purpose: [],
            engagement: [],
            scale: [],
            budget: [],
            participation: [],
            solution: []
        },
    });

    const add = (arr1: string[], arr2: string[]) => {
        return arr2.filter(item => arr1.indexOf(item) === -1)
    }

    const remove = (arr1: string[], arr2: string[]) => {
        return arr1.filter(item => arr2.indexOf(item) === -1)
    }

    const all = async (type: string, name: string, data: string) => {
        if (data.length === 0) {
            return;
        }
        switch (type) {
            case "add":
                switch (name) {
                    case "purpose":
                        for await (const d of data) {
                            await dataService.createPurpose(d)
                        }
                        break;

                    case "engagement":
                        for await (const d of data) {
                            await dataService.createEngagement(d)
                        }
                        break;

                    case "scale":
                        for await (const d of data) {
                            await dataService.createScale(d)
                        }
                        break;


                    case "budget":
                        for await (const d of data) {
                            await dataService.createBudget(d)
                        }
                        break;

                    case "participation":
                        for await (const d of data) {
                            await dataService.createParticipation(d)
                        }
                        break;

                    case "solution":
                        for await (const d of data) {
                            await dataService.createSolution(d)
                        }
                        break;


                }
                break;
            case "delete":
                switch (name) {
                    case "purpose":
                        for await (const d of data) {
                            await dataService.deletePurpose(d)
                        }
                        break;

                    case "engagement":
                        for await (const d of data) {
                            await dataService.deleteEngagement(d)
                        }
                        break;

                    case "scale":
                        for await (const d of data) {
                            await dataService.deleteScale(d)
                        }
                        break;


                    case "budget":
                        for await (const d of data) {
                            await dataService.deleteBudget(d)
                        }
                        break;

                    case "participation":
                        for await (const d of data) {
                            await dataService.deleteParticipation(d)
                        }
                        break;

                    case "solution": for await (const d of data) {
                        await dataService.deletesolution(d)
                    }
                        break;


                }
                break;

        }
    }

    const handleSubmit = async (input: Data) => {
        try {
            const data = {
                add: {
                    purpose: add(initial.current.purpose, input.purpose),
                    engagement: add(initial.current.engagement, input.engagement),
                    scale: add(initial.current.scale, input.scale),
                    budget: add(initial.current.budget, input.budget),
                    participation: add(initial.current.participation, input.participation),
                    solution: add(initial.current.solution, input.solution)

                },
                remove: {
                    purpose: remove(initial.current.purpose, input.purpose),
                    engagement: remove(initial.current.engagement, input.engagement),
                    scale: remove(initial.current.scale, input.scale),
                    budget: remove(initial.current.budget, input.budget),
                    participation: remove(initial.current.participation, input.participation),
                    solution: remove(initial.current.solution, input.solution)

                }
            }
            updateInput.mutateAsync(data)

        }

        catch (e) {
            console.log(e)
        }
    }



    return (
        <Container>
            <Center mt={"1rem"} mb={"2rem"}>
                <Title order={3}>
                    Input Magement
                </Title>
            </Center>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Title order={4} mt={"1rem"}>Purpose</Title>
                <TagsInput size="md" splitChars={[',']} {...form.getInputProps('purpose')} />
                <Title order={4} mt={"1rem"}>Enagagement</Title>
                <TagsInput size="md" splitChars={[',']}  {...form.getInputProps('engagement')} />
                <Title order={4} mt={"1rem"}>Scale</Title>
                <TagsInput size="md" splitChars={[',']}  {...form.getInputProps('scale')} />
                <Title order={4} mt={"1rem"}>Budget</Title>
                <TagsInput size="md" splitChars={[',']}  {...form.getInputProps('budget')} />
                <Title order={4} mt={"1rem"}>Participation</Title>
                <TagsInput size="md" splitChars={[',']}  {...form.getInputProps('participation')} />
                <Title order={4} mt={"1rem"}>Solution For</Title>
                <TagsInput size="md" splitChars={[',']}  {...form.getInputProps('solution')} />
                <Button mt="1rem" type="submit">Save</Button>
            </form>
        </Container>
    )

}



export default AdminInput