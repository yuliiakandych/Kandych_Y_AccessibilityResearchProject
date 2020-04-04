
export default {
    template: `
  <div>
    <router-link class="navlink" to="/">Music</router-link>
    <router-link class="navlink" to="/video">Movie/TvShow</router-link>
    <h1 class="text-center">Music for everyone</h1>
    <div class="d-flex row">
    <div class="player ml-5 col-sm-8 col-md-6 col-lg-4">
        <div class="player__top">
          <div class="player-cover">
            <transition-group :name="transitionName">
                <div class="player-cover__item" v-if="$index === currentTrackIndex" :style="{ backgroundImage: 'url(' + track.cover + ')' }"  v-for="(track, $index) in tracks" :key="$index"></div>
            </transition-group>
          </div>
          <div class="player-controls">
            <div class="player-controls__item -favorite" :class="{ active : currentTrack.favorited }" @click="favorite">
            <img class="icon"  src="images/heart.svg" alt="heart"/>
           
            </div>
            <a :href="currentTrack.url" target="_blank" class="player-controls__item">
            <img class="icon"  src="images/link.svg" alt="link"/>
            </a>
            <div class="player-controls__item" @click="prevTrack">
            <img class="icon"  src="images/left.svg" alt="arrow left"/>
            </div>
            <div class="player-controls__item" @click="nextTrack">
            <img class="icon"  src="images/right.svg" alt="arrow right"/>
            </div>
            <div class="player-controls__item -xl js-play" @click="play">
            <img class="icon" width="90" src="images/pause.svg" v-if="isTimerPlaying" alt="pause"/>
           <img class="icon" width="90" src="images/play.svg" v-else alt="play"/>
           
        
            </div>
          </div>
        </div>
        <div class="progress" ref="progress">
          <div class="progress__top">
            <div class="album-info" v-if="currentTrack">
              <div class="album-info__name">{{ currentTrack.artist }}</div>
              <div class="album-info__track">{{ currentTrack.name }}</div>
            </div>
            <div class="progress__duration">{{ duration }}</div>
          </div>
          <div class="progress__bar" @click="clickProgress">
            <div class="progress__current" :style="{ width : barWidth }"></div>
          </div>
          <div class="progress__time">{{ currentTime }}</div>
        </div>
        
      </div>
      <div class=" col-md-5">
      <div class="lyrics-container">
    <div class="lyrics-control">
      <button>Get lyrics</button>
    </div>
    <section class="lyrics m-2">
    So, so you think you can tell
Heaven from hell
Blue skies from pain
Can you tell a green field
From a cold steel rail?
A smile from a veil?
Do you think you can tell?
Did they get you to trade
Your heroes for ghosts?
Hot ashes for trees?
Hot air for a cool breeze?
Cold comfort for change?
Did you exchange
A walk on part in the war
For a lead role in a cage?
How I wish, how I wish…
    </section>
  </div>
      
  <div id='rg_embed_link_1638' class='rg_embed_link' data-song-id='1638'>Read <a href='https://genius.com/Pink-floyd-wish-you-were-here-lyrics'>“Wish You Were Here” by Pink Floyd</a> on Genius</div> 

       </div>
      
    </div>
 
   </div>
    
    </div>
   
    `,
    data() {
        return {
         articles: null,
          audio: null,
          circleLeft: null,
          barWidth: null,
          duration: null,
          currentTime: null,
          isTimerPlaying: false,
          
          tracks: [
            {
              name: "Wish you were here",
              artist: "Pink Floyd",
              cover:"images/pink_floyd.png",
              source: "audio/wish.mp3",
              url: "https://www.youtube.com/watch?v=IXdNnw99-Ic",
              favorited: false
            }
   
          ],
          currentTrack: null,
          currentTrackIndex: 0,
          transitionName: null
        };
      },
      methods: {
        play() {
          if (this.audio.paused) {
            this.audio.play();
            this.isTimerPlaying = true;
          } else {
            this.audio.pause();
            this.isTimerPlaying = false;
          }
        },
        generateTime() {
          let width = (100 / this.audio.duration) * this.audio.currentTime;
          this.barWidth = width + "%";
          this.circleLeft = width + "%";
          let durmin = Math.floor(this.audio.duration / 60);
          let dursec = Math.floor(this.audio.duration - durmin * 60);
          let curmin = Math.floor(this.audio.currentTime / 60);
          let cursec = Math.floor(this.audio.currentTime - curmin * 60);
          if (durmin < 10) {
            durmin = "0" + durmin;
          }
          if (dursec < 10) {
            dursec = "0" + dursec;
          }
          if (curmin < 10) {
            curmin = "0" + curmin;
          }
          if (cursec < 10) {
            cursec = "0" + cursec;
          }
          this.duration = durmin + ":" + dursec;
          this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
          let progress = this.$refs.progress;
          let maxduration = this.audio.duration;
          let position = x - progress.offsetLeft;
          let percentage = (100 * position) / progress.offsetWidth;
          if (percentage > 100) {
            percentage = 100;
          }
          if (percentage < 0) {
            percentage = 0;
          }
          this.barWidth = percentage + "%";
          this.circleLeft = percentage + "%";
          this.audio.currentTime = (maxduration * percentage) / 100;
          this.audio.play();
        },
        clickProgress(e) {
          this.isTimerPlaying = true;
          this.audio.pause();
          this.updateBar(e.pageX);
        },
        prevTrack() {
          this.transitionName = "scale-in";
          this.isShowCover = false;
          if (this.currentTrackIndex > 0) {
            this.currentTrackIndex--;
          } else {
            this.currentTrackIndex = this.tracks.length - 1;
          }
          this.currentTrack = this.tracks[this.currentTrackIndex];
          this.resetPlayer();
        },
        nextTrack() {
          this.transitionName = "scale-out";
          this.isShowCover = false;
          if (this.currentTrackIndex < this.tracks.length - 1) {
            this.currentTrackIndex++;
          } else {
            this.currentTrackIndex = 0;
          }
          this.currentTrack = this.tracks[this.currentTrackIndex];
          this.resetPlayer();
        },
        resetPlayer() {
          this.barWidth = 0;
          this.circleLeft = 0;
          this.audio.currentTime = 0;
          this.audio.src = this.currentTrack.source;
          setTimeout(() => {
            if(this.isTimerPlaying) {
              this.audio.play();
            } else {
              this.audio.pause();
            }
          }, 300);
        },
        favorite() {
          this.tracks[this.currentTrackIndex].favorited = !this.tracks[
            this.currentTrackIndex
          ].favorited;
        }
      },
      created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function() {
          vm.generateTime();
        };
        this.audio.onloadedmetadata = function() {
          vm.generateTime();
        };
        this.audio.onended = function() {
          vm.nextTrack();
          this.isTimerPlaying = true;
        };
    
        
        for (let index = 0; index < this.tracks.length; index++) {
          const element = this.tracks[index];
          let link = document.createElement('link');
          link.rel = "prefetch";
          link.href = element.cover;
          link.as = "image"
          document.head.appendChild(link)
        }
      },

      mounted() {
         console.log('mounted')
       //The best long-term solution is to use api for multiple songs
       // I tried to figure out genius api to fetch lyrics and other metadata for the particular artist
       // I ran into cores and Same-Origin Policy issues with browser(
        // var token = 'zr4IJg1a4BaBDOujHqINgfsS6m5RHhTovM4w5AXDpZLbPW9oFYhqKSZbPPSrvFMI';
        // let url = 'https://api.genius.com/search?access_token=' + token + 'q=Radiohead';
        
        // fetch(url)
        //   .then(res => res.json())
        //   .then(data => this.hits = data.hits) 


  const lyrics = document.querySelector('.lyrics');
  const lyricsBtn = document.querySelector('.lyrics-container button');

 lyricsBtn.onclick = function() {
  if(lyricsBtn.textContent === 'Get lyrics') {
    lyrics.style.height = '400px';
    lyricsBtn.textContent = 'Hide lyrics';
  } else {
    lyrics.style.height = '0';
    lyricsBtn.textContent = 'Get lyrics';
  }
};

      }   
      
      

}
