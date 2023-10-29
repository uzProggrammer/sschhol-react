import Router from "../../components/router"
import UnProblems from "./all";

function UnProblemRouters(props){
    return(
        <>
            <Router url="/unproblems" el={<UnProblems />} title='Arxivlanmagan masalalar' active_el='problems' />
        </>
    )
};

export default UnProblemRouters;