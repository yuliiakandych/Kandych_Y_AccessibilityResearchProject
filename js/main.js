// import Genius from '/node_modules/genius-api/api.js'
import Audio from "./components/AudioComponent.js";
import Video from "./components/VideoComponent.js";
console.log("vue is running");

const routes = [
    {
      path: "/", name: "Audio", component: Audio, meta: {
        title: 'Media for everyone'
      }
    },
    { path: "/video", name: "Video", component: Video },
    
  
  ];
  
  const router = new VueRouter({
    routes,
    // mode: "history"
  });
  
  
  new Vue({
    router,
   
  
  }).$mount("#app");


  
  