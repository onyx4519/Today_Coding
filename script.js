// 현재 페이지에 해당하는 메뉴를 표시합니다.
const currentPage = document.body.dataset.page;
const currentNav = document.querySelector(`[data-nav="${currentPage}"]`);

if (currentNav) {
  currentNav.classList.add("active");
  currentNav.setAttribute("aria-current", "page");
}

// 작은 화면에서 메뉴를 열고 닫습니다.
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "닫기" : "메뉴";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "메뉴";
    });
  });
}

// 메인 페이지에서 태그 사이의 문구만 수정해 결과 화면에 반영합니다.
const runPreviewButton = document.getElementById("runPreview");
const editableCodeFields = document.querySelectorAll(".editable-code");
const mainPreviewFields = document.querySelectorAll(".editable-code[data-output]");
const resultCard = document.querySelector(".result-card");

editableCodeFields.forEach((field) => {
  field.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById(field.dataset.run)?.click();
    }
  });

  field.addEventListener("paste", (event) => {
    event.preventDefault();
    const plainText = event.clipboardData?.getData("text/plain") ?? "";
    document.execCommand("insertText", false, plainText.replace(/\r?\n/g, " "));
  });
});

if (runPreviewButton && resultCard) {
  runPreviewButton.addEventListener("click", () => {
    mainPreviewFields.forEach((field) => {
      const output = document.getElementById(field.dataset.output);
      const value = field.textContent.trim();
      if (output && value) output.textContent = value;
    });

    resultCard.classList.remove("updated");
    void resultCard.offsetWidth;
    resultCard.classList.add("updated");
    runPreviewButton.textContent = "UPDATED ✓";
    window.setTimeout(() => { runPreviewButton.textContent = "START →"; }, 1200);
  });
}

function animateExample(element) {
  if (!element) return;
  element.classList.remove("updated");
  void element.offsetWidth;
  element.classList.add("updated");
}

function showRunComplete(button) {
  button.textContent = "UPDATED ✓";
  window.setTimeout(() => { button.textContent = "START →"; }, 1200);
}

// HTML 학습 페이지: 태그 사이의 문구를 결과에 반영합니다.
const runHtmlButton = document.getElementById("runHtmlExample");
const htmlFields = document.querySelectorAll(".editable-code[data-html-output]");

if (runHtmlButton) {
  runHtmlButton.addEventListener("click", () => {
    htmlFields.forEach((field) => {
      const output = document.getElementById(field.dataset.htmlOutput);
      const value = field.textContent.trim();
      if (output && value) output.textContent = value;
    });
    animateExample(document.querySelector("#htmlPreviewTitle")?.closest(".example-output"));
    showRunComplete(runHtmlButton);
  });
}

