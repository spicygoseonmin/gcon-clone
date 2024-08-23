$(document).ready(function () {
    // 언어 토글================================
    $(".lang > a").on("click", function (e) {
      e.preventDefault();
      $(".country").toggle();
    });
    // gnb관련코드 바탕화면 =============================
    const gnb = $(".mainmenu");
    const dim = $(".header-dim");
    gnb.mouseenter(function () {
      dim.stop().fadeIn(200);
    });
    gnb.mouseleave(function () {
      dim.stop().fadeOut(200);
    });
    // 메뉴관련 코드 =========================
    const mainMenuLi = $(".mainmenu > li");
    const subMenu = $(".submenu");
    const subMenuLi = $(".submenu > li");
    const allDepth3 = $(".submenu-3rd");
    $.each(mainMenuLi, function (index, item) {
      $(this).mouseenter(function () {
        // 서브메뉴 보여줌
        $(this).find(".submenu").addClass("submenu_focus");
      });
      $(this).mouseleave(function () {
        // 서브메뉴 보여줌
        $(this).find(".submenu").removeClass("submenu_focus");
      });
    });
    // subMenuLi
    // 절대로 나올수 없는 값으로 설정해서 초기화에 사용
    // 이전에 선택된 버튼의 인덱스를 저장할 변수 선언
    let reIndex = -10000;
  
    $.each(subMenuLi, function (index, item) {
      // console.log(this);
  
      const aTag = $(this).find(" > a");
      // console.log(aTag);
      const depth3 = $(this).find(".submenu-3rd");
      // console.log(depth3);
  
      aTag.click(function (e) {
        e.preventDefault();
        // console.log(reIndex);
        // console.log(index);
        if (reIndex == index) {
          // 아무런 동작을 하지 않는다.
        } else {
          allDepth3.hide();
          reIndex = index;
        }
  
        // .submenu-3rd 보이게 한다.
        const nowDepth3 = depth3.css("display");
        if (nowDepth3 == "none") {
          depth3.show();
        } else {
          depth3.hide();
        }
      });
    });
    // ====================================
  });
  