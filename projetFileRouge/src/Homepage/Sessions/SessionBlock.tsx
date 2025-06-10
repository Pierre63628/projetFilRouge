import type { Session } from "../Homepage"

function SessionBlock(session: Session){
    return(
        <div>
            <p className="sessionName">{session.name}</p>
            <div className="sessionInfoContainer">
                <img className="sessionImage" src={session.image} alt="#"/>
                <p className="sessionTheme">Theme: {session.theme}</p>
                <p className="sessionPlayerNb">{session.playerNb} players</p>
                <p className="sessionDifficulty">Difficulty: {session.difficulty}</p>
                <p className="sessionDescription">{session.description}</p>
            </div>
        </div>
    )
};

export default SessionBlock;