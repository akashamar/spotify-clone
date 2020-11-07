import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./Footer.css";
import { Grid, Slider } from "@material-ui/core";

function Footer({ spotify }) {
  const [{ token, item, playing, audio,discover_weekly }, dispatch] = useStateValue();
  const [index, setIndex] = useState(0);

  const handlePlayPause = () => {
    if (playing) {
      audio.pause();
	  
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      audio.play();
	  
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
		let i = index+1;
		setIndex(i)
		
		if(index===0){
			i=0;
		}
		
		if(index===29){
			i=0;
			setIndex(i)
		}
		
        if(playing){
		    audio.pause();
			
			dispatch({
				type: "SET_PLAYING",
				playing: false,
			});
			
			const audioNow = new Audio(discover_weekly.tracks.items[i].track.preview_url);
			audioNow.play();
			
			dispatch({
				type: "SET_ITEM",
				item: discover_weekly.tracks.items[i].track,
			});
			
			dispatch({
				type: "SET_PREVAUDIO",
				audio: audioNow,
			});
			
			dispatch({
				type: "SET_PLAYING",
				playing: true,
			});
			
		}else{

			const audioNow = new Audio(discover_weekly.tracks.items[i].track.preview_url);
			audioNow.play();
			
			dispatch({
				type: "SET_ITEM",
				item: discover_weekly.tracks.items[i].track,
			});
			
			dispatch({
				type: "SET_PLAYING",
				playing: true,
			});
			
			dispatch({
				type: "SET_PREVAUDIO",
				audio: audioNow,
			});
		}
    };

  const skipPrevious = () => {
        let i = index-1;
		setIndex(i)
		
		if(index===0){
			i=29;
			setIndex(i)
		}
		
        if(playing){
		    audio.pause();
			
			dispatch({
				type: "SET_PLAYING",
				playing: false,
			});
			
			const audioNow = new Audio(discover_weekly.tracks.items[i].track.preview_url);
			audioNow.play();
			
			dispatch({
				type: "SET_ITEM",
				item: discover_weekly.tracks.items[i].track,
			});
			
			dispatch({
				type: "SET_PREVAUDIO",
				audio: audioNow,
			});
			
			dispatch({
				type: "SET_PLAYING",
				playing: true,
			});
			
		}else{

			const audioNow = new Audio(discover_weekly.tracks.items[i].track.preview_url);
			audioNow.play();
			
			dispatch({
				type: "SET_ITEM",
				item: discover_weekly.tracks.items[i].track,
			});
			
			dispatch({
				type: "SET_PLAYING",
				playing: true,
			});
			
			dispatch({
				type: "SET_PREVAUDIO",
				audio: audioNow,
			});
		}
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p className="hide">
              {item.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green hide" />
        <SkipPreviousIcon onClick={skipPrevious} className="footer__icon hide" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon onClick={skipNext} className="footer__icon hide" />
        <RepeatIcon className="footer__green hide" />
      </div>
      <div className="footer__right hide">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
