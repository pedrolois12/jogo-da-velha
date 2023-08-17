import { createSlice } from '@reduxjs/toolkit'
const JOGADOR = {JOGADOR_X:'X', JOGADOR_O:'O'}  

const initialState = 
    {
        marcados:[{0:'', 1:'', 2:''}, {0:'', 1:'', 2:''}, {0:'', 1:'', 2:''}],
        lastPlay: '',
        winner:'',
        start:false,
        firstPlayer:JOGADOR.JOGADOR_O,
        sv:''
    }

const modalState = {
    showModal:false,
    msg:''
}
export const counterSlice = createSlice({
    name:'marcar',
    initialState,
    reducers:{     
        marcar: (state, action)=>{
            const {ordem, casa, jogador} = action.payload

            state.marcados[ordem][casa] = jogador
            if (state.lastPlay ==='') {
                state.lastPlay = state.firstPlayer
                state.start=true
            }
            else if (state.lastPlay === 'X') state.lastPlay ='O'
            else if (state.lastPlay === 'O') state.lastPlay ='X'
        },
        resetar: (state)=>{
            state.marcados= initialState.marcados
            state.lastPlay=''
            state.winner=''
            state.start=false,
            state.sv=''
        },
        marcarVencedor:(state)=>{ 
            
            const {marcados} = state
            const colunas = [0,1,2]
            if(state.start){
                marcados.forEach((index, marcado) => {
                //valida linhas
                    if (  marcado[0]==JOGADOR.JOGADOR_X && marcado[1]==JOGADOR.JOGADOR_X && marcado[2]==JOGADOR.JOGADOR_X)  {
                        state.winner = JOGADOR.JOGADOR_X
                        state.sv = index+';'+'L'
                    } 
                    else if(marcado[0]==JOGADOR.JOGADOR_O && marcado[1]==JOGADOR.JOGADOR_O && marcado[2]==JOGADOR.JOGADOR_O) {
                        state.winner = JOGADOR.JOGADOR_O
                        state.sv = index+';'+'L'
                    }
                });

                //valida diagonais
                if(marcados[0][0] == JOGADOR.JOGADOR_X && marcados[1][1] == JOGADOR.JOGADOR_X && marcados[2][2] == JOGADOR.JOGADOR_X){
                    state.winner = JOGADOR.JOGADOR_X
                    state.sv='DE'
                }
                if(marcados[0][0] == JOGADOR.JOGADOR_O && marcados[1][1] == JOGADOR.JOGADOR_O && marcados[2][2] == JOGADOR.JOGADOR_O){
                    state.winner = JOGADOR.JOGADOR_O
                    state.sv='DE'
                }
                if(marcados[0][2] == JOGADOR.JOGADOR_O && marcados[1][1] == JOGADOR.JOGADOR_O && marcados[2][0] == JOGADOR.JOGADOR_O){
                    state.winner = JOGADOR.JOGADOR_O
                    state.sv='DD'
                }
                if(marcados[0][2] == JOGADOR.JOGADOR_X && marcados[1][1] == JOGADOR.JOGADOR_X && marcados[2][0] == JOGADOR.JOGADOR_X){
                    state.winner = JOGADOR.JOGADOR_X
                    state.sv='DD'
                }

                //valida colunas
                colunas.forEach( col =>{ // 0
                    let countX=0, countO = 0;
                    marcados.forEach(marcado =>{ // 0:{0:X,1:X,2:O}  1:{0:X,1:X,2:O} 2:{0:X,1:X,2:O}
                    if(marcado[col] == JOGADOR.JOGADOR_O) countO++;
                    if(marcado[col] == JOGADOR.JOGADOR_X) countX++;
                    })

                    if (countX == 3) {
                        state.winner = JOGADOR.JOGADOR_X
                        state.sv = col+';'+'C'
                    }
                    if (countO == 3) {
                        state.winner = JOGADOR.JOGADOR_O
                        state.sv = col+';'+'C'
                    }
                })
            }

            //valida empate
            let empate = 0
            marcados.forEach(marcado =>{
                
                colunas.forEach(col =>{
                    if(marcado[col]==JOGADOR.JOGADOR_O | marcado[col]==JOGADOR.JOGADOR_X){
                        empate++
                    }
                })
                if (empate == 9 && state.winner ==''){
                    state.winner = 'VELHA'
                }
            })
        }

    }
})

export const modalSlice = createSlice({
    name:'modalState',
    initialState: modalState,
    reducers:{
        setModal: (state) => {
            state.showModal = !state.showModal
         }
    }


})

export const {marcar, resetar, marcarVencedor} = counterSlice.actions;
export const {setModal} = modalSlice.actions;
export const counterReducer = counterSlice.reducer;
export const modalReducer = modalSlice.reducer;