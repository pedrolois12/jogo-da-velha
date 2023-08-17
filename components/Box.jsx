import styles from '../styles/Box.module.css'
import React, { useEffect } from 'react';
import { useState} from 'react';
import { marcar} from '@/store/index';
import { useDispatch, useSelector } from 'react-redux';
import { valida_sequencia } from '@/functions/utils'

export default function Box(props){

   const [boxChecked, setBoxChecked] = useState(false)
   const  boxMarcado = useSelector((state)=>state.state)
   const [jogada, setJogada] = useState('')
   const [pinta, setPinta] = useState(false)
   const dispatch = useDispatch();

    useEffect(()=>{
     console.log(props)
     if (boxMarcado.lastPlay ===''){
        setJogada('') 
        setBoxChecked(false)
     }
     pintaBox()
     console.log(boxMarcado)
   
   },[boxMarcado])


    const pintaBox = () =>{
        if(jogada === boxMarcado.winner && boxMarcado.winner!=''){
            debugger
             if(valida_sequencia(props.ordem, props.qtd, boxMarcado.sv)){
                 setPinta(true) 
             }
        } else{
            setPinta(false)
        }
    }
    const handleOnClick = (value) =>{
        if(!boxChecked){            
            let newJogada
            if (boxMarcado.lastPlay === '') newJogada=boxMarcado.firstPlayer
            else newJogada = boxMarcado.lastPlay==='X' ? 'O' : 'X'
            setBoxChecked(true)
            setJogada(newJogada)
            let obj = {casa:value, jogador:newJogada, ordem:props.ordem}
            dispatch(marcar(obj))
        }
    }

    const handleBox = () =>{
        return<> 
                <div
                    className={pinta ? 
                               styles.boxReverse :
                               styles.box 
                            } 
                    key={props.qtd}                  
                    onClick={()=>handleOnClick(props.qtd)}> 
                    <div style={{
                            textAlign:'center',
                            marginLeft:'2em',
                            marginRight:'2em',
        
                        }}>
                         {boxChecked &&  <div> {jogada} </div>}
                    </div>         
                </div>
            </>
    }
    return(
        handleBox()      
    )
}



