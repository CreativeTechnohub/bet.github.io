class SplitText {
    constructor(el,direction,customDelay, duration, stagger) {
        this.$el = el;
        this.$direction = direction;
        this.$customDelay = customDelay ? customDelay : 0;
        this.$duration = duration;
        this.$stagger = stagger;

        this.$oldContent;

        if(this.$el.querySelector(".old-content") === null || this.$el.querySelector(".old-content") === undefined)  this.$oldContent = el.innerHTML;
        else  this.$oldContent = el.querySelector(".old-content").innerText;

    }


    isMobile() {
        if ((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)) ) && window.innerWidth < 1200) {
            return true;
        }

        return false;
    }

    splitTextAnimation(resetAfter) {

        let el = this.$el;

        if(this.isMobile() === true && el.classList.contains("mobile-see-more")) return;



        let direction = this.$direction;
        let doReset = false;
        if(resetAfter !== undefined) {
            doReset = resetAfter
        }


        if(direction === undefined) {
            direction = 'normal';
        }
        if(this.$duration === undefined) {
            this.$duration = el.dataset.splitDuration;
        }





        let stagger;
        if(parseFloat(this.$stagger) > 0) {
            stagger = this.$stagger;
        } else {
            stagger = (el.dataset.splitStagger ) / 2;
        }


        let letterClass = el.dataset.splitClass;
        if(this.$customDelay === 0)
            this.$customDelay =  el.dataset.splitDelay  ? el.dataset.splitDelay : 0;

        if(!el.classList.contains("split-text-active")) {
            let splitedText = acAnimated.Plugins.SplitText(el, {chars: 1});
            let words = el.querySelectorAll(".word");
            let count = 0;
            let wordCount = words.length;
            words.forEach((word)=>{
                count++;
                if(count < wordCount) word.insertAdjacentHTML('afterend',   ' ' );


                let chars =word.querySelectorAll("div");
                chars.forEach((ell) => {
                    ell.classList.add(letterClass);
                });
            });


            el.classList.add("split-text-active");
        }
        let chars = el.querySelectorAll("." + letterClass);

        if(direction == 'normal') {

            TweenMax.staggerTo(chars, this.$duration,
                {
                    y:0,
                    rotate:0,
                    // lineHeight: '1em',
                    opacity: 1,
                    ease: CustomEase.create("custom", "M0,0,C0.11,0.494,0.192,0.726,0.318,0.852,0.45,0.984,0.504,1,1,1"),
                    // ease: "power4.out",
                    force3D: true,
                    delay: this.$customDelay,





                }
                , stagger, ()=>{

                    if(el.querySelector(".old-content") === null || el.querySelector(".old-content") === undefined) el.insertAdjacentHTML("beforeend", '<div class="old-content">' + this.$oldContent + '</div>');


                }
            );
        }
        if(direction == 'reverseTop') {


            TweenMax.staggerTo(chars, this.$duration, {
                transform: " rotate3d(-1, 1, -1, -5deg )",
                y: "-150%",
                // lineHeight: '1em',
                opacity: 0,
                ease: CustomEase.create("custom", "M0,0,C0.11,0.494,0.192,0.726,0.318,0.852,0.45,0.984,0.504,1,1,1"),
                // ease: "power4.out",
                force3D: true,
                delay: this.$customDelay,


            }, stagger);
        }
        if(direction == 'reverseTopNormal') {


            TweenMax.staggerTo(chars, this.$duration, {
                y: "-100%",
                opacity: 0,
                ease: CustomEase.create("custom", "M0,0,C0.11,0.494,0.192,0.726,0.318,0.852,0.45,0.984,0.504,1,1,1"),
                // ease: "power4.out",
                force3D: true,
                delay: this.$customDelay,


            }, stagger);
        }
        if(direction == 'reverseTopNormalHalf') {


            TweenMax.staggerTo(chars, this.$duration, {
                y: "-50%",
                opacity: 0,
                ease: CustomEase.create("custom", "M0,0,C0.11,0.494,0.192,0.726,0.318,0.852,0.45,0.984,0.504,1,1,1"),
                // ease: "power4.out",
                force3D: true,
                delay: this.$customDelay,


            }, stagger);
        }






    }
    resetSplitTextAnimation() {



        if(this.$el.classList.contains("non-auto-split-text")) {
            this.$el.classList.remove("split-text-active");
            this.$el.innerHTML = '';
            this.$el.insertAdjacentHTML('beforeend',   this.$oldContent );
        }








    }

    resetAll() {
        let texts = document.querySelectorAll(".main-container .split-text-active");
        texts.forEach((text)=>{



            let oldContent = text.querySelector(".old-content");
            if(oldContent != null) {
                oldContent = oldContent.innerHTML;
                text.innerHTML = '';
                text.insertAdjacentHTML('beforeend',   oldContent );
            }

            // text.classList.remove("split-text-active");

        });


    }

}