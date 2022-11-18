import * as Vue from './vue.js';

;

Vue.createApp({
    data() {
        return {
            headline: "New Instegram",
            cardCSS: "all_cards",
            images: [],
            
            //firstName: "",
            //headlineCss: "headlineClass",
            //count: 0,
        }
    },
   
   mounted() {
        fetch("/images").then(res => res.json()).then(images => {
            this.images = images;
        })
    }
}).mount('#main');



/*
 methods: {
        updateName: function (e) {
            this.firstName = "Sven";
        },
        increaseCount: function () {
            this.count++;
        }

    }
    
    const images = [
    {
        name: "Paris",
        country: "France"
    },
    {
        name: "Lisboa",
        country: "Portugal"
    },
    {
        name: "Berlin",
        country: "Germany"
    }
],*/
