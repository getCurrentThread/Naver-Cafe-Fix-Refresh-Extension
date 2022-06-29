(() =>{
    // If it is set to a detailed match on the manifest, it sometimes fails, so the exception is handled like this...
    if(window.name !== 'cafe_main') return;

    try{
        let _done = false;
        const url = document.location.href;
        // 1. If it is the main site, change the browser address the global variable Cafe address url. 'g_sCafeHome'
        if(url.includes('cafe.naver.com/MyCafeIntro.nhn')){
            document.documentElement.setAttribute('onreset', 'window.parent.history.replaceState(null, null, g_sCafeHome);');
            document.documentElement.dispatchEvent(new CustomEvent('reset'));
            document.documentElement.removeAttribute('onreset');
            return;
        }

        // 2. Change the browser address to the current main content url.
        if(!['ArticleRead.nhn', '/articles/'].some(x => url.includes(x))){
            window.parent.history.replaceState(null, null, url);
        }

        // 3. If it is a post, change it to a clearer address url.
        $(document).arrive('a#spiButton.naver-splugin',  {
            existing: true
        },function(spiBtn){
            const inUrl = spiBtn.getAttribute('data-url');
            if(inUrl != null){
                window.parent.history.replaceState(null, null, inUrl);
                _done = true;
            }
        });

        // 4. If some time has passed, it is assumed that the url is not a post.
        setTimeout(() => {
            if(!_done){
                window.parent.history.replaceState(null, null, url);
            }
        }, 500);
    }
    catch(e){
        console.log("error: ", e);
    }
})();