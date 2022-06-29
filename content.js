(() =>{
    // If it is set to a detailed match on the manifest, it sometimes fails, so the exception is handled like this...
    if(window.name !== 'cafe_main') return;

    try{
        let _done = false;
        // If it is the main site, change the browser address the global variable Cafe address url. 'g_sCafeHome'
        if(document.location.href.includes('cafe.naver.com/MyCafeIntro.nhn')){
            document.documentElement.setAttribute('onreset', 'window.parent.history.replaceState(null, null, g_sCafeHome);');
            document.documentElement.dispatchEvent(new CustomEvent('reset'));
            document.documentElement.removeAttribute('onreset');
            return;
        }

        // Change the browser address to the current main content url.
        setTimeout(() =>{
            if(!_done){
                window.parent.history.replaceState(null, null, document.location.href);
            }
        }, 500);

        // If it is a post, change it to a clearer address url.
        $(document).arrive('a#spiButton.naver-splugin',  {
            existing: true
        },function(spiBtn){
            const lastCafeMainUrl = spiBtn.getAttribute('data-url');
            if(lastCafeMainUrl != null){
                window.parent.history.replaceState(null, null, lastCafeMainUrl);
                _done = true;
            }
        });
    }
    catch(e){
        console.log("error: ", e);
    }
})();