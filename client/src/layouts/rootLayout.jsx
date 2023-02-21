import { Navigation } from "../components/Navigation";
import { Title } from "../components/Title";
import '../stylesheets/rootLayout.css'

const rootLayout = () => {
   return (
       <div className="root-layout">
        <header>
           <Title/>
           <Navigation/>
           </header>
           <main>
               <p>Film1</p>
               <p>Film2</p>
               <p>Film3</p>
               <p>Film4</p>
           </main>
       </div>
    );
}

export default rootLayout;