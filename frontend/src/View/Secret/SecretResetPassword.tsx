import { useNavigate } from "react-router-dom"
import { FileInput, Image, Box, Card, Container, Divider, Grid, Group, Input, NumberInput, Select, Space, Table, Tabs, Textarea, Title, Text, MultiSelect, TextInput, Button, Modal, ActionIcon, Fieldset, Center, PasswordInput } from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isNotEmpty, useForm } from '@mantine/form';
import { showErorNotification, showSuccessNotification } from "../../Ultils/notification";
import authservice from "../../Services/auth.service";
import classes from "./SecretResetPassword.module.css"



const SecretResetPassword = () => {
    
    const navigate = useNavigate()

    const form = useForm<{ newPassword: string }>({
        initialValues: {
            newPassword: ""
        },
        validate: {
            newPassword: isNotEmpty("can not be empty"),
        },
    })



    const updatePassword = useMutation({
        mutationFn: async (data: { newPassword: string }) => {
            return await authservice.secretResetPassword({
                username: "admin",
                newPassword: data.newPassword
            })
        },
        onSuccess: () => {
            showSuccessNotification("Password has been updated")
            navigate('/login')
        },
        onError: (e: Error) => {
            showErorNotification(e.message)
        },
    })


    return (<>
        <Container fluid maw={1100}>

            <form onSubmit={form.onSubmit(data => updatePassword.mutateAsync(data))}>
                <Container fluid pt={"1rem"} pb={"1rem"} className={classes.area}>
                    <Title c={"indigo"} order={2}>Update Password</Title>
                    <Title order={2}>
                        <PasswordInput  
                            withAsterisk
                            label="New Password"
                            size="md"
                            {...form.getInputProps('newPassword')}
                        />
                    </Title>

                    <Group justify="space-between" mt={"2rem"}>

                        <Button disabled={!form.isDirty()} type="submit" > Save change</Button>
                    </Group>
                </Container>
            </form>


        </Container>
    </>)
}


export default SecretResetPassword

