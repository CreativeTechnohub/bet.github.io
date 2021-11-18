
class PageAnimation  {

    constructor(isMobile, scrollbar) {

        this.$logo;
        this.$defaultWindowSize = window.innerWidth;

        this.$navController = document.querySelectorAll(".header .nav-control .line");
        this.$header = document.querySelector(".header");
        this.$nav = document.querySelector(".nav-container .nav");
        this.$pageStatus = 'static';
        if(document.body.classList.contains("wp-website")) this.$pageStatus = 'wp';


        this.$navOnLoad = false;
        this.$navStillOpened = false;
        this.$navOnProgress = false;

        this.$doAjaxusedSlider = false;
        this.$doAjax = false;
        this.$doResize = false;
        this.$doAjaxImages = new Array();
        this.$doAjaxImagesTotal = 0;
        this.$doAjaxImagesCounter = 0;
        this.$svgLoader = false;


        this.$tempLink;

        this.$scrollbar = scrollbar;
        this.$pageLoadStatus = true;
        this.$imageLoadStatus = false;
        this.$hideLoaderStatus = false;

        this.$linkOnprogress = false;
        this.$onLoad = false;
        this.$openNav = false;
        this.$isContact = false;

        this.$imageCounter = 0;
        this.$imageTotal = 0;
        this.$images = new Array();

        this.$isPageLoaded = false;




        this.bindEvent();
        this.imageLoaderInit();
        this.$content = new ContentAnimation( isMobile , this.$scrollbar );

        // document.addEventListener("FirstPageLoaded", this.init.bind(this));

        // this.init();




    }
    init() {

    }
    isMobile(device) {
        if(device === true) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
                return true;
            }
            return false;

        }
        if ( window.innerWidth < 1200) {
            return true;
        }

        return false;
    }
    pushNotification(status, message) {
        let notify = document.querySelector(".notify");
        let content = notify.querySelector(".container");
        if(status = 'success') {
            content.classList.add("success");
        } else {
            content.classList.add("fail");
        }
        content.innerHTML = message;

        gsap.to(content, {
            duration:0.8,
            y: '-180% ',
            scale: 1,
            opacity:1,
            force3D: true,
            ease: "back.out(1.1)",
        });

        setTimeout(function () {
            gsap.to(content, {
                duration:1.5,
                y: '180%',
                opacity:0,
                scale: 0.5,
                force3D: true,
                ease: "back.out(1.1)",
            });
        },5000);


    }
    updateScroll() {
        this.$scrollbar.update();

    }

    bindEvent() {

        // resize
        window.addEventListener("resize", this.resize.bind(this));

        // page loader
        // window.document.addEventListener("readystatechange",(e)=>{
        //     if(document.readyState == 'complete') {
        //         this.$pageLoadStatus = true;
        //         this.checkPageLoaded();
        //     }
        // });
        document.querySelector(".popup-trigger").addEventListener("click", ()=>{
            this.$scrollbar.stop();
            gsap.to(".body-overlay", {
               duration:0,
                zIndex: 9999,
            });
           gsap.to(".body-overlay", {
              duration:0.4,
              opacity:1,
               force3D: true,
               ease: "power4.Out",
           });
           gsap.to(".popup-container", {
               duration:0.4,
               opacity:1,
               scale:1,
               delay:0.4,
               ease: "power4.Out",
           });
        });
        document.querySelector(".popup-container .close").addEventListener("click", ()=>{

            gsap.to(".popup-container", {
                duration:0.4,
                opacity:0,
                scale:0.8,
                ease: "power4.out",
            });
            gsap.to(".body-overlay", {
                duration:0.4,
                opacity:0,
                delay:0.4,
                force3D: true,
                ease: "power4.out",
            });

            gsap.to(".body-overlay", {
                delay:0.8,
                duration:0,
                zIndex: -1,
                onComplete: ()=>{
                    this.$scrollbar.start();
                }
            });
        });
        document.addEventListener("imageLoaderProgress", this.imageLoaderCheckProcess.bind(this));
        document.addEventListener("imageLoaderProgressDone", this.checkPageLoaded.bind(this));
        document.addEventListener("pageLoaded", this.showPage.bind(this));
        document.addEventListener("updateScroll", this.updateScroll.bind(this));
        // ! page loader

        document.querySelectorAll(".goExchange").forEach((link)=>{
            link.addEventListener("click", ()=> {
                this.$scrollbar.scrollTo(document.getElementById("exchangs"));
            });
        });
        document.querySelectorAll(".goTerms").forEach((link)=>{
            link.addEventListener("click", ()=> {
                this.$scrollbar.scrollTo(document.getElementById("terms"));
            });
        });
        document.querySelectorAll(".goContact").forEach((link)=>{
            link.addEventListener("click", ()=> {
                this.$scrollbar.scrollTo(document.getElementById("contact"));
            });
        });






    }
    formChecker() {
        if(document.querySelector(".async-task") === null) return;
        document.querySelectorAll(".async-task").forEach((formObject) => {

            formObject.addEventListener('submit', (event)=> {
                event.preventDefault();
                // event.stopPropagation();
                formObject.querySelector("button").setAttribute("disabled","");
                formObject.querySelector("button").classList.add("disable-button");
                let result =  fetch(formObject.getAttribute("action"), {
                    method: formObject.getAttribute("method").toUpperCase(),
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    redirect: "follow",
                    referrer: "no-referrer",
                    body: new FormData(formObject)
                })
                    .then((response) => response.text())
                    .then( (data)=> {

                        let result = JSON.parse(data);

                        formObject.querySelector("button").removeAttribute("disabled");
                        formObject.querySelector("button").classList.remove("disable-button");

                        if(result.status === 'message-error') {
                            this.pushNotification("fail", result.message);
                        } else if(result.status === 'message-success') {

                           formObject.reset();
                            this.pushNotification("success", result.message);
                        }

                    })
                    .catch((error)=>{
                        this.pushNotification("fail", "Something is wrong, Please try again.");
                        formObject.querySelector("button").removeAttribute("disabled");
                        formObject.querySelector("button").classList.remove("disable-button");
                    });



            });
        });
    }
    showHeader() {




        if(this.isMobile()) this.$logo = document.querySelector(".mobile-header .logo");
        else this.$logo = document.querySelector(".desktop-header .logo");




        gsap.to(this.$logo, {
            duration:1.5,
            y: 0,
            opacity:1,
            scale: 1,
            ease: "power3.out",
            force3D: true,
            delay:0.8
        });


        if(this.isMobile()) {

            // gsap.to(".mobile-header .membership-btn", {
            //     duration:1.5,
            //     y: 0,
            //     opacity:1,
            //     scale: 1,
            //     ease: "power3.out",
            //     force3D: true,
            //     delay:1,
            //     onComplete: ()=>{
            //         document.querySelector(".membership-btn").classList.add("membership-btn-active");
            //     }
            // });


            TweenMax.staggerTo(".mobile-header .nav-control .line",0.8, {
                y:0,
                opacity:1,
                ease: "power3.out",
                force3D: true,
                delay:1.3,
            }, 0.2);


        } else {
            // this.desktopShowNav();
        }



    }
    resize() {
        if(!document.querySelector(".page-loader").classList.contains("page-loader-done")) {
            gsap.to(".page-loader .logo", {
                x: (window.innerWidth / 2) - 29,
            });
        }
        if(  (this.$defaultWindowSize >= 1200 && window.innerWidth >= 1200) ) return;
        this.$doResize = true;
        this.$defaultWindowSize = window.innerWidth;



        this.$tempLink = window.location.href;
        document.dispatchEvent( new Event('doAjax'));


    }




    /*=================================================================================================================*/
    /* Page loader
    /*=================================================================================================================*/

    imageLoaderInit() {
        this.$scrollbar.stop();
        this.$images.push(document.querySelectorAll("video"));
        this.$imageTotal = this.$images[0].length;





        if(this.$imageTotal === 0 ) {
            this.$imageTotal = 1;
            this.$imageCounter++;
            this.imageLoaderCheckProcess();
            return;
        }

        this.imageLoaderProcess();
    }
    imageLoaderCheckProcess() {
        let percentage = this.$imageCounter * 100 / this.$imageTotal;
        let revercePercentage = 100 - percentage;



        gsap.to(".page-loader .overlay", {
            duration: 0.8,
            width: percentage + "%",
            x: revercePercentage / 2 + "vw",
            force3D: true,
            ease:  "power2.out",
            delay:0.2,
            onComplete: ()=> {
                if(this.$imageCounter === this.$imageTotal) {
                    this.$imageLoadStatus = true;
                    document.dispatchEvent( new Event('imageLoaderProgressDone'));
                }
            }
        });
    }
    imageLoaderProcess() {
        for(let i = 0; i < this.$imageTotal; i++) {


            let img = new Image();
            img.src = this.$images[0][i].src;

            img.addEventListener("load",()=>{
                this.$imageCounter++;
                document.dispatchEvent( new Event('imageLoaderProgress'));


            });
            img.addEventListener("error",()=>{
                this.$imageCounter++;
                document.dispatchEvent( new Event('imageLoaderProgress'));


            });


        }
    }
    checkPageLoaded() {
        if( this.$pageLoadStatus === true && this.$imageLoadStatus === true) {
            if(this.$hideLoaderStatus === false) this.hideLoader();
        }
    }
    hideLoader() {
        this.$hideLoaderStatus = true;



        gsap.to(".page-loader",{
            duration: 0.6,
            // x: "50%",
            zIndex: -1,
            opacity:0,
            ease: CustomEase.create("custom", "M0,0,C0.11,0.494,0.192,0.726,0.318,0.852,0.45,0.984,0.504,1,1,1"),
            force3D: true,
            onComplete: () =>{
                this.$scrollbar.start();
                document.dispatchEvent( new Event('pageLoaded'));
            }
        });



    }


    imageLoaderDoAjax() {

        let images =  document.querySelectorAll("img");

        if(images.length === 0) {
            document.dispatchEvent( new Event('doAjaxFinish'));
            return;
        }

        images.forEach( (image) =>{
            this.$doAjaxImages.push(image);
        });
        this.$doAjaxImagesTotal = this.$doAjaxImages.length;

        for(let i = 0; i < this.$doAjaxImagesTotal; i++) {


            let img = new Image();
            img.src = this.$doAjaxImages[i].src;

            img.addEventListener("load",()=>{
                this.$doAjaxImagesCounter++;
                this.imageLoaderDoAjaxCheckProgress();
            });
            img.addEventListener("error",()=>{
                this.$doAjaxImagesCounter++;
                this.imageLoaderDoAjaxCheckProgress();
            });


        }
    }
    imageLoaderDoAjaxCheckProgress() {

        if(this.$doAjaxImagesTotal === this.$doAjaxImagesCounter)  {
            this.$doAjaxImagesTotal = 0;
            this.$doAjaxImagesCounter = 0;
            document.dispatchEvent( new Event('doAjaxFinish'));
        }
    }


    /*=================================================================================================================*/
    /* initiate
    /*=================================================================================================================*/



    /*=================================================================================================================*/
    /* Animation
    /*=================================================================================================================*/
    showPage(status) {




        // if page does not load or page loader is not done it prevent to load content !
        if(status !== 'load')
            if(!this.$pageLoadStatus  || !this.$imageLoadStatus) return false;




        // this.$content.splitTextInit();
        this.$content.init();





        if(document.querySelector(".intro-container")) {
            this.intro();
        }
        if(document.querySelector(".heading-arrow")) {
            gsap.to(".heading-arrow", {
                duration:2,
                scale:1,
                opacity:1,
                y:0,
                // delay:0.8,
                ease: "power4.out",
                force3D: true
            });
            let introArrow = gsap.timeline({repeat: 20, yoyo: true, delay:1});
            introArrow.to(".heading-arrow", {
                duration: 1,
                y:-15,
                ease: "power4.out",
                force3D: true
            });
        }



        this.showHeader();
        this.formChecker();
        //
        // this.showHeader();


    }



    intro() {


        let texts = document.querySelectorAll(".intro-container .non-auto-split-text");
        texts.forEach((text)=>{
            new SplitText(text).splitTextAnimation();
        });

        gsap.to(".introduction-link", {
            duration:1,
            y:0,
            scale:1,
            opacity:1,
            force3D:true,
            ease: "power4.out",
            delay:0.6,
        });


        gsap.to(".helicopter", {
            duration: 2,
            y: 100,
            scale: 1,
            opacity: 1,
            force3D: true,
            delay:0.3,
            ease: "back.out(1.1)",
        });
        gsap.to(".header-t-black", {
            duration: 2,
            y:-100,
            scale: 1,
            opacity: 1,
            force3D: true,
            delay:0.4,
            ease: "back.out(2.5)",
        });
        gsap.to(".header-dollar-1", {
            duration: 2.5,
            y:100,
            scale: 1,
            opacity: 1,
            force3D: true,
            delay:0.6,
            ease: "back.out(1.5)",
        });
        gsap.to(".header-dollar-2", {
            duration: 2.5,
            y:100,
            scale: 1,
            opacity: 1,
            force3D: true,
            delay:0.6,
            ease: "back.out(1.5)",
        });
        gsap.to(".header-coin", {
            duration: 2.5,
            y:-60,
            scale: 1,
            opacity: 1,
            force3D: true,
            delay:0.5,
            ease: "back.out(2.5)",
        });
        gsap.to(".header", {
            duration:0.6,
            y:0,
            force3D:true,
            ease: "power4.Out",
            delay:1.2,
        });

    }




}