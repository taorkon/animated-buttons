// Mouse Sensetive (Gradient) Fill On Hover

document.querySelectorAll('.type-7').forEach(function (button) {
    console.log(button);
    let circle = document.querySelector('.type-7-circle');

    console.log(circle);

    button.addEventListener('mouseenter', function (e) {
        console.log(circle);
        let parentOffset = button.getBoundingClientRect();

        let relX = e.clientX - parentOffset.left;
        let relY = e.clientY - parentOffset.top;


        circle.style.left = relX + 'px';
        circle.style.top = relY + 'px';
        circle.classList.remove('desplode-circle');
        circle.classList.add('explode-circle');
    });

    button.addEventListener('mouseleave', function (e) {
        console.log(circle);
        let parentOffset = button.getBoundingClientRect();

        let relX = e.clientX - parentOffset.left;
        let relY = e.clientY - parentOffset.top;

        circle.style.left = relX + 'px';
        circle.style.top = relY + 'px';
        circle.classList.remove('explode-circle');
        circle.classList.add('desplode-circle');
    });
});