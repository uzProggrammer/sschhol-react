import { useState, useEffect } from "react";
import { MAIN_URL_API } from "..";


function detectURL(message) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return message.replace(urlRegex, function(urlMatch) {
		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
	})
}

function Messege(props){
    const withEmojis = /\p{Extended_Pictographic}/u;
    var isAuthenticated = (localStorage.getItem('auth_token')!=='') ? true : false;
    return (
        <section id={"message"+props.id} className={withEmojis.test(props.text) ? 'messege emoji-ms '+props.class: 'messege '+props.class}>
            <div className="text" style={{position: 'relative'}}>
                <div className="chat-dr">
                    <div  className="bubble" dangerouslySetInnerHTML={{__html: detectURL(props.text)}} onClick={
                        e=>{
                            var menu = e.currentTarget.parentNode.childNodes[1];
                            document.querySelectorAll('.chat-dr-menu.show').forEach(
                                el=>{
                                    if (el!==menu){
                                        el.classList.remove('show')
                                    }
                                }
                            );
                            if(menu.classList.contains('show')){menu.classList.remove('show')}
                            else{menu.classList.add('show')};
                        }
                    }></div>
                    <ul className="chat-dr-menu">
                        <li><button href="#" className="dr-item"><i className="fa fa-pen"></i> Tahrirlash</button></li>
                        <li><button href="#" className="dr-item" onClick={
                            e=>{
                                var msg = e.currentTarget.parentNode.parentNode.parentNode.childNodes[0];
                                navigator.clipboard.writeText(msg.textContent);
                            }
                        }><i className="fa fa-copy"></i> Nusxalash</button></li>
                        <li><button href="#" className="dr-item" onClick={
                            e=>{
                                if(true){
                                    var api_token = localStorage.getItem('auth_token')
                                    fetch(MAIN_URL_API+'chats/'+api_token+'/'+props.chat_id+'/'+'delete-m/'+props.id)
                                        .then(response => response.json())
                                        .then(data => {
                                            console.log(data)
                                            if(data.status==='Ok'){
                                                var msg = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
                                                msg.remove()
                                            }
                                        })
                                        .catch(rejected => {
                                            console.error(rejected);
                                    });
                                }
                            }
                        }><i className="fa fa-trash-can"></i> O'chirish</button></li>
                    </ul>
                </div>
                
                <span className="notification-date">{props.date}</span>
                
            </div>
        </section>
    );
};


