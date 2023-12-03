import '../assets/styles/chomsky.css';
import G from '../assets/image/Icono-Language.svg'
import Git from '../assets/image/GitHub.svg'
import { Editor } from '@monaco-editor/react';
import { useState, useRef , useEffect} from 'react';


//ATENCION VICTOR
/*
EN EL DIV DONDE VA EL CAMPO DE TEXTO DONDE PONEMOS LA CADENA QUE SE VA A VALIDAR
HAY QUE PONER BOTONES PARA SELECCIONAR
ejemplo:
|modulo|class|

le da click a class y el boton se pone rojo, ahora opc vale 2 y cuando le da a validar segun la opcion activa el
validarSintaxisClase por ejemplo y asi con todos

 */

//TAMBIEN

/*
EN CADA METODO DE VALIDAR HAY CONSOLE.LOGS QUE SON LO QUE SE DEBERIA MOSTRAR EN EL FRONT, VAS A VER LA FORMA DE
PONER TODO EL LOG EN UNA VARIABLE POR EJEMPLO STACKINFO Y UNA VEZ QUE ACABE LA VALIDACION MUESTRE EL RESULTADO EN OTRO DIV
O AL MISMO TIEMPO QUE LE AGREGUES INFO Y OBVIAMENTE QUE SE VEA BIEN
 */

