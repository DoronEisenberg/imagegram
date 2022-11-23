const Comments = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    methods: {
        sendComment(e) {
            e.preventDefault();
            console.log("comments", this.username, this.comment, this.id);
            const comment = {
                username: this.username,
                comment: this.comment,
                image_id: this.id,
            };
            console.log("comment", comment);

            fetch("/comments", {
                method: "POST",
                body: JSON.stringify(comment),
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    return response.json();
                    console.log("respone", response);
                })
                .then((lastComment) => {
                    this.comments.push(lastComment);
                    console.log("Comments", this.comments);
                });
        },
    },
    props: ["id"],
    mounted() {
        //get request from server with a specific id
        fetch(`/comments/${this.id}`)
            .then((response) => {
                console.log("response von comments.js", response);
                return response.json();
            })
            .then((comments) => {
                this.comments = comments;
                console.log("comments in comment.js", this.comments);
            });
    },
    template: `<div>
            <form id="comments-form"  
                method="" enctype="multipart/form-data">
                <div class="comments" v-for="comment in comments">
                    <p>
                       from: {{ comment.username }}
                    </p>
                    <p>{{ comment.comment }}</p>
                </div>
                <div class="form-row">
                    <input size="25"  type="text" v-model="username" name="username" placeholder="Name"/> 
                    <br>
                    <textarea rows="4" type="text" v-model="comment"  name="comment"  placeholder="Comment"></textarea>  
                </div>
                <input type="submit" v-on:click="sendComment" value="submit" class="button />
            </form>
    </div>`,
};
export default Comments;

//    <div class="card" v-for="comment in comments" @click="openModal(image)">
//    </div>
