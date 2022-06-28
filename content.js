(() =>{
    // If it is set to a detailed match on the manifest, it sometimes fails, so the exception is handled like this...
    if(window.name !== "cafe_main") return;

    try{
        // Change the browser address to the current main content url.
        window.parent.history.replaceState(null, null, document.location.href);

        // If there is a post, change it to a clearer address url.
        $(document).arrive('a#spiButton.naver-splugin',  {
            existing: true
        },function(spiBtn){
            const lastCafeMainUrl = spiBtn.getAttribute('data-url');
            if(lastCafeMainUrl != null){
                window.parent.history.replaceState(null, null, lastCafeMainUrl);
            }
        });
    }
    catch(e){
        console.log("error: ", e);
    }
})();