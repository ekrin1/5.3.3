import { Group, Card, Title, Text } from "@mantine/core";

import styles from './AboutPage.module.css'

export const AboutPage = () => {

    return (

        <Card className={styles.container}>

            <Group className={styles.wrapper}>
                <Title className={styles.title}>
                    Екатерина Котова 
                </Title>
                <Text className={styles.text}>
                    Привет! Я - Frontend-разработчица. Пишу приложения на React +
                    TypeScript + Redux Toolkit.
                </Text>
            </Group>

        </Card>

    )

}

