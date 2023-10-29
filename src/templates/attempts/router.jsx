import Router from "../../components/router"
import Attempts from "./all";

function AttemptsRouter(props){
    return(
        <>
            <Router url="/attempts" el={<Attempts />} title='Urinishlar' active_el='problems' />
        </>
    )
};

export default AttemptsRouter;