import { NavLink } from "react-router-dom";

const rootLayout = () => {
   return (
       <div className="root-layout">
        <header>
            <div className="title">Weviews</div>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="films">Films</NavLink>
                <NavLink to="/login">Log In</NavLink>
            </nav>
        </header>
       </div>
    );
}

export default rootLayout;