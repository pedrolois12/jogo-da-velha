import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Provider} from 'react-redux'
import store from '@/store/store'
import Tabuleiro from '@/components/Tabuleiro'
import { Html } from 'next/document'




export default function Home() {

  return(

            <Provider store={store}>
                  <Tabuleiro></Tabuleiro>
            </Provider>
         
      
     )
}
