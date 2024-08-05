export const connectWebViewJavascriptBridge = (callback) => {
    if(window.WebViewJavascriptBridge){
        callback(window.WebViewJavascriptBridge)
    }else{
        document.addEventListener('WebViewJavascriptBridge',
            function() {
                callback(window.WebViewJavascriptBridge)
            },
            false
        );
    };
};

export const callHandler = (handlerName, data, callback) =>{
    connectWebViewJavascriptBridge((bridge) =>{
        bridge.callHandler(handlerName, data, callback);
    });
};

export const registerHandler = (handlerName, callback) =>{
    connectWebViewJavascriptBridge((bridge) =>{
        bridge.registerHandler(handlerName, callback);
    });
};

