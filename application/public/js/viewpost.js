const videoObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      document.getElementById("jump-to-top-button").style.display = "none";
    } else {
      document.getElementById("jump-to-top-button").style.display = "inline-block";
    }
  });
  
  videoObserver.observe(document.getElementById("video1"));

  document.getElementById("comment-button").addEventListener('click',function(ev){
    // ev.preventDefault(); // add this or delete form to achieve comment without refresh
    let commentText = document.getElementById("comment-text").value;
    if(!commentText) return; 
    var postId= ev.currentTarget.dataset.postid;
    fetch("/comments/create",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(
            {
                postId: postId,
                comment: commentText,
            }
        )
    })
    .then(response => {
        console.log(response);
        return response.json()
    })
    .then(data => {
        console.log(data);
        var comments = document.getElementById('commentsContainer')
        //template fragment to create template element 
        let commentFragment = document.createElement('template');
        commentFragment.innerHTML=
        `<div class="comment">
            <strong class="comments-author">${data.username}</strong>
            <span class="comment-date">${(new Date()).toLocaleString(
            "en-us",{
                dateStyle:"long",
                timestyle:"medium"
            })}</span>
            <div class="comment-text">${data.commentText}</div>
        </div>`;
    comments.append(commentFragment.content.firstChild)    
    })
    .catch(err => console.log(err));

    })