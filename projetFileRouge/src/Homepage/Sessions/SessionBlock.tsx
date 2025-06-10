import type { Session } from "../Homepage"

function SessionBlock(session: Session){
    return(
        <div>
            <p className="sessionName">{session.name}</p>
            <div>
                <img src={session.image} alt="#"/>
                <p className="sessionTheme">{session.theme}</p>
                <p className="sessionPlayerNb">{session.playerNb} players</p>
                <p className="sessionDifficulty">Difficulty: {session.difficulty}</p>
                <p className="sessionDescription">{session.description}</p>
            </div>
        </div>
    )
};

export default SessionBlock;