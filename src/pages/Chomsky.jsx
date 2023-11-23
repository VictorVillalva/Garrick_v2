import '../assets/styles/chomsky.css';
import G from '../assets/image/Icono-Language.svg'
import Git from '../assets/image/GitHub.svg'
import { Editor } from '@monaco-editor/react';
import { useState, useRef } from 'react';



const Chomsky = () => {

    const editorData = useRef(null)
    const [contentCode, setcontentCode] = useState('')
    // const [pilaContent, setpilaContent] = useState('')

    const handleEditorDidMount = (editor, monaco) => {
        editorData.current = editor
    }

    //Aqui sirve para que cuando de click lo guarda 
    const handleCheck = () =>{
        console.log(editorData.current.getValue())

        //Aqui es donde lo guarda en eesa variable lo comente para no marcar error de tipo String
        // const dataCode  = editorData.current.getValue()
    }

    return (
        <section className="sec-1">
            <header className="header-chomsky">
                <h1 className="title-chosmky">Lenguaje de programación <label className="language-name">Garrick</label> <img src={G} alt="G" id="G" /></h1>
            </header>
            <div className="container">
                <div className="code">
                    <h2>Ingrese el codigo</h2>
                    <div className="txtCode">
                        <Editor
                            height='35rem'
                            width='90%'
                            loading='Cargando'
                            theme='vs-dark'
                            value='###WELCOME TO GARRICK'
                            onChange={(value) => setcontentCode(value)}
                            onMount={handleEditorDidMount}
                        />
                    </div>
                    <button className="button-1" onClick={handleCheck}>Revisar</button>
                </div>
                <div className="pila">
                    <h2>Pila</h2>
                    <div className="separador">
                        <h2>hOLA</h2>
                    </div>
                </div>
            </div>
            <footer>
                    <div className="logo-garrick">
                        <img src={G} alt="" />
                    </div>
                    <div className="github">
                        <div className="victor">
                            <img src={Git} alt="" className='gtb' /><label htmlFor="github" className='name'><a href="https://github.com/VictorVillalva">Victor Adrian Villalva Rodriguez</a> 213380</label>
                        </div>
                        <div className="jesus">
                            <img src={Git} alt="" className='gtb' /><label htmlFor="github" className='name'><a href="https://github.com/Gsuscrist">Jesus Antonio Gordillo Orantes</a> 213359</label>
                        </div>
                    </div>
                </footer>
        </section>
    )
}
export default Chomsky