// 자주 사용하는 태그: 마우스, 키보드, 터치로 자세한 사용법을 확인합니다.
const tagGuideData = {
  header: {
    title: "<header> 머리말",
    description: "페이지 전체 또는 특정 구역의 제목과 소개를 묶습니다. 페이지의 핵심 본문은 <main>에 작성합니다.",
    example: "<header>\n  <h1>사이트 이름</h1>\n  <p>사이트 소개</p>\n</header>",
  },
  nav: {
    title: "<nav> 주요 메뉴",
    description: "홈, 소개처럼 사용자가 자주 이동하는 주요 링크를 하나의 메뉴로 묶습니다.",
    example: "<nav>\n  <a href=\"index.html\">홈</a>\n  <a href=\"about.html\">소개</a>\n</nav>",
  },
  main: {
    title: "<main> 핵심 내용",
    description: "현재 페이지에서 가장 중요한 본문을 감쌉니다. 일반적으로 한 페이지에 한 번만 사용합니다.",
    example: "<main>\n  <h1>페이지 제목</h1>\n  <p>페이지의 핵심 내용</p>\n</main>",
  },
  section: {
    title: "<section> 내용 구역",
    description: "같은 주제의 제목과 내용을 하나의 구역으로 나눕니다. 구역의 의미를 알려주는 제목을 함께 작성하는 것이 좋습니다.",
    example: "<section>\n  <h2>좋아하는 것</h2>\n  <p>3D 프린팅을 좋아합니다.</p>\n</section>",
  },
  footer: {
    title: "<footer> 바닥글",
    description: "페이지나 구역의 끝에 저작권, 만든 사람, 추가 링크 같은 정보를 넣습니다.",
    example: "<footer>\n  <p>© 2026 나의 사이트</p>\n</footer>",
  },
  heading: {
    title: "<h1>~<h6> 제목",
    description: "h1이 가장 중요한 제목이고 숫자가 커질수록 하위 제목입니다. 글자 크기를 정하기보다 문서의 순서를 표현할 때 사용합니다.",
    example: "<h1>페이지 대표 제목</h1>\n<h2>첫 번째 구역 제목</h2>\n<h3>구역 안의 작은 제목</h3>",
  },
  p: {
    title: "<p> 문단",
    description: "서로 이어지는 문장을 하나의 문단으로 묶습니다. 새로운 주제로 넘어가면 새로운 <p>를 사용합니다.",
    example: "<p>하나의 주제를 설명하는 문단입니다.</p>",
  },
  strong: {
    title: "<strong> 중요한 내용",
    description: "문장 안에서 의미상 중요한 부분을 강조합니다. 단순히 굵게 꾸미는 목적이라면 CSS를 사용합니다.",
    example: "<p>여기서 <strong>중요한 내용</strong>을 확인하세요.</p>",
  },
  br: {
    title: "<br> 줄바꿈",
    description: "주소나 짧은 문장처럼 같은 문단 안에서 줄만 바꿀 때 사용합니다. 닫는 태그는 작성하지 않습니다.",
    example: "<p>서울특별시 종로구<br>나의 웹페이지 교실</p>",
  },
  hr: {
    title: "<hr> 주제 구분선",
    description: "내용의 주제가 바뀌는 지점을 구분합니다. 단순히 꾸미기 위한 선보다 내용의 흐름을 나눌 때 사용하며 닫는 태그는 없습니다.",
    example: "<h2>첫 번째 주제</h2>\n<p>첫 번째 내용</p>\n<hr>\n<h2>두 번째 주제</h2>\n<p>두 번째 내용</p>",
  },
  a: {
    title: "<a> 링크",
    description: "href 속성에 이동할 주소를 적고, 태그 사이에는 사용자가 이해할 수 있는 링크 이름을 씁니다.",
    example: "<a href=\"about.html\">소개 페이지로 이동</a>",
  },
  ul: {
    title: "<ul> 순서 없는 목록",
    description: "순서가 중요하지 않은 여러 항목을 묶습니다. 각 항목은 <li>로 작성합니다.",
    example: "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>",
  },
  ol: {
    title: "<ol> 순서 있는 목록",
    description: "학습 순서나 조리법처럼 앞뒤 순서가 중요한 항목을 묶습니다. 각 항목은 <li>로 작성합니다.",
    example: "<ol>\n  <li>파일 만들기</li>\n  <li>코드 작성하기</li>\n  <li>브라우저에서 확인하기</li>\n</ol>",
  },
  li: {
    title: "<li> 목록 항목",
    description: "목록의 항목 하나를 나타냅니다. 반드시 <ul> 또는 <ol> 안에 넣어 사용합니다.",
    example: "<ul>\n  <li>첫 번째 항목</li>\n  <li>두 번째 항목</li>\n</ul>",
  },
  img: {
    title: "<img> 이미지",
    description: "src에는 이미지 파일 경로를, alt에는 이미지를 볼 수 없을 때 전달할 설명을 적습니다. 닫는 태그는 없습니다.",
    example: "<img src=\"profile.jpg\" alt=\"내 프로필 사진\">",
  },
  button: {
    title: "<button> 버튼",
    description: "사용자가 눌러 동작을 실행하는 요소입니다. 일반 버튼은 type=\"button\"을 적어 의도하지 않은 제출을 막습니다.",
    example: "<button type=\"button\">시작하기</button>",
  },
  label: {
    title: "<label> 입력칸 이름",
    description: "어떤 값을 입력해야 하는지 설명합니다. for 값과 연결할 input의 id 값을 똑같이 작성합니다.",
    example: "<label for=\"name\">이름</label>\n<input id=\"name\" type=\"text\">",
  },
  input: {
    title: "<input> 입력칸",
    description: "사용자에게 값을 입력받습니다. 목적에 맞는 type과 고유한 id를 작성하며 닫는 태그는 사용하지 않습니다.",
    example: "<label for=\"email\">이메일</label>\n<input id=\"email\" type=\"email\">",
  },
};

