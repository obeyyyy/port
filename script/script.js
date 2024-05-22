window.onscroll = function() {
    const image = document.getElementById('imageAboutPage');
    const navbarBrand = document.querySelector('.navbar-brand');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      image.classList.add('shrink');
      document.querySelector('.navbar').classList.add('navbarDark');
    } else {
      image.classList.remove('shrink');
      document.querySelector('.navbar').classList.remove('navbarDark');
    }
  };

  // collapse navbar after click on small devices
  const navLinks = document.querySelectorAll('.nav-item');
  const menuToggle = document.getElementById('navbarSupportedContent');
  navLinks.forEach((l) => {
    l.addEventListener('click', () => { new bootstrap.Collapse(menuToggle).toggle() });
  });


document.addEventListener("DOMContentLoaded", function() {
    const follower = document.querySelector(".cursor-follower");
    let prevX = window.innerWidth / 2;
    let prevY = window.innerHeight / 2;

    // Update the position and rotation of the follower
    document.addEventListener("mousemove", function(e) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const degrees = radians * (180 / Math.PI) - 90; // Adjust for icon orientation

        follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(${degrees}deg)`;
    });

    // Shoot projectile on click
    document.addEventListener("click", function(e) {
        const projectile = document.createElement("i");
        projectile.classList.add("rocket-projectile", "fas", "fa-rocket"); // Add rocket icon class
        projectile.style.left = e.clientX + "px";
        projectile.style.top = e.clientY + "px";
        document.body.appendChild(projectile);

        // Get spaceship rotation angle
        const transform = window.getComputedStyle(follower).getPropertyValue("transform");
        const matrix = transform.match(/^matrix\((.+)\)$/);
        const spaceshipRotation = matrix ? Math.round(Math.atan2(matrix[1].split(", ")[1], matrix[1].split(", ")[0]) * (180/Math.PI)) : 0;

        // Calculate projectile velocity components
        const speed = 10; // Adjust projectile speed as needed
        const radians = (spaceshipRotation + 90) * (Math.PI / 180);
        const velX = speed * Math.cos(radians);
        const velY = speed * Math.sin(radians);

        // Move projectile in the calculated direction
        moveProjectile(projectile, velX, velY);
    });

    // Function to move projectile
    function moveProjectile(projectile, velX, velY) {
        const interval = setInterval(function() {
            const rect = projectile.getBoundingClientRect();
            const newX = rect.left + velX;
            const newY = rect.top + velY;

            // Remove projectile if it goes off-screen
            if (newX < 0 || newX > window.innerWidth || newY < 0 || newY > window.innerHeight) {
                clearInterval(interval);
                document.body.removeChild(projectile);
            } else {
                projectile.style.left = newX + "px";
                projectile.style.top = newY + "px";
            }
        }, 50);
    }
});
