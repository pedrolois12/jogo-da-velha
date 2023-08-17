import Line from "./Line"
import { marcarVencedor, resetar, setModal } from '@/store/index'
import styles from '@/styles/Home.module.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



export default function Tabuleiro(){
    const dispatch = useDispatch();
    const {winner, marcados} = useSelector((state)=>state?.state)
    const {showModal} = useSelector((state)=>state?.modal)

    const handleClick = () =>{
        dispatch(resetar())
        dispatch(setModal(false))
    }

    useEffect(()=>{
        debugger
        if(winner!='') dispatch(setModal())
    },[winner])


    useEffect(()=>{
        dispatch(marcarVencedor())
    },[marcados])


return (
    <div className={styles.tabuleiro}> 
        <div 
            style={{
                display:'flex'
                , flexDirection:'column'
                , alignItems:'center'
                , height:'100vh'
                , marginTop:'25vh' 
            }}
        >
            <Line ordem={0} ></Line>
            <Line ordem={1} ></Line>
            <Line ordem={2} ></Line>
            
        </div>
        <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>
                        Resultado 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body> O resultado da partida é: {winner}</Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={()=>handleClick()}> Reiniciar </Button>
                </Modal.Footer>
        </Modal>
    </div>
    )
                                                                            
        
    
}