const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() { //gsap to create animation for navbar
    var tl = gsap.timeline();

    tl.from('#nav', {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
}
firstPageAnim();


function circleSkew() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener('mousemove', function (dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);
        // console.log(xdiff, ydiff)
        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(function () {
            this.document.querySelector('#miniCircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100)
    });
}
var timeout;
circleSkew();

function circleMouseFollower(xscale, yscale) {
    window.addEventListener('mousemove', function (dets) {
        this.document.querySelector('#miniCircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}
circleMouseFollower();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffRot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        // var diffBottom = dets.clientY - elem.getBoundingClientRect().bottom;

        diffRot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            // bottom: diffBottom,
            rotate: gsap.utils.clamp(-20, 20, diffRot * 5),

        });
    });
});
let time = document.getElementById("current-time");
setInterval(() => {
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();
    
})
