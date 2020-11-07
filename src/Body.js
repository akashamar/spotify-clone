import React,{useState} from "react";
import "./Body.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Body({ spotify }) {
  const [{ discover_weekly, audio, playing}, dispatch] = useStateValue();
  
  const [url, setUrl] = useState("");

  const [prevAudio,setprevAudio] = useState(null);
	  
    const playSong = (track) => {
	    if(playing) {
			audio.pause();
		}
		
		if(url === track.preview_url){	
		
           dispatch({
				type: "SET_ITEM",
				item: track,
			});
		  
			prevAudio.pause()
			
			dispatch({
				type: "SET_PLAYING",
				playing: false,
			});
			
			
			const audio = new Audio(track.preview_url);
			
			dispatch({
				type: "SET_PREVAUDIO",
				audio: audio,
			});
				
			audio.play();
			
			dispatch({
				type: "SET_PLAYING",
				playing: true,
			});
			
			
			setUrl(track.preview_url)
			setprevAudio(audio)
		}
		else{
				if(url != ""){ 
					prevAudio.pause();
					
					dispatch({
						type: "SET_PLAYING",
						playing: false,
					});
				}
				const audio = new Audio(track.preview_url);
				
				dispatch({
					type: "SET_PREVAUDIO",
					audio: audio,
				});
				
				dispatch({
					type: "SET_ITEM",
					item: track,
				});
				
				audio.play()
				
				dispatch({
					type: "SET_PLAYING",
					playing: true,
				});
			
				setprevAudio(audio)	
				setUrl(track.preview_url)
		}
	};

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
          <p className="madefor">MADE FOR AKASH KUDLA</p>
          <div className="playbutton">PLAY</div>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            
          />
          <FavoriteIcon className="heart" fontSize="large" />
          <MoreHorizIcon className="threedot" />
        </div>
        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Body;
