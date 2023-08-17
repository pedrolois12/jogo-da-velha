import Box from "./Box"
import styles from "@/styles/Box.module.css"
import { useEffect } from "react"
export default function Line(props) {

    useEffect(() => {
        // console.log(props)
    }, [])


    return (
        <div className={styles.line}>
            <Box qtd={0} {...props} reverse></Box>
            <Box qtd={1} {...props} reverse></Box>
            <Box qtd={2} {...props} reverse></Box>   
        </div>

    )

}