import { useState } from "react";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [email, setEmail] = useState('');

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  return (
    <>
      <div className="login-div">
        <div className="row">
          <div className="elements d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
            <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
                <h2><a href="/">BTIM</a>ga hush kelibsiz 👋</h2>
                <p>Davom etish uchun tizimga kiring</p>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email manzilingiz</label>
                    <input value={email} type="email" id="email" className="form-control" placeholder="Email manzilingiz" onChange={e=>{setEmail(e.target.value)}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Foydalanuvchi nomingiz</label>
                    <input value={username} type="text" id="username" className="form-control" placeholder="Nikingiz" onChange={e=>{setUsername(e.target.value)}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Parolingiz</label>
                    <div className="input-group">
                      <input type={isPasswordHidden ? 'password' : 'text'} value={password} id="password" className="form-control" placeholder="Parolingiz" onChange={e=>{setPassword(e.target.value)}} />
                      <button class="input-group-text bg-auto" onClick={togglePasswordVisibility}><i className="fa fa-eye"></i></button>
                    </div>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary">Ro'yxatdan o'tish</button>
                </div>
                <hr />
                <div className="mb-3 text-center">
                  Tizimda alloqachon ro'yxatdan o'tganmisiz? - <a href="/login">Kirish</a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;