function Chat(props){
    let [search, setSearch] = useState('');
    let [chat, setChat] = useState([]);
    let [messege, setMessage] = useState([]);
    let [chats, setChats] = useState([])
    useEffect(
        e=>{
        if(isAuthenticated){
            var api_token = localStorage.getItem('auth_token')
            fetch(MAIN_URL_API+'chats/'+api_token+'/',)
            .then(response => response.json())
            .then(data => {
                setChats(data);
            })
            .catch(rejected => {
                console.error(rejected);
            });
        }
        },
        [chat]
    )
    let users = chats;
    let [searchresult, setSearchresult] = useState([]);
    var isAuthenticated = (localStorage.getItem('auth_token')!=='') ? true : false;
    useEffect(
      e=>{
        var isAuthenticated = (localStorage.getItem('auth_token')!=='') ? true : false;
      }, [localStorage]
    )
    let [messages, setMessages] = useState([]);
    useEffect(
        e=>{
          if(isAuthenticated && chat.length!==0){
            var api_token = localStorage.getItem('auth_token')
            fetch(MAIN_URL_API+'chats/'+api_token+'/'+chat[3]+'/',)
              .then(response => response.json())
              .then(data => {
                setMessages(data);
              })
              .catch(rejected => {
                console.error(rejected);
              });
          }
        },
        [chat]
    );

    useEffect(
        e=>{
          if(isAuthenticated && search!==''){
            var api_token = localStorage.getItem('auth_token')
            fetch(MAIN_URL_API+'chats/'+api_token+'/search?q='+search,)
              .then(response => response.json())
              .then(data => {
                setSearchresult(data);
                console.log(data)
              })
              .catch(rejected => {
                console.error(rejected);
              });
          }
        },
        [search]
    );

    return (
        <>
            {chat.length === 0 && 
                <div className="chats">
                    <h4>Suhbatlar</h4>
                    <input type="text" className="form-control" id="search" value={search} placeholder="Qidirish..." onChange={
                        (e)=>{
                            setSearch(e.target.value);
                        }
                    } />
                    <ul>
                        {search==='' && users.length !== 0 && users.map(
                            (el)=> <li key={el.id} style={{margin: "-25px", marginTop:'7px', marginBottom: '-30px'}}>
                                <a onClick={
                                    e=>{
                                        setChat(
                                            [
                                                el.name,
                                                el.email,
                                                el.status,
                                                el.id.toString()
                                            ]
                                        )
                                    }
                                } href="#" className="card bg-auto p-2" style={{display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center', position: 'relative'}}>
                                    <span className="image-name chat-item">{new String(el.name).toUpperCase()[0]}</span>
                                    <span style={el.status==='online' ? {padding: '6px', background: 'green', borderRadius: '50%', position: 'absolute', left:'55px', top: '68%'} : {padding: '6px', background: 'red', borderRadius: '50%', position: 'absolute', left:'55px', top: '68%'}}></span>
                                    <div className="user-info">
                                        {el.name} <br />
                                        <span className="notification-date">{el.email}</span>
                                        <span style={el['new-m']!==0 ?
                                            {
                                                position: 'absolute',
                                                top: '25px',
                                                right: '5px',
                                            } : {display: 'none'}
                                        } className="badge bg-auto">+{el['new-m']}</span>
                                    </div>
                                </a>
                            </li>
                        )}
                        {search==='' && users.length===0 && 
                            <>
                                <div className="text-center fs-6 pt-3 text-info">Sizda Hech Qanday Chat yo'q. Iltimos biron bir kishi bilan suhbatni boshlang</div>
                            </>
                        }
                        {search!=='' &&
                            <>
                                {searchresult.map(
                                    el=> <li key={el.id} style={{margin: "-25px", marginTop:'7px', marginBottom: '-30px'}}>
                                        <a onClick={
                                            e=>{
                                                if(isAuthenticated && search!==''){
                                                    var api_token = localStorage.getItem('auth_token')
                                                    fetch(MAIN_URL_API+'chats/'+api_token+'/create/'+el.id+'/',)
                                                        .then(response => response.json())
                                                        .then(data => {
                                                            setChat(
                                                                [data.name,
                                                                data.email,
                                                                data.status,
                                                                data.id.toString(),]
                                                            );
                                                            console.log(data)
                                                        })
                                                        .catch(rejected => {
                                                            console.error(rejected);
                                                        }
                                                    );
                                                }
                                            }
                                        } href="#" className="card bg-auto p-2" style={{display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center', position: 'relative'}}>
                                            <span className="image-name chat-item">{new String(el.name).toUpperCase()[0]}</span>
                                            <span style={el.status==='online' ? {padding: '6px', background: 'green', borderRadius: '50%', position: 'absolute', left:'55px', top: '68%'} : {padding: '6px', background: 'red', borderRadius: '50%', position: 'absolute', left:'55px', top: '68%'}}></span>
                                            <div className="user-info">
                                                {el.name} <br />
                                                <span className="notification-date">{el.username}</span>
                                            </div>
                                        </a>
                                    </li>
                                )}
                            </>
                        }
                    </ul>
                </div>
            }
            {chat.length !== 0 && 
                <>
                    <div className="chat">
                        <div className="chat-header" style={{display: 'flex', flexDirection:'row', gap: '10px', alignItems: 'center', position: 'sticky',zIndex: '99999999999'}}>
                            <button onClick={
                                (e)=>{
                                    setChat([])
                                }
                            } className="btn bg-auto"><i className="fa fa-angle-left"></i></button>
                            <span>
                                <h5 className="text-white">{chat[0]}</h5>
                                <span className="notification-date" style={chat[2]==='online' ? {color: 'green'} : {color: 'red'}}>{chat[2]}</span>
                            </span>
                        </div>
                        <div className="messeges">
                            {messages.map(
                                el=><Messege id={el.id} key={el.id} class={el['is_recipient'] ? 'left':'right'} text={el.message} date={el.date} chat_id={chat[3]} />
                            )}
                            
                        </div>
                        <div className="chat-footer">
                            {messege[1]===chat[1] &&
                                <textarea type="text" className="form-control" placeholder="Habaringizni yozing: " onChange={
                                    (e)=>{
                                        setMessage([e.target.value, chat[1]])
                                    }
                                } value={messege[0]} />
                            }
                            {messege[1]!==chat[1] &&
                                <textarea type="text" className="form-control" placeholder="Habaringizni yozing: " onChange={
                                    (e)=>{
                                        setMessage([e.target.value, chat[1]])
                                    }
                                } />
                            }
                            <div className="text-end mt-2">
                                <button className="btn btn-primary" onClick={
                                    e=>{
                                        var api_token = localStorage.getItem('auth_token')
                                        fetch(MAIN_URL_API+'chats/'+api_token+'/'+chat[3].toString()+'/send', {method:'POST',body: JSON.stringify({'message': messege[0]})})
                                            .then(response => response.json())
                                            .then(data => {
                                                setMessages(data);
                                                setMessage('');
                                                document.querySelector('#message'+data[data.length-1]['id']).scrollIntoView()
                                            })
                                            .catch(rejected => {
                                                console.error(rejected);
                                            }
                                        );
                                    }
                                }>Yuborish</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default Chat;