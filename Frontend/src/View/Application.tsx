import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Box, Card, Container, Divider, Flex, Grid, Group, Input, NumberInput, Select, Space, Table, Tabs, Textarea, Title, Text, MultiSelect, TextInput, Button, Modal } from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from '@mantine/core';
import { ApplicationInfo, ApplicationInput } from "../Ultils/type";
import applicationService from "../Services/application.service";
import { useForm } from "@mantine/form";
import styles from './index.module.css'
import vendorService from "../Services/vendor.service";
import Vendor from "./Vendor/Vendors";


interface Option {
    type: string | null,
    id?: number
}

const Application = () => {
    const params = useParams();
    const id = params.id
    const [searchParams] = useSearchParams();

    const type = searchParams.get('type')
    const typeId = Number(searchParams.get('id'))

    const option: Option = {
        type,
        ...(typeId && { id: typeId })
    }

    if (!id) {
        return <div>
            404
        </div>
    }

    const applicationId = parseInt(id)


    const { isLoading, error, isError, data } = useQuery({
        queryKey: ['application', applicationId],
        queryFn: async () => {
            try {
                const res = await applicationService.getApplication(applicationId)
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



    if (isLoading) {
        return <Loader />
    }


    if (!data) {
        return <>
            404
        </>
    }



    return (
        <>
            <Container mt={"1rem"}>
                <ApplicationDetail application={data} isLoading={isLoading} option={option} />
            </Container>

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

const ApplicationDetail = ({ application, isLoading, option }: { application: ApplicationInfo, isLoading: boolean, option: Option }) => {
    const navigate = useNavigate()
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
        const data = {
            ...application,
            purposeOfEngagement: application.purposeOfEngagement.split(', ').map(a => a == '' ? '' : a[0].toUpperCase() +
                a.slice(1))
        }
        form.setValues(data)
    }, [application])

    const vendorOption: Boolean = option.id !== undefined && option.type === "vendor"

    const alreadyRequest = application.Vendor?.find(a => a.Vendor.id === option.id)


    let rows = option.type == "vendor" ?
        (application.Vendor?.filter(a => a.Vendor.id === option.id).map((e, i) => (
            <Table.Tr key={i} >
                <Table.Td>{e.Vendor.name}</Table.Td>
                <Table.Td>{e.Vendor.ABN}</Table.Td>
                <Table.Td>{e.approved}</Table.Td>
            </Table.Tr>
        )))
        :
        (application.Vendor?.filter(a => a.approved === "APPROVED").map((e, i) => (
            <Table.Tr >
                <Table.Td key={i} onClick={() => navigate(`/vendor/${e.Vendor.id}?type=user`)}>{e.Vendor.name}</Table.Td>
                <Table.Td key={i} onClick={() => navigate(`/vendor/${e.Vendor.id}?type=user`)}>{e.Vendor.ABN}</Table.Td>
            </Table.Tr>
        )))



    interface assignInput {
        vendorId: number,
        applicationId: number,
        showcase: string
    }


    const assignRequest = useMutation({
        mutationFn: async (input: assignInput) => {
            return await vendorService.applicationRequest(input.applicationId, input.vendorId, { showcase: input.showcase })
        },
        onSuccess: () => {
            navigate(`/vendor/${option.id}`)
        },
        onError: (e: Error) => {
            console.log(e)
        },
    })

    return (
        <div >
            <Title>
                {form.values.potentialApplications}
            </Title>


            <Text mt={"1rem"} fz="sm"  >
                {form.values.explanation}
            </Text>

            <Divider mt="1rem" size="xs" color="black" />


            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="sm" >
                    Stage of participation :
                </Text >
                </Grid.Col>
                <Grid.Col span={9} >
                    <Text fz="sm"  >
                        {form.values.stageOfParticipation}
                    </Text>
                </Grid.Col>
            </Grid >


            <Grid justify="flex-start" align="center" mt={"1rem"}  >
                <Grid.Col span={3} ><Text fz="sm" >
                    Purpose :
                </Text >
                </Grid.Col>
                <Grid.Col span={9} >
                    <Text fz="sm"  >
                        {form.values.purposeOfEngagement}
                    </Text>
                </Grid.Col>
            </Grid >




            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="sm" >
                    Level :
                </Text >
                </Grid.Col>
                <Grid.Col span={3} >
                    <Text fz="sm"  >
                        {form.values.levelOfEngagement}
                    </Text>
                </Grid.Col>
            </Grid >

            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="sm" >
                    Scale :
                </Text >
                </Grid.Col>
                <Grid.Col span={3} >

                    <Text fz="sm"  >
                        {form.values.scale}
                    </Text>
                </Grid.Col>
            </Grid >

            <Grid justify="flex-start" align="center" mt={"1rem"} >
                <Grid.Col span={3} ><Text fz="sm" >
                    Budget :
                </Text >
                </Grid.Col>
                <Grid.Col span={3} >
                    <Text fz="sm"  >
                        {form.values.budget}
                    </Text>
                </Grid.Col>
            </Grid >
            {rows && rows?.length > 0 && <>
                <Divider mt="1rem" size="xs" color="black" />
                <Text>Vendor partipation</Text>
                <Table mt={"1rem"} highlightOnHover withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>ABN</Table.Th>
                            {(option.type === "vendor") ? <Table.Th>Approval</Table.Th> : <Table.Th>Showcase</Table.Th>}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </>}



            {vendorOption &&
                <div>
                    {!alreadyRequest &&
                        <>
                            <Divider mt="1rem" size="xs" color="black" />
                            <Request request={assignRequest.mutateAsync} applicationId={application.id} vendorId={option.id} />
                        </>
                    }



                </div>}

        </div>
    )
}

const Request = ({ request, applicationId, vendorId }: { request: any, applicationId: number, vendorId: number | undefined }) => {

    const [showed, setShowed] = useState<boolean>(false)
    const [showcase, setShowcase] = useState<string>("")

    const onRequest = async () => {
        try {
            await request({
                vendorId,
                applicationId,
                showcase: showcase
            })
        }
        catch (e) {
            console.log(e)
        }
    }


    return (<>

        <Modal opened={showed} onClose={() => setShowed(false)} title="Add Additional information">
            <Title order={3}></Title>
            <Input.Wrapper
                label="Showcase:"
            >
                <TextInput size="md" value={showcase} onChange={(event) => setShowcase(event.currentTarget.value)} />
            </Input.Wrapper>

            <Button mt={"2rem"} onClick={() => onRequest()}>Request</Button>

        </Modal>
        <Button mb={"2rem"} mt="2rem" onClick={() => setShowed(true)}>Request to particiapte</Button>

    </>)
}




export default Application