const Chomsky = () => {
    const [codeContent, setCodeContent] = useState("");
    const [result, setResult] = useState([]);
    const [opc, setOpc] = useState(0);
    const [stackInfo, setStackInfo] = useState([]);
    const [isClicked, setIsClicked] = useState(false);










    const handlerCodeText = (e) => {
        setCodeContent(e.target.value)
    }

    //Aqui sirve para que cuando de click lo guarda 
    const handleCheck = () => {

        console.log(editorData.current.getValue())

        //todo el show del automata
        function isNoTerminal(element) {
            const terminales = ["S", "MO", "A", "PA", "U", "L", "S2", "CL", "B", "C", "D", "E", "F", "CO", "CI", "CF", "PI", "PF", "S3", "FU", "B1", "D1", "F1", "I", "S4", "C1", "B2", "D2", "F2", "D3", "OP", "NU", "N", "K", "S5", "M", "S6", "TD", "B3", "E2", "E3", "S7", "B4", "S8", "F3", "VA", "B5", "PC", "V1", "ST", "TX", "RTX", "V2", "IN", "B6", "E5", "DIG", "V3", "BO", "B7", "E6", "F4", "BO2", "CM", "DP"]
            return !(terminales.indexOf(element) === -1)
        }

        const reglas = {
            //modulo
            "S": ["MO", "A"],
            "MO": ["modulo"],
            "A": ["PA", "U"],
            "PA": ["L", "PA"],
            "U": ["util"],
            "L": ["[a-z]"],
            //clase
            "S2": ["CL", "B"],
            "CL": ["class"],
            "B": ["PA", "C"],
            "C": ["PI", "D"],
            "D": ["PF", "E"],
            "E": ["CI", "F"],
            "F": ["CO", "CF"],
            "CO": ["contenido"],
            "CI": ["{"],
            "CF": ["}"],
            "PI": ["("],
            "PF": [")"],
            //func
            "S3": ["FU", "B1"],
            "FU": ["func"],
            "B1": ["PA", "D1"],
            "D1": ["PI", "F1"],
            "F1": ["PF", "I"],
            "I": ["CI", "F"],
            //ciclo
            "S4": ["C1", "B2"],
            "C1": ["fore", "while"],
            "B2": ["PI", "D2"],
            "D2": ["PA", "F2"],
            "F2": ["OP", "D3"],
            "D3": ["VA", "F1"],
            "VA": ["valor"],
            "OP": ["<", ">", "<=", ">="],
            "NU": ["N", "NU"],
            "N": ["[0-9]"],
            "K": ["CI", "M"],
            //if
            "S5": ["IF", "B2"],
            "M": ["CO", "CF"],
            //declaracion de variables
            "DP": [":"],
            //string
            "V1": ["ST", "B3"],
            "ST": ["string"],
            "B3": ["PA", "E2"],
            "E2": ["DP", "E3"],
            "E3": ["CM", "TX"],
            "TX": ["PA", "RTX"],
            "RTX": ["CM", "PC"],
            "CM": ['"'],
            "PC": [";"],
            //int
            "V2": ["IN", "B6"],
            "IN": ["int"],
            "B6": ["PA", "E5"],
            "E5": ["DP", "DIG"],
            "DIG": ["NU", "PC"],
            //bool
            "V3": ["BO", "B7"],
            "BO": ["bool"],
            "B7": ["PA", "E6"],
            "E6": ["DP", "F4"],
            "F4": ["BO2", "PC"],
            "BO2": ["true", "false"],
            //llamada a funcion
            "S7": ["PA", "B4"],
            "B4": ["PI", "B5"],
            "B5": ["PF", "PC"],
            //condiciones
            "S8": ["PA", "F3"],
            "F3": ["OP", "VA"],
        }

        function getProduction(element) {
            if (reglas.hasOwnProperty(element)) {
                return reglas[element]
            }
        }

        function validarSintaxisModulo(string) {
            let stack = ["$", "S"]
            let stringStack = string.split(" ")
            console.log("la pila es:", stack)
            console.log("la cadena a evaluar es:", stringStack)
            while (stack.length > 0) {
                let x = stack.pop();
                console.log("el elemento de la pila tope es: ", x)
                if (x === "$") {
                    console.log("cadena finalizada - cadena valida")
                } else if (isNoTerminal(x)) {
                    console.log(x, "no es un terminal")
                    const production = getProduction(x)
                    if (production) {
                        for (let i = 0; i <= production.length - 1; i++) {
                            if (production[i] === "PA") {
                                stack.push("nombre")
                            } else if (production[i] === "MO") {
                                stack.push("modulo")
                            } else {
                                stack.push(production[i])
                            }
                        }
                        console.log("la nueva pila es:", stack)
                    } else {
                        console.log("no se pudo encontrar produccion")
                        console.log("la pila quedo asi: ", stack)
                        break;
                    }

                } else {
                    console.log(x, " es un terminal")
                    let y = stringStack.pop()
                    console.log("el elemento tope de la cadena es: ", y)
                    if (stringStack.length === 1) {
                        let regex = /^[a-zA-Z]+$/
                        if (regex.test(y)) {
                            y = "nombre"
                        }
                    }
                    if (x === y) {
                        console.log("sintaxis valida entre pila y cadena")
                    } else {
                        console.log("sintaxis invalida entre pila y cadena")
                        console.log("la pila queda asi:", stack)
                        break;
                    }
                }
            }
        }

        function validarSintaxisClasse(string) {
            let stack = ["$", "S2"]
            let stringStack = string.split(" ")
            console.log("la pila es: ", stack)
            console.log("la cadena a evaluar es: ", stringStack)
            while (stack.length > 0) {
                let x = stack.pop()
                console.log("el elemento de la pila tope es: ", x)
                if (x === "$") {
                    console.log("cadena finalizada-cadena valida")
                } else if (isNoTerminal(x)) {
                    console.log(x, " no es un terminal")
                    const production = getProduction(x)
                    if (production) {
                        for (let i = 0; i <= production.length - 1; i++) {
                            //valida para pa y para class
                            if (production[i] === "PA") {
                                stack.push("nombre")
                            } else if (production[i] === "CL") {
                                stack.push("class")
                            } else {
                                stack.push(production[i])

                            }
                        }
                        console.log("la nueva pila es: ", stack)
                    } else {
                        console.log("no se encontro produccion valida")
                        break;
                    }
                } else {
                    console.log(x, " es un terminal")
                    let y = stringStack.pop();
                    console.log("el elemento tope de la cadena es: ", y)
                    if (stringStack.length === 1) {
                        let regex = /^[a-zA-Z]+$/
                        if (regex.test(y)) {
                            y = "nombre"
                        }
                    }
                    if (x === y) {
                        console.log("sintaxis valida entre pila y cadena")
                    } else {
                        console.log("sintaxis invalida entre pila y cadena")
                        console.log("la pila queda asi:", stack)
                        break;
                    }
                }
            }
        }

        function validarSintaxisFuncion(string) {
            let stack = ["$", "S3"]
            let stringStack = string.split(" ")
            console.log("la pila es: ", stack)
            console.log("la cadena a evaluar es: ", stringStack)
            while (stack.length > 0) {
                let x = stack.pop()
                console.log("el elemento de la pila tope es: ", x)
                if (x === "$") {
                    console.log("cadena finalizada - cadena valida")
                } else if (isNoTerminal(x)) {
                    console.log(x, " no es un terminal")
                    const production = getProduction(x)
                    if (production) {
                        for (let i = 0; i <= production.length - 1; i++) {
                            if (production[i] === "PA") {
                                stack.push("nombre")
                            } else if (production[i] === "FU") {
                                stack.push("func")
                            } else {
                                stack.push(production[i])
                            }
                        }
                        console.log("la nueva pila es: ", stack)
                    } else {
                        console.log("no se pudo encontrar produccion")
                        console.log("la pila quedo asi: ", stack)
                        break
                    }
                } else {
                    console.log(x, " es un terminal")
                    let y = stringStack.pop()
                    console.log("el elemento tope de la cadena es: ", y)
                    if (stringStack.length === 1) {
                        let regex = /^[a-zA-Z]+$/
                        if (regex.test(y)) {
                            y = "nombre"
                        }
                    }
                    if (x === y) {
                        console.log("sintaxis valida entre pila y cadena")
                    } else {
                        console.log("sintaxis invalida entre pila y cadena")
                        console.log("la pila queda asi:", stack)
                        break;
                    }
                }
            }

        }

        function validarSintaxisCiclo(string) {
            let stack = ["$", "S4"]
            let stringStack = string.split(" ")
            console.log("la pila es: ", stack)
            console.log("la cadena a evaluar es: ", stringStack)
            while (stack.length > 0) {
                let x = stack.pop()
                console.log("el elemento de la pila tope es: ", x)
                if (x === "$") {
                    console.log("cadena finalizada - cadena valida")
                } else if (isNoTerminal(x)) {
                    console.log(x, " no es un terminal")
                    const production = getProduction(x)
                    if (production) {
                        for (let i = 0; i <= production.length - 1; i++) {
                            if (production[i] === "PA") {
                                stack.push("nombre")
                            } else if (production[i] === "OP") {
                                stack.push("operador")
                            } else if (production[i] === "C1") {
                                stack.push("fore/while")
                            } else {
                                stack.push(production[i])
                            }
                        }
                        console.log("la nueva pila es: ", stack)
                    } else {
                        console.log("no se pudo encontrar produccion")
                        console.log("la pila quedo asi: ", stack)
                        break;
                    }
                } else {
                    console.log(x, " es un terminal")
                    let y = stringStack.pop()
                    console.log("el elemento tope de la cadena es: ", y)
                    if (stringStack.length === 0) {
                        //fore y while
                        let regex = /^fore|while$/
                        if (regex.test(y)) {
                            y = "fore/while"
                        }
                    }
                    if (stringStack.length === 4) {
                        let regex = /^[a-z]+|[0-9]+$/
                        if (regex.test(y)) {
                            y = "valor"
                        }
                    }
                    if (stringStack.length === 3) {
                        //operador
                        let regex = /^<|>|<=|>=$/
                        if (regex.test(y)) {
                            y = "operador"
                        }
                    }
                    if (stringStack.length === 2) {
                        let regex = /^[a-zA-Z]+$/
                        if (regex.test(y)) {
                            y = "nombre"
                        }
                    }
                    if (x === y) {
                        console.log("sintaxis valida entre pila y cadena")
                    } else {
                        console.log("sintaxis invalida entre pila y cadena")
                        console.log("la pila queda asi:", stack)
                        break;
                    }
                }
            }
        }

        function validarSintaxisIf(string) {
            let stack = ["$", "S5"]
            let stringStack = string.split(" ")
            console.log("la pila es: ", stack)
            console.log("la cadena a evaluar es: ", stringStack)
            while (stack.length > 0) {
                let x = stack.pop()
                console.log("el elemento de la pila tope es: ", x)
                if (x === "$") {
                    console.log("cadena finalizada - cadena valida")
                } else if (isNoTerminal(x)) {
                    console.log(x, " no es un terminal")
                    const production = getProduction(x)
                    if (production) {
                        for (let i = 0; i <= production.length - 1; i++) {
                            if (production[i] === "PA") {
                                stack.push("nombre")
                            } else if (production[i] === "OP") {
                                stack.push("operador")
                            } else if (production[i] === "IF") {
                                stack.push("if")
                            } else {
                                stack.push(production[i])
                            }
                        }
                        console.log("la nueva pila es: ", stack)
                    } else {
                        console.log("no se pudo encontrar produccion")
                        console.log("la pila quedo asi: ", stack)
                        break;
                    }
                } else {
                    console.log(x, " es un terminal")
                    let y = stringStack.pop()
                    console.log("el elemento tope de la cadena es: ", y)
                    if (stringStack.length === 0) {
                        //fore y while
                        let regex = /^if$/
                        if (regex.test(y)) {
                            y = "if"
                        }
                    }
                    if (stringStack.length === 4) {
                        let regex = /^[a-z]+|[0-9]+$/
                        if (regex.test(y)) {
                            y = "valor"
                        }
                    }
                    if (stringStack.length === 3) {
                        //operador
                        let regex = /^<|>|<=|>=$/
                        if (regex.test(y)) {
                            y = "operador"
                        }
                    }
                    if (stringStack.length === 2) {
                        let regex = /^[a-zA-Z]+$/
                        if (regex.test(y)) {
                            y = "nombre"
                        }
                    }
                    if (x === y) {
                        console.log("sintaxis valida entre pila y cadena")
                    } else {
                        console.log("sintaxis invalida entre pila y cadena")
                        console.log("la pila queda asi:", stack)
                        break;
                    }


                }
            }
        }

        function validarSintaxisCallFunction(string) {
            let stack = ["$", "S7"]
            let stringStack = string.match(/([a-zA-Z]+|\S)/g)
            console.log("la pila es: ", stack)
            console.log("la cadena a evaluar es: ", stringStack)
            while (stack.length > 0) {
                let x = stack.pop()
                console.log("el elemento de la pila tope es: ", x)
                if (x === "$") {
                    console.log("cadena finalizada - cadena valida")
                } else if (isNoTerminal(x)) {
                    console.log(x, " no es un terminal")
                    const production = getProduction(x)
                    if (production) {
                        for (let i = 0; i <= production.length - 1; i++) {
                            if (production[i] === "PA") {
                                stack.push("nombre")
                            } else {
                                stack.push(production[i])
                            }
                        }
                        console.log("la nueva pila es: ", stack)
                    } else {
                        console.log("no se encontro produccion valida")
                        break;
                    }
                } else {
                    console.log(x, " es un terminal")
                    let y = stringStack.pop();
                    console.log("el elemento tope de la cadena es: ", y)
                    if (stringStack.length === 0) {
                        let regex = /^[a-zA-Z]+$/
                        if (regex.test(y)) {
                            y = "nombre"
                        }
                    }
                    if (x === y) {
                        console.log("sintaxis valida entre pila y cadena")
                    } else {
                        console.log("sintaxis invalida entre pila y cadena")
                        console.log("la pila queda asi:", stack)
                        break;
                    }
                }
            }
        }

        function validarCondiciones(string) {
            let stack = ["$", "S8"]
            let stringStack = string.split(" ")
            console.log("la pila es: ", stack)
            console.log("la cadena a evaluar es: ", stringStack)
            while (stack.length > 0) {
                let x = stack.pop()
                console.log("el elemento de la pila tope es: ", x)
                if (x === "$") {
                    console.log("cadena finalizada - cadena valida")
                } else if (isNoTerminal(x)) {
                    console.log(x, " no es un terminal")
                    const production = getProduction(x)
                    if (production) {
                        for (let i = 0; i <= production.length - 1; i++) {
                            if (production[i] === "PA") {
                                stack.push("nombre")
                            } else if (production[i] === "OP") {
                                stack.push("operador")
                            } else {
                                stack.push(production[i])
                            }
                        }
                        console.log("la nueva pila es: ", stack)
                    } else {
                        console.log("no se encontro produccion valida")
                        break;
                    }
                } else {
                    console.log(x, " es un terminal")
                    let y = stringStack.pop();
                    console.log("el elemento tope de la cadena es: ", y)
                    if (stringStack.length === 0) {
                        let regex = /^[a-zA-Z]+$/
                        if (regex.test(y)) {
                            y = "nombre"
                        }
                    }
                    if (stringStack.length === 1) {
                        let regex = /^<|>|<=|>=$/
                        if (regex.test(y)) {
                            y = "operador"
                        }
                    }
                    if (stringStack.length === 2) {
                        let regex = /^[a-z]+|[0-9]+$/
                        if (regex.test(y)) {
                            y = "valor"
                        }
                    }
                    if (x === y) {
                        console.log("sintaxis valida entre pila y cadena")
                    } else {
                        console.log("sintaxis invalida entre pila y cadena")
                        console.log("la pila queda asi:", stack)
                        break;
                    }
                }
            }
        }

        function validarStringDeclaracionVariable(string) {
            let stack = ["$", "V1"]
            let stringStack = string.split(" ")
            console.log("la pila es: ", stack)
            console.log("la cadena a evaluar es: ", stringStack)
            while (stack.length > 0) {
                let x = stack.pop()
                console.log("el elemento de la pila tope es: ", x)
                if (x === "$") {
                    console.log("cadena finalizada - cadena valida")
                } else if (isNoTerminal(x)) {
                    console.log(x, " no es un terminal")
                    const production = getProduction(x)
                    console.log("la produccion es: ", production)
                    if (production) {
                        for (let i = 0; i <= production.length - 1; i++) {
                            if (production[i] === "PA") {
                                stack.push("palabra")
                            } else if (production[i] === "BO2") {
                                stack.push("true|false")
                            } else {
                                stack.push(production[i])
                            }
                        }
                        console.log("la nueva pila es: ", stack)
                    } else {
                        console.log("no se pudo encontrar produccion")
                        console.log("la pila quedo asi: ", stack)
                        break;
                    }
                } else {
                    console.log(x, " es un terminal")
                    let y = stringStack.pop()
                    console.log("el elemento tope de la cadena es: ", y)

                    if (stringStack.length === 4) {
                        let regex = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/
                        if (regex.test(y)) {
                            y = "palabra"
                        }
                    }
                    if (stringStack.length === 1) {
                        let regex = /^[a-zA-Z]+$/
                        if (regex.test(y)) {
                            y = "palabra"
                        }
                    }
                    if (x === y) {
                        console.log("sintaxis valida entre pila y cadena")
                    } else {
                        console.log("sintaxis invalida entre pila y cadena")
                        console.log("la pila queda asi:", stack)
                        break;
                    }

                }
            }


        }

        function validarIntDeclarationVariable(string) {
            let stack = ["$", "V2"]
            let stringStack = string.split(" ");
            console.log("la pila es: ", stack)
            console.log("la cadena a evaluar es: ", stringStack)
            while (stack.length > 0) {
                let x = stack.pop()
                console.log("el elemento de la pila tope es: ", x)
                if (x === "$") {
                    console.log("cadena finalizada - cadena valida")
                } else if (isNoTerminal(x)) {
                    console.log(x, "no es un terminal")
                    const production = getProduction(x)
                    if (production) {
                        for (let i = 0; i <= production.length - 1; i++) {
                            if (production[i] === "PA") {
                                stack.push("nombre")
                            } else if (production[i] === "NU") {
                                stack.push("numero")
                            } else {
                                stack.push(production[i])
                            }
                        }
                        console.log("la nueva pila es: ", stack)
                    } else {
                        console.log("no se pudo encontrar produccion")
                        console.log("la pila quedo asi: ", stack)
                        break;
                    }
                } else {
                    console.log(x, " es un terminal")
                    let y = stringStack.pop();
                    console.log("el elemento tope de la cadena es: ", y)
                    console.log("allY es: ", stringStack.length)
                    if (stringStack.length === 3) {
                        let regex = /^[0-9]*$/
                        if (regex.test(y)) {
                            y = "numero"
                        }
                    }
                    if (stringStack.length === 1) {
                        let regex = /^[a-zA-Z]+$/
                        if (regex.test(y)) {
                            y = "nombre"
                        }
                    }
                    if (x === y) {
                        console.log("sintaxis valida entre pila y cadena")
                    } else {
                        console.log("sintaxis invalida entre pila y cadena")
                        console.log("la pila queda asi:", stack)
                        break;
                    }
                }
            }
        }

        function validarDoubleDeclarationVariable(string) {
            let stack = ["$", "V3"]
            let stringStack = string.split(" ");
            console.log("la pila es: ", stack)
            console.log("la cadena a evaluar es: ", stringStack)
            while (stack.length > 0) {
                let x = stack.pop()
                console.log("el elemento de la pila tope es: ", x)
                if (x === "$") {
                    console.log("cadena finalizada - cadena valida")
                } else if (isNoTerminal(x)) {
                    console.log(x, " no es un terminal")
                    const production = getProduction(x)
                    if (production) {
                        for (let i = 0; i <= production.length - 1; i++) {
                            if (production[i] === "BO2") {
                                stack.push("true|false")
                            } else if (production[i] === "PA") {
                                stack.push("nombre")
                            } else {
                                stack.push(production[i])
                            }
                        }
                        console.log("la nueva pila es: ", stack)
                    } else {
                        console.log("no se pudo encontrar produccion")
                        console.log("la pila quedo asi: ", stack)
                        break;
                    }
                } else {
                    console.log(x, " es un terminal")
                    let y = stringStack.pop();
                    console.log("el elemento tope de la cadena es: ", y)
                    if (stringStack.length === 3) {
                        let regex = /^true|false*$/
                        if (regex.test(y)) {
                            y = "true|false"
                        }
                    }
                    if (stringStack.length === 1) {
                        let regex = /^[a-zA-Z]+$/
                        if (regex.test(y)) {
                            y = "nombre"
                        }
                    }
                    if (x === y) {
                        console.log("sintaxis valida entre pila y cadena")
                    } else {
                        console.log("sintaxis invalida entre pila y cadena")
                        console.log("la pila queda asi:", stack)
                        break;
                    }
                }
            }
        }

        const handleCheck = (e) => {
            e.preventDefault();
            console.log(codeContent)
            //validarSintaxisModulo(codeContent)
            //validarSintaxisClasse(codeContent)
            //validarSintaxisFuncion(codeContent)
            //validarSintaxisCiclo(codeContent)
            //validarSintaxisIf(codeContent)
            //validarSintaxisCallFunction(codeContent)
            //validarCondiciones(codeContent)
            //validarStringDeclaracionVariable(codeContent)
            //validarIntDeclarationVariable(codeContent)
            //validarDoubleDeclarationVariable(codeContent)



        }
    }
        return (
            <>
                <header>
                    <h1 className='title-language'>Lenguaje de Programación</h1>
                    <div className="name-language-program">
                        <img src={G} alt="" className='garrick-icon'/>
                        <h1 className='garrick-name'>Garrick</h1>
                    </div>
                </header>
                <section className="container-verification">
                    <form className='form-code'>
                        <div className="options-bottoms">
                            <button className="option" >Modulo</button>
                            <button className="option" >Clase</button>
                            <button className="option" >Función</button>
                            <button className="option">If</button>
                            <button className="option">Llamada Funcion</button>
                            <button className="option">Condición</button>
                            <button className="option">Declaración Variable</button>
                            <button className="option">Declaración Doble Variable</button>
                        </div>
                        <h2 className='subtitle-code'>Ingrese el codigo</h2>
                        <div className="textarea-code">
                            <Editor
                                height='30rem'
                                width='80%'
                                loading='Cargando'
                                theme='vs-dark'
                                value='###WELCOME TO GARRICK'
                                onChange={handlerCodeText}
                            />
                            
                        </div>
                        <button className="button-verific" onClick={handleCheck}>Revisar</button>
                    </form>
                </section>
                <section className="container-data">
                    <div className="data-code">
                        <h2 className='subtitle-code'>Verificaciones</h2>
                        <div className="txtArea-div-Code">
                            <textarea className='txtArea-code' contentEditable={"false"} name="code" cols="30" rows="10" value={result}></textarea> 
                        </div>
                    </div>
                </section>
                <footer>
                    <div className="name-language-container">
                        <img src={G} alt="" className='garrick-icon'/>
                        <h1 className='garrick-name'>Garrick</h1>
                    </div>
                </footer>
            </>
        )
    }

export default Chomsky;
