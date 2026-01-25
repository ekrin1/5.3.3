import { Group, Image } from "@mantine/core";
import clsx from "clsx";
import styles from './Header.module.css';
import { NavLink } from "react-router-dom";

import logo from '../../assets/logo.svg';
import circle from '../../assets/circle.svg';
import user from '../../assets/user_about.svg';

export const Header = () => { 

    return (

        <div className={styles.header_container}>
            <header className={styles.header}>

                <Group className={styles.logo}>
                    <Image className={styles.logo_image}
                    src={logo} alt="HHlogo" />
                </Group>

                <Group className={styles.nav_links}>

                    <NavLink
                        to='/vacancies'
                        className= {({ isActive }) =>
                            isActive
                            ? clsx (
                                styles['nav__link'],
                                styles["nav__link-vacancies"],
                                styles["active-link"]
                            )
                            : clsx(styles["nav__link"], styles["nav__link-vacancies"])
                        }
                    >
                            Вакансии FE
                        <Image src={circle} alt="circle" />
                    </NavLink>

                    <NavLink
                        to='/vacancies'
                        className= {({ isActive }) =>
                            isActive
                            ? clsx (
                                styles['nav__link'],
                                styles["nav__link-about"],
                                styles["active-link"]
                            )
                            : clsx(styles["nav__link"], styles["nav__link-about"])
                        }
                    >
                            Обо мне
                        <Image src={user} alt="user" />
                    </NavLink>

                </Group>

            </header>
        </div>
    )
}
