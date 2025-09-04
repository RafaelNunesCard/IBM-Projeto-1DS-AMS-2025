let lastScrollTop = 0;
    const header = document.getElementById("header");

    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            
            header.style.top = "-100px"; 
        } else {
            
            header.style.top = "0";
        }
        lastScrollTop = scrollTop;
    });