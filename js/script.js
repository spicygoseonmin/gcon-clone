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
  // header스크롤 적용
  const hTop = $(".header-top");
  const hTop_H = hTop.height();
  const hMiddle = $(".header-middle");
  const hMiddle_H = hMiddle.height();
  // console.log(hMiddle_H);

  // console.log( hTop_H );
  const hHeight = hTop_H + hMiddle_H;

  // fix기능 관련
  const fixA = $(".fix-a");
  $.each(fixA, function (index, item) {
    // console.log(index);
    $(this).click(function (e) {
      // e.preventDefault();
      fixA.removeClass("fix-a-focus");
      fixA.eq(index).addClass("fix-a-focus");
    });
  });

  $(window).scroll(function () {
    // 스크롤바의 위치값을 파악한다
    // 스크롤바의 위치값을 파악한다
    let scy = $(window).scrollTop();
    console.log(scy);

    if (scy >= 1194) {
      // 스크롤 위치가 1516px 이상일 때
      fixA.removeClass("fix-a-focus");
      fixA.eq(2).addClass("fix-a-focus");
    } else if (scy >= 571) {
      // 스크롤 위치가 861px 이상 1516px 미만일 때
      fixA.removeClass("fix-a-focus");
      fixA.eq(1).addClass("fix-a-focus");
    } else if (scy >= 0) {
      // 스크롤 위치가 0px 이상 861px 미만일 때
      fixA.removeClass("fix-a-focus");
      fixA.eq(0).addClass("fix-a-focus");
    }
    // 두 번째 기능: 스크롤 위치에 따라 header의 클래스 변경
    if (scy >= hHeight) {
      $(".header").addClass("h-fix");
      $(".logo-gnb").addClass("h-show");
      $(".gnb").addClass("h-fix-gnb");
      $(".gotop").addClass("gotop_focus");
    } else {
      $(".header").removeClass("h-fix");
      $(".logo-gnb").removeClass("h-show");
      $(".gnb").removeClass("h-fix-gnb");
      $(".gotop").removeClass("gotop_focus");
    }
  });

  // 위로가기 기능
  $(".gotop").click(function (e) {
    e.preventDefault();
    $("html").stop().animate(
      {
        scrollTop: 0,
      },
      600
    );
  });
  // swiper
  // content 슬라이드
  const sw_content = new Swiper(".sw-content", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    loopedSlides: 3,
  });
  const sw_navi = new Swiper(".sw-navi", {
    loop: true,
    slidesPerView: 3,
    navigation: {
      nextEl: ".sw-navi-next",
      prevEl: ".sw-navi-prev",
    },
    centeredSlides: true,
    loopedSlides: 3,
    slideToClickedSlide: true,
  });
  sw_content.controller.control = sw_navi;
  sw_navi.controller.control = sw_content;
  // sw-notice 슬라이드
  const sw_notice = new Swiper(".sw-notice", {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    loop: true,
    nested: true,
    navigation: {
      nextEl: ".sw-notice-next",
      prevEl: ".sw-notice-prev",
    },
    pagination: {
      el: ".sw-notice-pg",
      type: "fraction",
    },
  });
  $(".sw-notice-pause").click(function () {
    // swiper 가 중첩되어져서 처리를 함.
    for (var i = 0; i < sw_notice.length; i++) {
      sw_notice[i].autoplay.stop();
    }
    // sw_notice.autoplay.stop();
  });
  // 자동 재생 실행
  $(".sw-notice-play").click(function () {
    // swiper 가 중첩되어져서 처리를 함.
    for (var i = 0; i < sw_notice.length; i++) {
      sw_notice[i].autoplay.start();
    }
    // sw_notice.autoplay.start();
  });
  // 공지사항 목록 관련
  const noticeA = $(".notice-menu > li");
  $.each(noticeA, function (index, item) {
    // console.log(index,item);
    $(this)
      .find("a")
      .click(function (e) {
        e.preventDefault(); // href방지
        // 포커스 적용  - 탭내용을 보여준다.
        showNotice(index);
      });
  });
  // 내용 모음
  const noticeLi = $(".notice-cont > li");
  // notice내용을 보여주는 함수
  // 내용을 보여주고, 포커스를 이동하는
  // 사용자 지정 함수 : showNotice(인덱스)
  function showNotice(_index) {
    // console.log(_index);
    noticeA.removeClass("notice-menu-focus");
    noticeA.eq(_index).addClass("notice-menu-focus");
    noticeLi.hide();
    noticeLi.eq(_index).show();
  }
  // sw-edu swiper
  const sw_edu = new Swiper(".sw-edu", {
    autoplay: {
      delay: 2000,
      // 사용자가 터치드래그 하고 난 후 자동 실행
      disableOnInteraction: false,
    },
    loop: true,
    nested: true,
    navigation: {
      nextEl: ".sw-edu-next",
      prevEl: ".sw-edu-prev",
    },
    pagination: {
      el: ".sw-edu-pg",
      type: "fraction",
    },
  });
  // 알림 탭메뉴
  const alramA = $(".alram-tab-menu a");
  const alramCont = $(".alram-tab-cont");
  $.each(alramA, function (index, ietm) {
    $(this).click(function (e) {
      e.preventDefault();
      alramCont.removeClass("alram-tab-cont-focus");
      alramCont.eq(index).addClass("alram-tab-cont-focus");
      alramA.removeClass("alram-tab-menu-focus");
      alramA.eq(index).addClass("alram-tab-menu-focus");
    });
  });
  // hub메뉴기능
  const hubMenus = $(".hub-menu a");
  const hubInfos = $(".hub-info > li");
  $.each(hubMenus, function (index, item) {
    // console.log(this);
    $(this).mouseenter(function () {
      hubInfos.removeClass("hub-info-focus");
      hubInfos.eq(index).addClass("hub-info-focus");
    });
  });
  // sns기능
  const snsCate = $(".sns-cate li a");
  const snsCont = $(".sns-cont");
  snsCont.eq(0).show();
  $.each(snsCate, function (index, item) {
    $(this).click(function (e) {
      e.preventDefault();
      // 5번째 버튼은 임시로 처리한다.
      if (index == 4) {
        return;
      }
      snsCate.removeAttr("class");
      snsCate.eq(3).addClass("i-naver");
      snsCont.hide();
      if (index == 0) {
        $(this).addClass("icon-focus-fb");
        snsCont.eq(0).show();
      } else if (index == 1) {
        $(this).addClass("icon-focus-is");
        snsCont.eq(1).show();
      } else if (index == 2) {
        $(this).addClass("icon-focus-yt");
        snsCont.eq(2).show();
      } else if (index == 3) {
        $(this).addClass("icon-focus-nv");
        snsCont.eq(3).show();
      }
    });
  });
  // news-room
  const newsCate = $(".news-cate li a");
  let newsFocusNum = 0;
  const newsCont = $(".news-cont");
  newsCont.eq(newsFocusNum).show();
  $.each(newsCate, function (index, item) {
    $(this).click(function (e) {
      e.preventDefault();
      // 일단 모두 제거한다.
      newsCate.removeClass("news-focus");
      newsCate.eq(index).addClass("news-focus");
      newsCont.hide();
      newsFocusNum = index;
      newsCont.eq(newsFocusNum).show();
    });
    $(this).mouseenter(function () {
      $(this).addClass("news-focus");
    });
    $(this).mouseleave(function () {
      if (newsFocusNum == index) {
        return;
      }
      $(this).removeClass("news-focus");
    });
  });
  // footer펼침목록
  const linkListBt = $(".link-list-bt");
  const linkSiteWrap = $(".link-site-wrap");
  linkListBt.click(function (e) {
    e.preventDefault();
    linkSiteWrap.toggleClass("link-site-wrap-on");
  });
  // $("body").click(function(){
  //   linkSiteWrap.removeClass("link-site-wrap-on")
  // })
  // ====================================
});
