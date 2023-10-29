import { Flex, Button, Paper, Title, Text, Textarea, Grid, Select, MultiSelect, Divider, Modal, Group, TextInput, ActionIcon, Card, Center, Container } from "@mantine/core";
import { useNavigate } from 'react-router-dom';



const Admin = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <Flex
                mt={"1rem"}
                mb="2rem"
                gap="md"
                justify="center"
                align="center"
                wrap="wrap"
            >
                <Button onClick={() => navigate(`/admin/data`)}>Data Magemement</Button>
                <Button onClick={() => navigate(`/admin/approve`)}>Approval Magemement</Button>
            </Flex>
        </Container>
    )

}



export default Admin