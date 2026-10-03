// Get the HTML elements
const userForm = document.getElementById("userForm");
const postForm = document.getElementById("postForm");

const userBox = document.getElementById("userBox");
const postBox = document.getElementById("postBox");
const thread = document.getElementById("thread");

const post = document.getElementById("post");
const count = document.getElementById("count");
const posts = document.getElementById("posts");


// Store the user
let user = null;


// Get the user's information once
userForm.addEventListener("submit", function(event) {

    event.preventDefault();

    user = {
        name: document.getElementById("name").value,
        birthday: document.getElementById("birthday").value,
        yearLevel: document.getElementById("yearLevel").value,
        gender: document.getElementById("gender").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    // Show the post box
    document.getElementById("welcome").textContent =
        "Hello, " + user.name;

    userBox.classList.add("hidden");
    postBox.classList.remove("hidden");
    thread.classList.remove("hidden");
});


// Count the characters
post.addEventListener("input", function() {

    count.textContent =
        post.value.length + " / 280";

});


// Create a post
postForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let text = post.value.trim();

    if (text === "") {
        return;
    }

    // Get today's date and time
    let date = new Date().toLocaleString();


    // Data that will be encrypted
    let data = user.name + " | " + text + " | " + date;


    // Encrypt using AES
    let encrypted = CryptoJS.AES.encrypt(
        data,
        user.password
    ).toString();


    // Create the post
    let newPost = document.createElement("div");

    newPost.className = "post";

    newPost.innerHTML = `
        <div class="postInfo">
            ${user.username} • ${date}
        </div>

        <div class="label">
            ORIGINAL POST
        </div>

        <div class="original">
            ${text}
        </div>

        <div class="label">
            ENCRYPTED VALUE
        </div>

        <div class="encrypted">
            ${encrypted}
        </div>
    `;


    // Put the post below the post box
    posts.prepend(newPost);


    // Clear the text box
    post.value = "";
    count.textContent = "0 / 280";

});
