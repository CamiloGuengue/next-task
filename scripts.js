
document.addEventListener('DOMContentLoaded', function() {
   

    const splashScreen = document.getElementById('splashScreen');
    
    
    let isAnimating = false;

    
    splashScreen.addEventListener('click', function() {
        
        if (isAnimating) return;
        
       
        isAnimating = true;
        
        
        splashScreen.classList.add('slide-up');
        
        
        splashScreen.addEventListener('transitionend', function() {
            
            window.location.href = './index.html';
        }, { once: true }); 
    });
});

