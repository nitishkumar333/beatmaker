class DrumKit
{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.stickDrumAudio = document.querySelector(".stickDrum-sound");
        this.openHatAudio = document.querySelector(".openHat-sound");
        this.midTomAudio = document.querySelector(".midTom-sound");
        this.percussionAudio = document.querySelector(".percussion-sound");
        this.heyAudio = document.querySelector(".hey-sound");
        this.stabsAudio = document.querySelector(".stabs-sound");
        this.index = 0;
        this.bpm = 250;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    activePad(){
        this.classList.toggle("active");
    }
    repeat(){
        let step = this.index % 32;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar => {
            bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
            if(bar.classList.contains("active"))
            {
                if(bar.classList.contains("kick-pad"))
                {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                    bar.style.animation = "playTrackTemp 0.3s alternate ease-in-out 2";
                }
                if(bar.classList.contains("stickDrum-pad"))
                {
                    this.stickDrumAudio.currentTime = 0;
                    this.stickDrumAudio.play();
                    bar.style.animation = "playTrackTemp 0.3s alternate ease-in-out 2";
                }
                if(bar.classList.contains("openHat-pad"))
                {
                    this.openHatAudio.currentTime = 0;
                    this.openHatAudio.play();
                    bar.style.animation = "playTrackTemp 0.3s alternate ease-in-out 2";
                }
                if(bar.classList.contains("midTom-pad"))
                {
                    this.midTomAudio.currentTime = 0;
                    this.midTomAudio.play();
                    bar.style.animation = "playTrackTemp 0.3s alternate ease-in-out 2";
                }
                if(bar.classList.contains("percussion-pad"))
                {
                    this.percussionAudio.currentTime = 0;
                    this.percussionAudio.play();
                    bar.style.animation = "playTrackTemp 0.3s alternate ease-in-out 2";
                }
                if(bar.classList.contains("hey-pad"))
                {
                    this.heyAudio.currentTime = 0;
                    this.heyAudio.play();
                    bar.style.animation = "playTrackTemp 0.3s alternate ease-in-out 2";
                }
                if(bar.classList.contains("stabs-pad"))
                {
                    this.stabsAudio.currentTime = 0;
                    this.stabsAudio.play();
                    bar.style.animation = "playTrackTemp 0.3s alternate ease-in-out 2";
                }
            }
        })
        this.index++;
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        if(this.isPlaying)
        {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
        else{
            this.isPlaying = setInterval(() =>{
                this.repeat();
            },interval);
        }
    }
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        }
        else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.add("active");
        }
    }
    mute(e){
        const muteIdx = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIdx){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.stickDrumAudio.volume = 0;
                    break;
                case "2":
                    this.openHatAudio.volume = 0;
                    break;
            }
        }
        else{
            switch(muteIdx){
                case "0":
                    this.kickAudio.volume = 1; 
                    break;
                case "1":
                    this.stickDrumAudio.volume = 1;
                    break;
                case "2":
                    this.openHatAudio.volume = 1;
                    break;
            }
        }
    }
    changeLogo(e){
        if(e.target.classList.contains("active")){
            e.target.innerHTML = '<i class="fa-solid fa-volume-mute"></i>';
        }
        else{
            e.target.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
    }
    changeTempo(e){
        const tempoText = document.querySelector(".temp-nr");
        // this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
          this.start();
        }
      }
}
const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener("click",drumKit.activePad);
    pad.addEventListener("animationend",function() {
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click",function() {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.muteBtns.forEach(btn=>{
    btn.addEventListener("click",function(e){
        drumKit.mute(e);
        drumKit.changeLogo(e);
    });
});

drumKit.tempoSlider.addEventListener("input",function(e){
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change",function(e){
    drumKit.updateTempo(e);
});