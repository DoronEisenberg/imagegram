import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            //headline: "New Instegram",
            //cardCSS: "all_cards",
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
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);

            console.log("this.username", this.username);
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
