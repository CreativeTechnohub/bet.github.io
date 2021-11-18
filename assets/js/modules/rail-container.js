class RailContent {
    constructor(el,scroller,railDirection,speed) {
        this.$el = el;

        this.$scroller = scroller;
        this.$railDirection = railDirection;
        this.$duration = speed;

        this.$rail;
        this.$railElements;
        this.$railElement;
        this.$railPicture = false;




        // this.$active = true;
        // this.$railOnProgressLeft = false;
        // this.$railOnProgressRight = false;
        let railContainerOffsetWidth = 0;
        let item = this.$el.querySelector(".rail-container");
        let railContent = item.querySelector(".rail-content");
        if(railContent.classList.contains("rail-container-img")) {
            this.$railPicture = true;
            let images = railContent.querySelectorAll(".img-container");
            images.forEach((image)=>{

                railContainerOffsetWidth =  railContainerOffsetWidth +  parseInt(image.offsetWidth) ;

            });

            railContent.style.width = (parseInt(railContainerOffsetWidth))   + 'px';
        }



        this.setRail();

        if(this.$railDirection == 'right') this.railToRight();
        else if( this.$railDirection == 'left') this.railToLeft();






        this.bindEvent();
    }
    bindEvent() {
        let prevScroll = 0;
        let el = this.$el.querySelector(".rail-content");


        this.$el.addEventListener("mouseenter", ()=>{
            this.$rail.duration(this.$duration * 2);
        });
        this.$el.addEventListener("mouseleave", ()=>{
            this.$rail.duration(this.$duration);
        });

        window.addEventListener("blur", ()=>{
            this.$rail.pause();
        });

        window.addEventListener("focus", ()=>{
            this.$rail.play();
        });


        let intersectionOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0,1],
        };
        let observer = new IntersectionObserver((entries, observer)=>{

            if(entries[0].isIntersecting) {
                this.$rail.play();

            } else {
                this.$rail.pause();
            }
        }, intersectionOptions);
        observer.observe(this.$el);


    }
    setRail() {

        let item = this.$el.querySelector(".rail-container");

        item.insertAdjacentHTML('beforeend',   item.innerHTML );

        let railContent = item.querySelector(".rail-content");



        let singlePHTML = item.innerHTML;

        let  singleP = railContent.offsetWidth;
        let repeatCount = 0;
        if((window.innerWidth / singleP) > 2 ) {
            repeatCount = parseInt(window.innerWidth / singleP);
        }


        if(repeatCount !== 0) {
            for(let i= 0; i<repeatCount; i++) {

                item.insertAdjacentHTML('beforeend', singlePHTML );
            }
        }

        this.$railElements = this.$el.querySelectorAll(".rail-content");
        this.$railElement =  this.$el.querySelector(".rail-content");

        if(this.$railPicture) {
            if(this.$railDirection === 'right') {
                gsap.to(".rail-content", {
                    duration:0,
                    x: parseFloat(this.$railElement.offsetWidth) * parseInt(-1),
                });
            } else {
                gsap.to(".rail-content", {
                    duration:0,
                    x:0,
                });
            }

        }

    }
    railToLeft() {
        // this.$railDirection == 'left';
        let move = 0;
        if(this.$railPicture) {
            move = (parseFloat(this.$railElement.offsetWidth));
            console.log(this.$railElement.offsetWidth, "-------- 2");
        } else {
            move = (parseFloat(this.$railElement.offsetWidth) + parseInt(40));
        }

        this.$rail =  TweenMax.fromTo(this.$railElements,
            {
                x: 0,
            },
            {
                duration:this.$duration,
                x: "-=" + move + "px",
                ease:Linear.easeNone,
                force3D: true,
                repeat: -1,
            });
        this.$rail.play();

    }
    railToRight() {
        // this.$railDirection == 'right';
        let move = 0;
        if(this.$railPicture) {
            move = (parseFloat(this.$railElement.offsetWidth));
            console.log(this.$railElement.offsetWidth, "-------- 3");
        } else {
            move = (parseFloat(this.$railElement.offsetWidth) + parseInt(40));
        }


        this.$rail =  TweenMax.fromTo(this.$railElements,
            {
                x: (move) * parseInt(-1),
            },
            {
                duration:this.$duration,
                x: "+=" + move + "px",
                ease:Linear.easeNone,
                force3D: true,
                repeat: -1,
            });
        this.$rail.play();
    }

}