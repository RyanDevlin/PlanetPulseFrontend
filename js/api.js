function output(inp) {
    var element = document.getElementById("response-box");

    element.innerHTML = '';
    element.appendChild(document.createElement('pre')).innerHTML = inp;
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function fetchAsync (url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status == 404) {
                    return "HTTP error " + response.status
                } else if (response.status == 400) {
                    return response.json(); // The API server handles 400 requests gracefully
                }
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            // ...use the data here...
            output(syntaxHighlight(JSON.stringify(data, undefined, 4)));
        })
        .catch(error => {
            // ...show/handle error here...
            output(error.message)
        });
}

function validateUrl(url) {
    defaultDomain = "api.planetpulse.io"
    defaultResource = "/v1/co2"
    defaultQuery = "year=2021"

    let startWithHttps = /^https:\/\//
    let startWithHttp = /^http:\/\//
    let validDomain = new RegExp("^https:\/\/" + defaultDomain);

    if (url.search(startWithHttp) != -1) { // If starts with 'http://'
        url = url.replace(startWithHttp, "https://")
    } else if (url.search(startWithHttps) == -1) { // If doesn't start with 'https://'
        url = "https://" + url
    }

    // Ensure only defaultDomain can be connected to
    if (url.search(validDomain) == -1) {
        console.log("There's no way I'd let you connect to " + url)
        return "https://" + defaultDomain + defaultResource + "?" + defaultQuery
    }
    return url
}

function ProcessInput() {
    url = document.getElementById("api-query").value;
    url = validateUrl(url);

    fetchAsync(url);
}

document.getElementById("api-query").addEventListener("change", function( event ) {
    ProcessInput()
    , false
});

function setCursor(node,pos){
    node = (typeof node == "string" || node instanceof String) ? document.getElementById(node) : node;

    if(!node){
        return false;
    }else if(node.createTextRange){
        var textRange = node.createTextRange();
        textRange.collapse(true);
        textRange.moveEnd(pos);
        textRange.moveStart(pos);
        textRange.select();
        return true;
    }else if(node.setSelectionRange){
        node.setSelectionRange(pos,pos);
        return true;
    }
    return false;
}

function initializeApiPage() {
    node = document.getElementById("api-query");
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
        setCursor(node,node.value.length);
    }
    ProcessInput();
}
initializeApiPage();
