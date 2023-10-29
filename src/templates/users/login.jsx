import { useState, useEffect } from "react";
import { MAIN_URL_API } from "../..";
import Alert from "../../components/alert";
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const login = (e)=>{
    e.preventDefault();
    if(true){
      const requestOptions = {
        method: 'post',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': username, 'password': password})
      };
      fetch(MAIN_URL_API+'users/login/', requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data.status==='ok'){
            localStorage.setItem('auth_token', data.api_token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('full_name', data.full_name);
            window.location.href = '/';
          } else{
            toast.error('Parolingiz yoki foydalanuvchinomingiz xato. Iltmos qaytadan urinib ko\'ring.', {
              style: {
                border: '1px solid #713200',
                padding: '10px',
                background: '#d71616',
                color: 'white',
              },
              iconTheme: {
                primary: '#d71616',
                secondary: 'white',
              },
            });
          }
        });
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  return (
    <>
      <form method="POST" onSubmit={login} className="login-div">
        <div className="row">
          <div className="elements d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
            <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
                <h2><a href="/">BTIM</a>ga hush kelibsiz 👋</h2>
                <p>Davom etish uchun tizimga kiring</p>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Foydalanuvchi nomingiz</label>
                    <input value={username} type="text" id="username" className="form-control" placeholder="Nikingiz" onChange={e=>{setUsername(e.target.value)}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Parolingiz</label>
                    <div className="input-group">
                      <input type={isPasswordHidden ? 'password' : 'text'} value={password} id="password" className="form-control" placeholder="Parolingiz" onChange={e=>{setPassword(e.target.value)}} />
                      <button type="button" className="input-group-text bg-auto" onClick={togglePasswordVisibility}><i className="fa fa-eye"></i></button>
                    </div>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit">Kirish</button>
                </div>
                <hr />
                <div className="mb-3 text-center">
                  Hali tizimda akkountingiz yo'qmi? - <a href="/register">Ro'yxatdan o'ting</a>
                </div>
              </div>
          </div>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default Login;
