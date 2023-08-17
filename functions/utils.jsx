import { SEQUENCIA } from '@/constants/constants'

// const SEQ ={
//     DD:['02','11','20'],
//     DE:['00','11','22'],
//     C:['0','1', '2'],
//     L:['0', '1', '2']
// }

export const valida_sequencia =(ordem, qtd, sequencia) => {
    const keys = Object.keys(SEQUENCIA)
    const combinado = ordem+''+qtd
    let retorno=false
    const sv_split = sequencia.split(';')
   
        if ( sv_split[1] === 'C'){
            if(sv_split[0] == qtd){
                retorno = true
            }
        }
        else if (sv_split[1] === 'L'){
            if(sv_split[0] == ordem){
                retorno = true
            }
        }
        else{
            if (sv_split[0] === 'DD' ) {
                SEQUENCIA[sv_split[0]].forEach(seq =>{
                    debugger
                    if (seq === combinado){
                        retorno = true
                    } 
                })
            }
            else if (sv_split[0] === 'DE' ) {
                SEQUENCIA[sv_split[0]].forEach(seq =>{
                    if (seq === combinado){
                        retorno = true
                    } 
                })
            }
        }
        
        
    return retorno   
}

//let seq = 0+''+2

//console.log(seq)
//valida_sequencia(0, 1, 'DD')