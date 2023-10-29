import Router from "../../components/router"
import Problems from "./all";

function ProblemRouters(props){
    return(
        <>
            <Router url="/problems" el={<Problems />} title='Masalalar' active_el='problems' />
        </>
    )
};

export default ProblemRouters;