const tagGuideButtons = document.querySelectorAll(".tag-reference-button");
const tagUsageTooltip = document.getElementById("tagUsageTooltip");
const tagTooltipTitle = document.getElementById("tagTooltipTitle");
const tagTooltipDescription = document.getElementById("tagTooltipDescription");
const tagTooltipExample = document.getElementById("tagTooltipExample");

if (tagGuideButtons.length && tagUsageTooltip && tagTooltipTitle && tagTooltipDescription && tagTooltipExample) {
  let hideTimer;
  let pinned = false;
  let activeButton = null;

  const hideTagGuide = () => {
    window.clearTimeout(hideTimer);
    tagUsageTooltip.hidden = true;
    pinned = false;
    activeButton = null;
  };

  const positionTagGuide = (button) => {
    const buttonBox = button.getBoundingClientRect();
    const tooltipBox = tagUsageTooltip.getBoundingClientRect();
    const gap = 10;
    const edge = 12;
    let left = buttonBox.left;
    let top = buttonBox.bottom + gap;

    if (top + tooltipBox.height > window.innerHeight - edge) {
      top = buttonBox.top - tooltipBox.height - gap;
    }

    tagUsageTooltip.style.left = `${Math.min(Math.max(edge, left), window.innerWidth - tooltipBox.width - edge)}px`;
    tagUsageTooltip.style.top = `${Math.max(edge, top)}px`;
  };

  const showTagGuide = (button, keepOpen = false) => {
    const guide = tagGuideData[button.dataset.tag];
    if (!guide) return;

    window.clearTimeout(hideTimer);
    activeButton = button;
    pinned = keepOpen;
    tagTooltipTitle.textContent = guide.title;
    tagTooltipDescription.textContent = guide.description;
    tagTooltipExample.textContent = guide.example;
    tagUsageTooltip.hidden = false;
    positionTagGuide(button);
  };

  const scheduleHideTagGuide = () => {
    if (!pinned) hideTimer = window.setTimeout(hideTagGuide, 140);
  };

  tagGuideButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => showTagGuide(button));
    button.addEventListener("mouseleave", scheduleHideTagGuide);
    button.addEventListener("focus", () => showTagGuide(button));
    button.addEventListener("blur", scheduleHideTagGuide);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (pinned && activeButton === button) {
        hideTagGuide();
      } else {
        showTagGuide(button, true);
      }
    });
  });

  tagUsageTooltip.addEventListener("mouseenter", () => window.clearTimeout(hideTimer));
  tagUsageTooltip.addEventListener("mouseleave", scheduleHideTagGuide);
  tagUsageTooltip.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("click", hideTagGuide);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideTagGuide();
  });
  window.addEventListener("resize", hideTagGuide);
  window.addEventListener("scroll", hideTagGuide);
}

// HTML 직접 작성 챕터: 입력한 태그를 안전한 미리보기 영역에 표시합니다.
const htmlChallengeCode = document.getElementById("htmlChallengeCode");
const checkHtmlChallenge = document.getElementById("checkHtmlChallenge");
const htmlChallengeStatus = document.getElementById("htmlChallengeStatus");
const htmlChallengeOutput = document.getElementById("htmlChallengeOutput");
const htmlChallengePreview = document.getElementById("htmlChallengePreview");

