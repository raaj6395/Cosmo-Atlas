

gsap.from(".navbar",{
    y:-100,
    duration: 1.2,
    delay :0.8,
   // yoyo:true  //to fro motion but nor working

    // rotate : 180,
    // scale : 3.5
})
gsap.from(".Events",{
    x:-1500,
    duration: 1.2,
    delay :0.8,
    stagger:1   //one by one
    

    // rotate : 180,
    // scale : 3.5
})

// gsap.from(".Events_odd",{
//     x:1000,
//     duration: 1.2,
//     delay :0.8,
    
//     // rotate : 180,
//     // scale : 3.5
// })

// gsap.from(".navbar",{
//     delay :2,
//     y:-100,
//     duration: 1.2, 
//     // rotate : 180,
//     // scale : 3.5
// })

