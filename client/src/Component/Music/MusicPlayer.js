//MusicPlayer.js
import React, { useState, useEffect } from 'react';
const MusicPlayer = () => {
  //초기값만 필요하고 변경값이 필요하지 않을 때 사용하는 useState
  const [state, setState] = useState({
    playlist: ['1.mp3', '2.mp3', '3.mp3'],
    currentSong: 0,
    isPlaying: false,
  });

  //재생버튼을 누를 때 재생이 될 수 있도록 설정
  const playSong = () => {
    setState((prevState) => ({ ...prevState, isPlaying: true }));
  };
  //일시정지 버튼
  const pauseSong = () => {
    setState((prevState) => ({ ...prevState, isPlaying: false }));
  };
  //재생목록
  const displayPlayList = () => {
    console.log('재생목록 : ', state.playlist.join(','));
  };

  //다음곡 재생
  const playNextSong = () => {
    const nextSong = (state.currentSong + 1) % state.playlist.length;

    setState((prevState) => ({ ...prevState, currentSong: nextSong }));
  };

  return (
    <div>
      <h1>음악 플레이어</h1>
      <p>현재 재생중 : {state.playlist[state.currentSong]}</p>
      <button onClick={playSong} disabled={state.isPlaying}>
        재생
      </button>
      <button onClick={pauseSong} disabled={!state.isPlaying}>
        일시정지
      </button>
      <button onClick={playNextSong}>다음 곡</button>
      <button onClick={displayPlayList}>재생 목록 보기</button>
    </div>
  );
};
export default MusicPlayer;
