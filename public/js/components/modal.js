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
    
    </div>`,
};
export default modal;