if (htmlChallengeCode && checkHtmlChallenge && htmlChallengeStatus && htmlChallengeOutput && htmlChallengePreview) {
  const renderChallenge = () => {
    const source = htmlChallengeCode.value.trim();

    if (!source) {
      htmlChallengeStatus.className = "challenge-status error";
      htmlChallengeStatus.textContent = "결과를 확인하려면 원하는 HTML 태그를 한 줄 이상 작성하세요.";
      htmlChallengeOutput.hidden = true;
      return;
    }

    const parsedDocument = new DOMParser().parseFromString(source, "text/html");
    parsedDocument.querySelectorAll("script, iframe, object, embed, base, meta, link").forEach((element) => element.remove());
    parsedDocument.querySelectorAll("*").forEach((element) => {
      [...element.attributes].forEach((attribute) => {
        const value = attribute.value.trim();
        if (attribute.name.toLowerCase().startsWith("on") || /^javascript:/i.test(value)) {
          element.removeAttribute(attribute.name);
        }
      });
    });

    const previewContent = parsedDocument.body.innerHTML;
    htmlChallengePreview.srcdoc = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 24px; color: #28222f; background: #fff; font-family: Arial, sans-serif; line-height: 1.6; }
    img { max-width: 100%; height: auto; }
    button, input { font: inherit; }
  </style>
</head>
<body>${previewContent}</body>
</html>`;

    htmlChallengeStatus.className = "challenge-status success";
    htmlChallengeStatus.textContent = "입력한 HTML 코드를 결과 화면에 표시했습니다.";
    htmlChallengeOutput.hidden = false;
    checkHtmlChallenge.textContent = "COMPLETE ✓";
    window.setTimeout(() => { checkHtmlChallenge.textContent = "START →"; }, 1400);
  };

  checkHtmlChallenge.addEventListener("click", renderChallenge);
  htmlChallengeCode.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "Enter") renderChallenge();
  });
}

// CSS 학습 페이지: 수정한 CSS 값을 해당 미리보기 요소에 반영합니다.
const runCssButton = document.getElementById("runCssExample");
const cssFields = document.querySelectorAll(".editable-code[data-css-property]");
const cssPreview = document.getElementById("cssPreview");

if (runCssButton && cssPreview) {
  runCssButton.addEventListener("click", () => {
    let hasInvalidValue = false;
    cssFields.forEach((field) => {
      const property = field.dataset.cssProperty;
      const value = field.textContent.trim();
      const target = document.getElementById(field.dataset.cssTarget) || cssPreview;
      const isSafeValue = property && CSS.supports(property, value) && !/url\s*\(|var\s*\(|image|expression/i.test(value);
      if (isSafeValue) {
        const styleProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        target.style[styleProperty] = value;
        field.classList.remove("invalid");
      } else {
        hasInvalidValue = true;
        field.classList.add("invalid");
      }
    });

    if (hasInvalidValue) {
      runCssButton.textContent = "값을 확인하세요";
      return;
    }
    animateExample(cssPreview.closest(".example-output"));
    showRunComplete(runCssButton);
  });
}

// JavaScript 학습 페이지: 따옴표 안의 문구를 실행 결과에 반영합니다.
const runJsButton = document.getElementById("runJsExample");
const jsResultCode = document.getElementById("jsResultCode");
const testMessage = document.getElementById("testMessage");

if (runJsButton && jsResultCode && testMessage) {
  runJsButton.addEventListener("click", () => {
    const value = jsResultCode.textContent.trim();
    if (value) testMessage.textContent = value;
    animateExample(testMessage.closest(".example-output"));
    showRunComplete(runJsButton);
  });
}

// 각 예제 코드의 COPY 버튼 기능입니다.
document.querySelectorAll(".copy-code").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.closest(".code-block")?.querySelector("code")?.textContent;
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      button.textContent = "COPIED";
      window.setTimeout(() => { button.textContent = "COPY"; }, 1600);
    } catch (error) {
      button.textContent = "복사 실패";
    }
  });
});
