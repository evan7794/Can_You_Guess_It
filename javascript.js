document.getElementById('playButton').addEventListener('click', function() {
    const playIcon = this.querySelector('.play-icon');
    const playText = this.querySelector('.play-text');
    const container = document.querySelector('.thumbnail-container'); 

    
    playIcon.classList.add('loading'); 
    playText.classList.add('hidden'); 
    this.disabled = true; 

    
    const loadingDuration = 2000; 

    setTimeout(() => {

        container.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = "game.html"; 
        }, 500); 
    }, loadingDuration);
});
