function getUsers() {
    let requestUser = new XMLHttpRequest();
    requestUser.open("GET", "https://jsonplaceholder.typicode.com/users");
    requestUser.responseType = "json";
    requestUser.send();
    
    let requestPosts = new XMLHttpRequest();
    requestPosts.open("GET", "https://jsonplaceholder.typicode.com/posts");
    requestPosts.responseType = "json";
    requestPosts.send();

    requestUser.onload = function () {
        if (requestUser.status >= 200 && requestUser.status < 300)
        {
            let users = requestUser.response;
        
            for (let i = 0; i < users.length; i++) 
            {
                let content = `
                <div class="content">
                <h1>name-${users[i].id}: <span>${users[i].name}</span></h1>
                <p class="email">email: <span>${users[i].email}</span></p>
                </div>`;
                document.querySelector(".user-name").innerHTML += content;
                document.querySelectorAll(".email")[i].classList.add("hidden");
                let classContent = document.querySelectorAll(".content");
                classContent.forEach(function (e) {
                    e.onclick = function () {
                        // email[i].classList.remove("hidden")
                        classContent.forEach((r) => {
                            r.classList.remove("active");
                            console.log(r.children[1].classList.add("hidden"));
                        })
                        console.log(e.children[1].classList.remove("hidden"));
                        e.classList.add("active");
                        for (let k = 0; k < users.length; k++) 
                        {
                            if (e.children[0].children[0].textContent === users[k].name ||
                                e.children[1].children[0].textContent === users[k].email)
                                {
                                if (requestPosts.status >= 200 && requestPosts.status < 300)
                                {
                                    let posts = requestPosts.response;
                                    for (let j = 0; j < posts.length; j++) 
                                    {
                                        if (users[k].id === posts[j].userId)
                                        {
                                            let postTitle = posts[j].title;
                                            let postBody = posts[j].body;
                                            let contentTitle = `
                                            <div class="content-title">
                                                <div class="flex">
                                                    <p>userid: <span>${posts[j].userId}</span></p>
                                                    <p>id: <span class="id">${posts[j].id}</span></p>
                                                </div>
                                                <h1>title: <span>${postTitle}</span></h1>
                                                <p>body: <span>${postBody}</span></p>
                                            </div>`;
                                            document.querySelector(".user-title").innerHTML += contentTitle;
                                        }
                                    }
                                    var contentTI = document.querySelectorAll(".content-title");
                                    if (contentTI.length > classContent.length)
                                    {
                                        for (let b = 0; b < contentTI.length; b++) 
                                        {
                                            // contentTI[b].remove();
                                            for (let c = 0; c < posts.length; c++)
                                            {
                                                if (contentTI[b].children[0].children[0].textContent === posts[c].title &&
                                                    contentTI[b].children[1].children[0].textContent === posts[c].body &&
                                                    posts[c].userId !== users[k].id)
                                                {
                                                    contentTI[b].remove();
                                                }
                                                for (let y = 0; y < 10; y++) 
                                                {
                                                    contentTI[y].remove()
                                                }
                                            }
                                        }
                                    }
                                    let userTitle = document.querySelector(".user-title").children;
                                    for (let y = 6; y < 11; y++)
                                    {
                                        userTitle[y].classList.add("hidden");
                                    }
                                    userTitle[0].classList.remove("hidden")
                                    userTitle[0].addEventListener("click", () =>
                                    {
                                        for (let r = 1; r < userTitle.length; r++)
                                        {
                                            if (userTitle[r].classList.contains("hidden"))
                                            {
                                                userTitle[r].classList.remove("hidden")
                                                // console.log()
                                                userTitle[0].textContent = "back";
                                            }
                                            else
                                            {
                                                userTitle[r].classList.add("hidden")
                                                // console.log()
                                                userTitle[0].textContent = "next";
                                            }
                                        }
                                    }) 
                                    userTitle[0].textContent = "next";
                                }
                            }
                        }
                        
                    }
                })
            }
        }
    }
}
getUsers();
