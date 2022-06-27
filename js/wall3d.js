'use strict';

(function () {
    const stageElem = document.querySelector('.stage');
    const houseElem = document.querySelector('.house');
    const progressbar = document.querySelector('.progress-bar');
    const mousePos = { x: 0, y: 0 };

    // 전체 높이 - 현재 페이지 높이
    let maxScrollValue;

    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    window.addEventListener('scroll', function () {
        // 비율 계산
        const scrollPer =  pageYOffset / maxScrollValue;
        const zMove = scrollPer * 980 - 490;
        houseElem.style.transform = `translateZ(${zMove}vw)`;

        // progress bar
        progressbar.style.width = `${scrollPer * 100}%`
    });

    window.addEventListener('mousemove', function (e) {
        // 가공 : 마우스 위치 값을 -1, 1로 계산하기 쉽게 만들어서 페이지 중앙에 위치했을 때 원 점 0, 0으로 만들 수 있다.
        // (e.clientX / window.innerWidth) << 비율 계산 현재 마우스 위치 나누기 가로 위치값
        // 결국 공식이니 다른데 필요할 때 아래의 계산식 재사용
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;

        // Rotate X축 기준으로 회전을 시킬때는 마우스 position 상으로는 Y이고 Rotate Y축은 그 반대이다.
        // 곱하기 5 이유는 mousePos.x 기준으로 -1 부터 1의 값 중에 - 부터 0에 더 가까워지므로 범위가 작아 곱하기 5 더해서 폭을 더 넓게한다.
        stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
    });

    window.addEventListener('resize', resizeHandler);

    resizeHandler();
})();