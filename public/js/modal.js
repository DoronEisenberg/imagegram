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
    methods: {},
    props: ["currentimage"],
    mounted() {
        // console.log("imageId in mounted", this.imageId);
        console.log(this.currentimage);
    },
    template: `<div class="modal">
    <div class='close'>x</div>
    <img :src="currentimage.url"/>
    </div>`,
};
export default modal;
