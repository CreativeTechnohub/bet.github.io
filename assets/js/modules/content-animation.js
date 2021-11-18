class ContentAnimation {

    constructor(isMobile, scroller ) {
        this.$isMobile = isMobile;
        this.$windowWidth = window.innerWidth;
        this.$scroller = scroller;
        this.$homeSlider;
        if( document.getElementById("home-slider") ) {
            this.$homeSlider = new Slider("home-slider");
        }

        this.bindEvent();


    }
    bindEvent() {
        window.addEventListener("blur", ()=>{
            this.videoControl("pause");
        });
        window.addEventListener("focus", ()=>{
            this.videoControl("play");
        });



    }
    init() {
        this.contentOnScrollLoad();
        this.splitTextInit();
        this.videoControl("play");
    }
    resize() {


    }


    kill() {
        ScrollTrigger.getAll().forEach(st => st.kill());
        document.querySelectorAll(".active-animation").forEach( el => el.classList.remove("active-animation") );



    }

    splitTextInit() {

        let splitTexts = document.querySelectorAll(".split-text");
        if(!this.$isMobile) {
            splitTexts.forEach((el)=>{
                // if(!el.classList.contains("split-text-active")) {

                let elementSplitText = new SplitText(el);
                ScrollTrigger.create({
                    trigger: el,
                    scroller: "#js-scroll",
                    start: "center bottom",
                    end: "center top",
                    onEnter: (self) => {

                        elementSplitText.splitTextAnimation();
                    },
                    onLeave: (self) => {
                        // if(!this.$isMobile)
                        elementSplitText.resetSplitTextAnimation();


                    }
                });
                // }

            });
        } else {
            splitTexts.forEach((el)=>{
                // if(!el.classList.contains("split-text-active")) {

                let elementSplitText = new SplitText(el);
                ScrollTrigger.create({
                    trigger: el,
                    scroller: "main",
                    start: "center bottom",
                    end: "center top",
                    onEnter: (self) => {

                        elementSplitText.splitTextAnimation();
                    },
                    onLeave: (self) => {
                        // if(!this.$isMobile)
                        elementSplitText.resetSplitTextAnimation();


                    }
                });
                // }




            });
        }

    }
    videoControl(status) {
        let videos = document.querySelectorAll("video");
        if(status === 'play') {
            videos.forEach((video)=>{
                if(video.classList.contains("inview")) {
                    video.play();
                }

            });
        } else if(status === 'pause') {
            videos.forEach((video)=>{
                video.pause();
            });
        }

    }
    contentOnScrollLoad() {
        let videos = document.querySelectorAll("video");
        if(!this.$isMobile) {
            videos.forEach((el) => {

                ScrollTrigger.create({
                    trigger: el,
                    scroller: "#js-scroll",
                    start: "top top",
                    end: "center top",
                    onEnter: (self) => {
                        self.trigger.play();
                        self.trigger.classList.add("inview");
                    },
                    onLeaveBack: (self) => {
                        self.trigger.play();
                        self.trigger.classList.add("inview");
                    },
                    onLeave: (self) => {
                        self.trigger.pause();
                        self.trigger.classList.remove("inview");

                    }
                });
            });
        } else {
            videos.forEach((el) => {

                ScrollTrigger.create({
                    trigger: el,
                    scroller: "main",
                    start: "top top",
                    end: "center top",
                    onEnter: (self) => {
                        self.trigger.play();
                        self.trigger.classList.add("inview");
                    },
                    onLeaveBack: (self) => {
                        self.trigger.play();
                        self.trigger.classList.add("inview");
                    },
                    onLeave: (self) => {
                        self.trigger.pause();
                        self.trigger.classList.remove("inview");

                    }
                });
            });
        }

        let rails = document.querySelectorAll(".rail-text");
        rails.forEach((rail)=>{
            let direction = rail.dataset.railDirection;
            let duration = rail.dataset.railDuration;
            new RailContent(rail,this.$scroller, direction, duration);
        });


        let intersectionOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0,0.4,0.8,1],
        }



        /* other content observer */
        let observer = new IntersectionObserver((entries, observer)=>{

            entries.forEach(entry => {

                let el = entry.target;


                if(entry.isIntersecting &&  (  entry.intersectionRatio >= 0.4) ) {

                    if(el.classList.contains("active-animation")) {
                        return false;
                    }


                    if( el.classList.contains("content-block-2") ||
                        el.classList.contains("content-block-3") ||
                        el.classList.contains("content-block-4") ||
                        el.classList.contains("input")
                    ) {
                        gsap.to(el, {
                            duration:1,
                            scale:1,
                            y:0,
                            opacity:1,
                            force3D:true,
                            ease: "power4.out",
                        });
                    }


                    if(el.classList.contains("side-video")) {
                        gsap.to(el, {
                            duration: 2,
                            y:-100,
                            scale: 1,
                            opacity: 1,
                            force3D: true,
                            delay:0.4,
                            ease: "back.out(2.5)",
                        });
                    }

                }
                else {





                }
                // observer.unobserve(entry.target);
            });

        }, intersectionOptions);
        let containers = document.querySelectorAll(".qa-animation");
        containers.forEach(container => {
            observer.observe(container);
        });





    }

    // popup
    openPopup(el) {

        let container = el.dataset.openPopup;
        // console.log(el.dataset.openPopup);
        gsap.to("body",{
            duration:0,
            position:'fixed',
            height: '100%',
            overflow: 'hidden',
        });

        let popupContainer = document.getElementById(el.dataset.openPopup);

        gsap.to(popupContainer, {
            duration:1,
            y:0,
            force3D: true,
            ease: "power4.inOut",
            delay:0,
        });

        let lines = popupContainer.querySelectorAll(".line");
        console.log(lines);
        gsap.to(lines[0], {
            duration:1,
            rotate: -45,
            y:8,
            force3D: true,
            ease:"expo.out",
            delay: 0.5,
        });

        gsap.to(lines[1], {
            duration:1,
            rotate: 45,
            y:-3,
            force3D: true,
            ease:"expo.out",
            delay: 0.5,
        });

    }
    closePopup(el) {

        let popupContainer =  el.closest(".popup-container");
        if(popupContainer.querySelector("video") !== null) popupContainer.querySelector("video").pause();
        gsap.to(popupContainer, {
            duration:1,
            y:"100%",
            force3D: true,
            ease: "power4.inOut",
            delay:0,
        });

        let lines = popupContainer.querySelectorAll(".line");

        gsap.to(lines[0], {
            duration:1,
            rotate: 0,
            y:0,
            force3D: true,
            ease:"expo.out",

        });

        gsap.to(lines[1], {
            duration:1,
            rotate: 0,
            y:0,
            force3D: true,
            ease:"expo.out",

        });

        gsap.to("body",{
            duration:0,
            position:'inherit',
            height: 'inherit',
            overflow: 'inherit',
        });

    }


    // accordion
    accordion(el) {
        let parent = el.closest(".accordion");
        let trigger = parent.querySelector(".trigger");
        if(parent.classList.contains("active-accordion")) {
            parent.classList.remove("active-accordion");

            if(parent.classList.contains("two-line")) {
                gsap.to(parent, {
                    duration:0.8,
                    height: '90px',
                    ease: "power4.inOut",
                    force3D: true,
                    onUpdate: ()=>{
                        document.dispatchEvent( new Event('updateScroll'));
                    }
                });
            } else {
                gsap.to(parent, {
                    duration:0.8,
                    height: '70px',
                    ease: "power4.inOut",
                    force3D: true,
                    onUpdate: ()=>{
                        document.dispatchEvent( new Event('updateScroll'));
                    }
                });
            }


            gsap.to(trigger,{
                duration:0.8,
                rotate:0,
                ease: "power4.inOut",
                force3D: true,
            });


            return;
        }

        gsap.to(parent, {
            duration:0.8,
            height:'auto',
            ease: "power4.inOut",
            force3D: true,
            onUpdate: ()=>{
                document.dispatchEvent( new Event('updateScroll'));
            }
        });

        gsap.to(trigger,{
            duration:0.8,
            rotate:180,
            ease: "power4.inOut",
            force3D: true,
        });

        parent.classList.add("active-accordion");
    }




}