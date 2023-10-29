import Header from "./header";

function Router(props) {
  var pathname = window.location.pathname;
  if (pathname === props.url) {
    document.querySelector("title").innerHTML = props.title;
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      return (
        <>
          <Header el={props.active_el} />
          <div className="main-contents">{props.el}</div>
        </>
      );
    } else {
      return (
        <div className="">{props.el}</div>
      );
    }
  }
}

export default Router;
