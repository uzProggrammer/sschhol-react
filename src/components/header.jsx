import { useEffect, useState } from "react";
import Chat from "./chats";
import Profile from "./profile";
// https://preview.keenthemes.com/seven-html-pro/account/overview.html
import { MAIN_URL_API } from "..";


function Header(props) {
  let [sidebar, setSidebar] = useState('menu');
  let [sopen, setSopen] = useState(true);
  let isAuthenticated = (localStorage.getItem('auth_token')!=='') ? true : false;
  useEffect(
    e=>{
      let isAuthenticated = (localStorage.getItem('auth_token')!=='') ? true : false;
    }, [localStorage]
  )
  return (
    <>
      <div className="sidebar">
        <a className="home-link" href="/" style={{textDecoration: 'none'}}><img src="/logo512.png" alt="Logo" className="logo" width={45} /></a>
        <div className="sidebar-body">
          <ul className="sidebar-items">
            <li>
              <a className={sidebar === 'menu' ? 'active': ''} onClick={
                (e)=>{
                  setSidebar('menu');
                  setSopen(true);
                }
              } href="#" id="sidebar-menu"><i className="fa-solid fa-house"></i> <span className="hovered-text">Menu</span></a>
            </li>
            <li>
              <a className={sidebar === 'courses' ? 'active': ''} onClick={
                (e)=>{
                  setSidebar('courses');
                  setSopen(true);
                }
              } href="#" id="sidebar-course"><i className="fa fa-book"></i> <span className="hovered-text">Kurslar</span></a>
            </li>
            <li>
              <a className={sidebar === 'ass' ? 'active': ''} onClick={
                (e)=>{
                  setSidebar('ass');
                  setSopen(true);
                }
              } href="#" id="sidebar-ass"><i className="fa-regular fa-circle-check"></i> <span className="hovered-text">Topshiriqlar</span></a>
            </li>
          </ul>
          <ul>
            <li>
              <a className={sidebar === 'notification' ? 'active': ''} onClick={
                (e)=>{
                  setSidebar('notification');
                  setSopen(true);
                }
              } href="#" id="sidebar-notifications"><i className="fa-solid fa-envelope"></i> <span className="hovered-text">Bildirishnomalar</span></a>
            </li>
            <li>
              <a className={sidebar === 'chats' ? 'active': ''} onClick={
                (e)=>{
                  setSidebar('chats');
                  setSopen(true);
                }
              } href="#" id="sidebar-chats"><i className="fa-solid fa-message"></i> <span className="hovered-text">Suhbatlarim</span></a>
            </li>
            <li className="user-profile-icon">
              <a className={sidebar === 'profile' ? 'active': ''} onClick={
                (e)=>{
                  setSidebar('profile');
                  setSopen(true);
                }
              } href="#" id="sidebar-profile"><i className="fa-solid fa-user"></i> <span className="hovered-text">Profilim</span></a>
            </li>
          </ul>
        </div>
      </div>
      <div className={sopen ? 'sidebar-1': 'sidebar-1 hide'}>
        <button className="btn bg-auto m-667-o-c" onClick={
          (e)=>{
            setSopen(false)
          }
        }><i className="fa fa-x"></i></button>
        {sidebar==='menu' &&
          <div className="sidebar-1-menu">
            <h5 className="sidebar-2-title">Menu</h5>
            <ul>
              <li className={props.el==='home' ? "active":''}><a href="/"><i className="fa fa-house"></i> Bosh sahifa</a></li>
              <li className={props.el==='controls' ? "active":''}><a href="/controls"><i className="fa fa-chart-line"></i> Nazoratlar</a></li>
              <li className={props.el==='olP' ? "active":''}><a href="/olympiad-problems"><i className="fa fa-chart-pie"></i> Olimpiada masalalari</a></li>
              <li className={props.el==='quiz' ? "active dr":'dr'}><a href="#" className="dr-opener"><span><i className="fa fa-question"></i> Testlar</span> <i className="fa fa-chevron-down"></i></a>
                <ul className="dr-menu">
                  <li><a href="/my-questions">Qatnashgan testlarim</a></li>
                  <li><a href="/questions">Barcha testlar</a></li>
                </ul>
              </li>
              <li className={props.el==='problems' ? "active dr":'dr'}><a href="#" className="dr-opener"><span><i className="fa-solid fa-book-bookmark"></i> Masalalar</span> <i className="fa fa-chevron-down"></i></a>
                <ul className="dr-menu">
                  <li><a href="/problems">Masalalar</a></li>
                  <li><a href="/unproblems">Arxivlanmagan masalalalar</a></li>
                  <li><a href="/attempts">Urinishlar</a></li>
                  <li><a href="/problems/info">Ma'lumot</a></li>
                </ul>
              </li>
              <li><a href="Bosh sahifa"></a></li>
            </ul>
          </div>
        }
        {sidebar==='courses' &&
          <div className="sidebar-1-menu">
            {isAuthenticated &&
              <>
                <h5 className="sidebar-2-title">Kurslar</h5>
                <a href="/salom" className="card mt-3 bg-auto p-2">
                  <img src="/logo192.png" className="card-img-top" alt="Logo" width='100%' />
                  <div className="card-body">
                    <h5 className="card-title">HTML5 & CSS3</h5>
                    <p className="card-text">Salom Dunyo Qalesan tincmisan yaxshimisan</p>
                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                      <div className="progress-bar" style={{width: '34%'}}>34%</div>
                    </div>
                  </div>
                </a>
                <div className="text-center my-3">
                  <a href="/courses" className="btn btn-primary">Barcha kurslarga o'tish</a>
                </div>
              </>
            }
            {!isAuthenticated &&
              <div className="text-center">
                <a href="/login" className="btn btn-primary">Ushbu amalni bajarish uchun tizimga kirishingiz shart</a>
              </div>
            }
          </div>
        }
        {sidebar==='ass' &&
          <div className="sidebar-1-menu">
            {isAuthenticated &&
              <>
                <h5 className="sidebar-2-title">Javob bermagan topshiriqlaringiz</h5>
                <a href="/#" className="card mt-3 bg-auto p-2">
                  <img src="/logo192.png" className="card-img-top" alt="Logo" width='100%' />
                  <div className="card-body">
                    <h5 className="card-title">HTML5 & CSS3</h5>
                    <p className="card-text">Salom Dunyo Qalesan tincmisan yaxshimisan</p>
                  </div>
                  <ul className="list-group list-group-flush bg-auto">
                    <li className="list-group-item bg-auto">23.10.2023 - gacha</li>
                  </ul>
                </a>
                <div className="text-center my-3">
                  <a href="/assignments" className="btn btn-primary">Barcha topshiriqlarga o'tish</a>
                  </div>
              </>
            }
            {!isAuthenticated &&
              <div className="text-center">
                <a href="/login" className="btn btn-primary">Ushbu amalni bajarish uchun tizimga kirishingiz shart</a>
              </div>
            }
          </div>
        
        }
        {sidebar==='notification' &&
          <div className="sidebar-1-menu">
            {isAuthenticated &&
              <>
                <h5 style={{marginBottom: '45px'}}>Bildirishnomalar</h5>
                <ul style={{padding: '0px'}}>
                  <li style={{margin: '-40px'}}>
                    <a href="#" className="card bg-auto c-a p-1 mb-2">
                      <div className="row" style={{alignItems: 'center'}}>
                        <div className="col-3">
                          <img src="/logo192.png" width={79} alt="Logo" />
                        </div>
                        <div className="col-9 fs-6">
                          Salom Dunyo Salom Dunyo Salom Dunyo Salom Dunyo
                          
                          <br />
                          <div className="notification-date">10.09.2023</div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </>
            }
            {!isAuthenticated &&
              <div className="text-center">
                <a href="/login" className="btn btn-primary">Ushbu amalni bajarish uchun tizimga kirishingiz shart</a>
              </div>
            }
          </div>
        }
        {sidebar==='chats' &&
          <>
            {isAuthenticated &&
              <>
                <Chat/>
              </>
            }
            {!isAuthenticated &&
              <div className="text-center">
                <a href="/login" className="btn btn-primary">Ushbu amalni bajarish uchun tizimga kirishingiz shart</a>
              </div>
            }
          </>

        }
        {sidebar==='profile' &&
          <>
            {isAuthenticated &&
              <Profile/>
            }
            {!isAuthenticated &&
              <div className="text-center">
                <a href="/login" className="btn btn-primary">Ushbu amalni bajarish uchun tizimga kirishingiz shart</a>
              </div>
            }
          </>

        }
      </div>
      <button className="opener-closer" onClick={
          (e)=>{
            if(sopen){
              setSopen(false);
            } else{
              setSopen(true);
            };
          }
        }><i className="fa fa-bars"></i></button>
    </>
  );
}

export default Header;
