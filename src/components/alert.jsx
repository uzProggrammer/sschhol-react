import { useState, useEffect } from "react";


function Alert(props){
    let [isopen, setIsopen] = useState(true);
    var time = props.time;
    var type=props.type;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsopen(false);
        }, time);
    
        return () => {
            clearTimeout(timer);
        };
    }, []);
    return(
        <>
            <div className={isopen ? 'alert show '+type:'alert'} onClick={
                (e)=>{
                    setIsopen(false);
                }
            }>
                {type!=='site' &&
                    <>
                        <div className="icon">
                            <i className={"fa fa-"+(type ==='success' ? 'circle-check':"")+(type ==='info' ? 'info':"")+(type ==='warn' ? 'triangle-exclamation':"")+(type ==='danger' ? 'circle-exclamation':"")}></i>
                            <div className="message">
                                {props.message}
                            </div>
                        </div>
                        <div className="closer">
                            <button className="btn bg-transparent" onClick={
                                e=>{
                                    setIsopen(false);
                                }
                            }>
                                <i className="fa fa-xmark"></i>
                            </button>
                        </div>
                    </>
                }
                {type==='site' && 
                    <>
                        <div className="icon">
                            <img src="/logo192.png" alt="Logo" height={'45px'} />
                            <div className="message">
                                {props.message}
                            </div>
                        </div>
                        <div className="closer">
                            <button className="btn bg-transparent" onClick={
                                e=>{
                                    setIsopen(false);
                                }
                            }>
                                <i className="fa fa-xmark"></i>
                            </button>
                        </div>
                    </>
                }
            </div>
        </>
    )
};


export default Alert;