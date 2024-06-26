import React, { useState, useRef } from "react";
import { Text, Button, Paper, Title, Loader, Center, Container, TagsInput, Tabs } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import { IconCheck, IconCirclePlus, IconTablePlus, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Data, DataForm } from "../../Ultils/type";
import { useForm } from "@mantine/form";
import dataService from "../../Services/data.service";
import { showErorNotification, showSuccessNotification } from "../../Ultils/notification";


const AdminInput = () => {
    let initial = useRef<DataForm>({
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
                    const values = {
                        purpose: res.purpose.map(a => a.name),
                        engagement: res.engagement.map(a => a.name),
                        scale: res.scale.map(a => a.name),
                        budget: res.budget.map(a => a.name),
                        participation: res.participation.map(a => a.name),
                        solution: res.solution.map(a => a.name)
                    }
                    form.setInitialValues(values)
                    form.setValues(values)
                    initial.current = values
                    return res
                }
            }
            catch (e:any) {
                showErorNotification(e.message)
            }
        }
    }
    )

    interface MutationFormat {
        add: DataForm,
        remove: DataForm
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
            showSuccessNotification("input has been updated")
        }
    })




    const form = useForm<DataForm>({
        initialValues: {
            purpose: [],
            engagement: [],
            scale: [],
            budget: [],
            participation: [],
            solution: []
        },
        validate: {
            purpose: (value) => value.every(a => a.charCodeAt(0) >= 65 && a.charCodeAt(0) <= 90) ? null : "First letter need to be in capital",
            engagement: (value) => value.every(a => a.charCodeAt(0) >= 65 && a.charCodeAt(0) <= 90) ? null : "First letter need to be in capital",
            participation: (value) => value.every(a => a.charCodeAt(0) >= 65 && a.charCodeAt(0) <= 90) ? null : "First letter need to be in capital",
            solution: (value) => value.every(a => a.charCodeAt(0) >= 65 && a.charCodeAt(0) <= 90) ? null : "First letter need to be in capital",
        }
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

    const handleSubmit = async (input: DataForm) => {
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

        catch (e:any) {
            showErorNotification(e.message)
        }
    }





    return (
        <Container>
            <Center mt={"1rem"} mb={"2rem"}>
                <Title order={2} c="indigo">
                    INPUT MANAGEMENT
                </Title>
            </Center>
            <form onSubmit={form.onSubmit(handleSubmit)}>

                <Tabs defaultValue="participation">
                    <Tabs.List>
                    <Tabs.Tab value="participation">
                            Participation
                        </Tabs.Tab>
                        <Tabs.Tab value="purpose" >
                            Purpose
                        </Tabs.Tab>
                        <Tabs.Tab value="enagagement" >
                            Enagagement
                        </Tabs.Tab>
                        <Tabs.Tab value="scale">
                            Scale
                        </Tabs.Tab>
                        <Tabs.Tab value="budget">
                            Budget
                        </Tabs.Tab>
                      
                        <Tabs.Tab value="solution">
                            Solution
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="purpose">
                        <Guide />
                        <TagsInput mt="1rem" size="md"  {...form.getInputProps('purpose')} />
                    </Tabs.Panel>
                    <Tabs.Panel value="enagagement">
                        <Guide />
                        <TagsInput mt="1rem" size="md"  {...form.getInputProps('engagement')} />
                    </Tabs.Panel>
                    <Tabs.Panel value="scale">
                        <Guide />
                        <TagsInput mt="1rem" size="md"   {...form.getInputProps('scale')} />
                    </Tabs.Panel>
                    <Tabs.Panel value="budget">
                    <Guide/>
                        <TagsInput mt="1rem" size="md"  {...form.getInputProps('budget')} />
                    </Tabs.Panel>
                    <Tabs.Panel value="participation">
                    <Guide/>
                        <TagsInput mt="1rem" size="md"   {...form.getInputProps('participation')} />
                    </Tabs.Panel>
                    <Tabs.Panel value="solution">
                    <Guide/>
                        <TagsInput mt="1rem" size="md"   {...form.getInputProps('solution')} />
                    </Tabs.Panel>








                    <Button disabled={updateInput.isPending || !form.isDirty()} mt="2rem" type="submit">Submit {updateInput.isPending && <Loader ml={"1rem"} size="sm" />} </Button>
                </Tabs>

            </form>
        </Container>
    )

}


const Guide = () => {
    return (<Container >
        <ul>
            <li>Type and Enter to add new input  </li>
            <li>Click on X to remove an input</li>
        </ul>
    </Container>)
}



export default AdminInput