import * as Vue from "./vue.js";
import modal from "./components/modal.js";

Vue.createApp({
    components: {
        modal: modal,
    },
    data() {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            currentimage: false,
            //headline: "New Instegram",
            //cardCSS: "all_cards",
            //firstName: "",
            //headlineCss: "headlineClass",
            //count: 0,
        };
    },
    methods: {
        uploadImage: function (e) {
            e.preventDefault();
            const file = document.querySelector("input[type=file]").files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", this.title);
            formData.append("description", this.description);
            formData.append("username", this.username);
            // console.log("this.title", this.title);
            fetch("/images", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((image) => {
                    //console.log("image", image);
                    this.images.push(image);
                });
        },
        zoom: function (event) {
            //getting the value of the data-id that is saved in the <img> element
            parseInt;
            let imageid = parseInt(event.target.getAttribute("data-id"));

            let found = this.images.filter((image) => image.id === imageid);
            this.currentimage = found[0];
        },
    },
    mounted() {
        fetch("/images")
            .then((res) => {
                return res.json();
            })
            .then((images) => {
                // console.log("this images", this.images, images.title);
                this.images = images;
                this.title = images.title;
                this.description = images.description;
            });
    },
}).mount("#main");

/*
export default {
    name: "App",
    components: {
        Modal,
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
    },
};
*/
