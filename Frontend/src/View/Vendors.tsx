import React, { useState } from "react";
import { Flex, Button, Paper, Title, Text, Container, Center, NumberInput, Input, Box } from "@mantine/core";
import classes from './Home.module.css';
import { LandingData } from "../type";
import { useNavigate } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import vendorService from "../Services/vendor.service";
import { useError } from "../Hook";


const Vendor = () => {

    const navigate = useNavigate()
    const [showed, setShowed] = useState<boolean>(false)
    const [ABN, setABN] = useState<string | number>('')
    const errorMessage = useError()

    const ABNCheck = useMutation({
        mutationFn: async (input: string | number) => {
            const ABN = Number(input)
            const output = await vendorService.getVendorByABN(ABN)
            return output
        },
        onSuccess: (result) => {
            navigate(`/vendor/${result?.id}}`)
        },
        onError: (e) => {
            errorMessage.set("No Vendor found with this ABN")
        },
    })

    if (showed) {
        return (<>
            <Container p="2rem" maw={600}>
                Enter your ABN to continue
                    <Input.Wrapper
                        label="ABN :"
                        mt={"1rem"}
                    >
                        <NumberInput width="1px" value={ABN} onChange={setABN} size="md" />
                    </Input.Wrapper>
                    <Button mt={"2rem"} onClick={()=>ABNCheck.mutateAsync(ABN)}>Continue</Button>
                    {errorMessage.value !==" " && <Text c="red">
                        {errorMessage.value}
                        </Text>}
            </Container>

        </>)
    }


    return (
        <>
            <Container p="2rem">
                <Center> <Title >Vendor Portal</Title></Center>
                <Flex
                    mih={50}
                    gap="xl"
                    justify="center"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                    mt={"2rem"}
                >

                    <Button onClick={() => {
                        setShowed(!showed)
                    }}>Enter</Button>
                    <Button onClick={() => {
                        navigate(`/vendor/create`)
                    }}>Register</Button>
                </Flex>
            </Container>
        </>
    )

}




export default Vendor