export default {
    template: `
    <div>
    
    <router-link class="navlink" to="/">Music</router-link>
    <router-link class="navlink" to="/video">Movie/TvShow</router-link>


    <h1 class="text-center m-5">Breakfast at Tiffany's </h1>

    <div class="container">
	<video controls crossorigin playsinline poster="images/poster.jpg">
		 <source src="video/Movie.mp4" type="video/mp4" size="576">
			

			<!-- Caption files -->
			<track kind="captions" label="English" srclang="en" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
					default>
			<track kind="captions" label="Français" srclang="fr" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt">
			<!-- Fallback for browsers that don't support the <video> element -->
			<a href="video/Movie.mp4" download>Download</a>
	</video>
</div>


<h1 class="m-5 text-center">Friends TvShow</h1>
<div class="m-5 d-flex row justify-content-center">
	<video controls crossorigin playsinline poster="images/poster.jpg" class="col-lg-6">
		 <source src="video/tv_show.mp4" type="video/mp4" size="576">
			

			<!-- Caption files -->
			<track kind="captions" label="English" srclang="en" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
					default>
			<track kind="captions" label="Français" srclang="fr" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt">
			<!-- Fallback for browsers that don't support the <video> element -->
			<a href="video/tv_show.mp4" download>Download</a>
  </video>
  <p class="p-2 col-lg-6">A Comedy Series based in Manhatten about 6 young friends, in the struggle to find success and happiness in life, but it is never that straight forward, is it? Rachel Green - A popular schoolgirl of the past, is now a spoiled brat living off her fathers finance. In an attempt to start a new life after running out on her wedding, she shares an apartment with an old best friend Monica Geller, and eventually befriends the other 4 and Monica's older brother, Ross. Monica Geller - A compulsive neat freak, who has trouble with her love life. Monica was teased when she was in high school for being overweight. However, now a head-chef at a top restaurant in Manhatten, she has lost all her excessive weight, and just wants to start a family with 'the right guy' to complete a happy life. </p>
</div>
    </div>
    `,
    mounted() {
      console.log(' video component is mounted')
      const player = new Plyr('video', {captions: {active: true}});

      
      window.player = player;
      
    }
    
  
  }
