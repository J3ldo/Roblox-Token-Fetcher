let _token = "";
let _fullToken = "";

document.getElementById("copyToken").addEventListener("click", copyToken);

function copyToken(){
  navigator.clipboard.writeText(_token)
}

document.getElementById("copyFullToken").addEventListener("click", copyFullToken);

function copyFullToken(){
  navigator.clipboard.writeText(_fullToken)
}


function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}


getCookies("https://www.roblox.com", ".ROBLOSECURITY", function(token) {
    _token = token+";";
    document.getElementById("token").innerHTML = token;

    getCookies("https://www.roblox.com", "RBXSessionTracker", function(value) {
    _fullToken += "RBXSessionTracker="+value+";";

    getCookies("https://www.roblox.com", "__RequestVerificationToken", function(value) {
        _fullToken += "__RequestVerificationToken="+value+";";
        
        getCookies("https://www.roblox.com", ".RBXIDCHECK", function(value) {
            _fullToken += ".ROBLOSECURITY="+_token+".RBXIDCHECK="+value+";";

            document.getElementById("fullToken").innerHTML = _fullToken;
        });
    });
});
});