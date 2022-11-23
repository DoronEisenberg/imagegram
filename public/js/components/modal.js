import comments from "./comments.js";
const modal = {
    data() {
        //save the variables here
        return {
            images: [],
            title: "",
            description: "",
            username: "",
        };
    },
    methods: {
        close() {
            console.log("closeaction");
            this.$emit("close");
        },
    },

    props: ["currentimage"],
    mounted() {
        console.log(this.currentimage);
    },
    template: `<div class="modal">
        <button @click="close" class='close' >x</button>
        <img :src="currentimage.url"/>
        <div class="modal-text"><h1>{{currentimage.title}}</h1>
        <p>{{currentimage.description}}</p>
        <p>Created by {{currentimage.username}} at {{currentimage.created_at}}</p>
      
        </div>
        <comments :id="currentimage.id"></comments>
    </div>`,
    components: {
        comments: comments,
    },
};
export default modal;
