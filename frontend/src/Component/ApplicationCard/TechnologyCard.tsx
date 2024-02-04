import { Image, Container, ScrollArea, Modal, Card, Text, Group, ActionIcon, Flex, Textarea, Grid, Select, Title, MultiSelect, Center, Divider, TextInput, Button, Radio, Chip, RangeSlider, Collapse, UnstyledButton, rem, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from "react"
import { useForm } from '@mantine/form';
import { IconCircleMinus, IconCirclePlus, IconEye, IconMessageCircle } from '@tabler/icons-react'
import classes from './index.module.css';
import { useNavigate, useSearchParams } from "react-router-dom"


type CardInfo = {
    label : string,
    link : string,
    imageUrl? : string
}


const TechnologyCard = ({ data }: { data: CardInfo }) => {
    const navigate = useNavigate()

    return (
        <div>
        <Card
            component="a"
            radius="xs"
            href={data.link}
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
                        {data.label}
                    </Text>
                </div>
            </div>
        </Card>
        </div>
    )
}

export default TechnologyCard