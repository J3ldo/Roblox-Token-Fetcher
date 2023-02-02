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
			if (cookie == null){
				callback(null);
				return;
			}
            callback(cookie.value);
        }
    });
}


getCookies("https://www.roblox.com", ".ROBLOSECURITY", function(token) {
    _token = token+";";
    document.getElementById("token").innerHTML = token;

    getCookies("https://www.roblox.com", "RBXSessionTracker", function(value) {
    if (value != null) _fullToken += "RBXSessionTracker="+value+";";

    getCookies("https://www.roblox.com", "GuestData", function(value) {
        if (value != null) _fullToken += "GuestData="+value+";";
        
        getCookies("https://www.roblox.com", ".RBXIDCHECK", function(value) {
            if (value != null) _fullToken += ".ROBLOSECURITY="+_token+".RBXIDCHECK="+value+";";

            document.getElementById("fullToken").innerHTML = _fullToken;
        });
    });
});
});
