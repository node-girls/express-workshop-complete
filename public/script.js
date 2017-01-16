if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready () {
    console.log("READY??");
    getFromServer('/get-posts');

    // send posts to server
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // prevents the form from contacting our server automatically (we want to do it ourselves)
        var formActionUrl = form.action; // 'form.action' is the url '/create-post'
        var formData = new FormData(form);

        postToServer(formActionUrl, formData);
    });

    function postToServer (url, data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.onerror = function (error) {
            console.error(error);
        }
        xhr.send(data);
    }

    function getFromServer (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    for (var blogpost in data) {
                        var postDiv         = document.createElement('div');
                        var postText        = document.createElement('p');
                        var thumbnail       = document.createElement('img');
                        var postContainer   = document.getElementsByClassName('post-container')[0];

                        thumbnail.src = "./img/logo2.png";
                        thumbnail.className = "thumbnail";
                        postText.innerHTML = data[blogpost];
                        postDiv.className = "post";

                        postDiv.appendChild(thumbnail);
                        postDiv.appendChild(postText);
                        postContainer.appendChild(postDiv);
                    }
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function (error) {
            console.error(error);
        }
        xhr.send();
    }
}
