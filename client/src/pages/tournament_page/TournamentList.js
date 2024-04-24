import "./TournamentStyle.css"
import Card from"./components/tournament_card/Card"
import { tournement } from "./dummyData";
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";

function TournamentList() {
    return (<>
  
      
    
        <div className="card-container">
        
          {tournement.map((item) => (
            <Card
              key={item.key}
              constentHead={item.constentHead}
              imgSrc={item.imgSrc}
              proimg={item.proimg}
              proname={item.proname}
              date={item.date}
              time={item.time}
              prize={item.prize}
              statet={item.statet}
            />
          ))}
        </div>
        
      
      
      
        </>
      );
}

export default TournamentList;