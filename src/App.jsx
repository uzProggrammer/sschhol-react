import 'bootstrap/dist/css/bootstrap.min.css';
import './styless/main.scss';
import Router from './components/router';
import Home from './templates/home';
import Login from './templates/users/login';
import Register from './templates/users/register';
import ProblemRouters from './templates/problrms/routers';
import UnProblemRouters from './templates/unproblems/router';
import AttemptsRouter from './templates/attempts/router';

import '@fortawesome/react-fontawesome'


function App() {
  if(window.location.pathname!=='/login' && window.location.pathname!=='/register'){
    return (
      <div className="">
        <div className="">
          <AttemptsRouter />
          <UnProblemRouters />
          <ProblemRouters/>
          <Router url="/questions" el={<Home />} title='Savollar' active_el='quiz' />
          <Router url="/olympiad-problems" el={<Home />} title='Olimpiada  yechimlari' active_el='olP' />
          <Router url="/controls" el={<Home />} title='Nazoratlar' active_el='controls' />
          <Router url="/" el={<Home />} title='Bosh sahifa' active_el='home' />
        </div>
      </div>
    );
    
  } else{
    return(
      <>
        <Router url='/login' el={<Login/>} title='Kirish' />
        <Router url='/register' el={<Register/>} title="Ro'yxatdan o'tish" />
      </>
    )
  }
}

export default App;
