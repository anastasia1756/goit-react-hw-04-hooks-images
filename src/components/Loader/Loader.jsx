import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Hearts } from "react-loader-spinner";
import { Btn } from "./Loader.styled";


export const Loader = () => {
    return (
        <Btn type='button'><Hearts color="#00BFFF" height={80} width={80}/></Btn>
    
    )
};

