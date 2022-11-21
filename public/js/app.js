import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            headline: "New Instegram",
            cardCSS: "all_cards",
            images: [],

            //firstName: "",
            //headlineCss: "headlineClass",
            //count: 0,
        };
    },
    methods: {
        uploadImage: function (e) {
            const file = document.querySelector("input[type=file]").files[0];
            const formData = new FormData();

            formData.append("file", file);
            fetch("/images", {
                method: "POST",
                body: formData,
            });
        },
    },

    mounted() {
        fetch("/images")
            .then((res) => res.json())
            .then((images) => {
                this.images = images;
            });
    },
}).mount("#main");
