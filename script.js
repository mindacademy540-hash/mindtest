const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });
sections.forEach(section => activeObserver.observe(section));

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `MIND Academy Registration Inquiry - ${data.get('name')}`;
  const body = [
    'Hello MIND Academy,',
    '',
    'I would like to ask about registration.',
    '',
    `Name: ${data.get('name')}`,
    `Contact: ${data.get('email')}`,
    `Interested in: ${data.get('interest')}`,
    data.get('message') ? `Message: ${data.get('message')}` : '',
    '',
    'Thank you.'
  ].filter(Boolean).join('\n');
  const mailto = `mailto:mindacademy540@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const feedback = document.getElementById('formFeedback');
  feedback.textContent = 'Opening your email app with the registration request filled in. Please review it and press Send to submit your request.';
  feedback.classList.add('show');
  window.location.href = mailto;
});

// Persisted appearance preference and bilingual interface.
const themeToggle = document.getElementById('themeToggle');
const languageToggle = document.getElementById('languageToggle');
const savedTheme = (() => { try { return localStorage.getItem('mind-theme'); } catch (_) { return null; } })();
if (savedTheme === 'dark') document.body.classList.add('dark-mode');
function updateThemeButton() {
  const dark = document.body.classList.contains('dark-mode');
  themeToggle.innerHTML = dark ? '☀ <span data-i18n="darkMode">Light mode</span>' : '☾ <span data-i18n="darkMode">Dark mode</span>';
  themeToggle.setAttribute('aria-label', dark ? 'Enable light mode' : 'Enable dark mode');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.content = dark ? '#101827' : '#17243d';
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  try { localStorage.setItem('mind-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light'); } catch (_) {}
  updateThemeButton();
});

const translations = {
  en: {
    nav:['Home','About Us','Courses','Projects','Contact'], join:'Join us', dark:'Dark mode', light:'Light mode',
    eyebrow:'THE FUTURE STARTS WITH YOU', heroTitle:'Think bigger.<br>Build <span class="gradient-text">what\'s next.</span>', heroLead:'Technology education is the foundation of tomorrow’s innovation. Start turning your curiosity into skills, and your ideas into reality.', explore:'Explore our courses', discover:'Discover MIND', learnDoing:'Learn by doing.', proof:'Real skills. Creative thinking. Practical projects.', chipAI:'Artificial Intelligence', imagine:'Imagine what’s possible', codeIdeas:'Code your ideas', learnBuild:'Learn. Build. Repeat.',
    aboutKicker:'A LITTLE ABOUT US', aboutTitle:'Not just learning technology.<br><span class="gradient-text">Learning to shape it.</span>', aboutLead:'At MIND, we help learners move beyond simply using technology to understanding it, building with it, and shaping the future through it.',
    aboutCards:[['Our Story','We believe every curious mind deserves the opportunity to explore technology. MIND turns that belief into an engaging, hands-on learning experience.'],['Our Mission','Make technology education accessible, engaging, and meaningful through practical learning, interactive projects, and clear learning paths.'],['Our Vision','Help the next generation grow into confident problem-solvers and creative builders who can turn ideas into useful solutions.']],
    courseKicker:'FIND YOUR PATH', courseTitle:'Skills for a <span class="gradient-text">digital world.</span>', courseLead:'Start with the fundamentals, explore what excites you, and build something of your own.',
    courses:[['Programming Fundamentals','Build a strong foundation in logic, computational thinking, and writing your first programs.'],['Artificial Intelligence','Explore AI concepts and discover how intelligent systems can solve real-world problems.'],['Web Development','Design and develop responsive websites with modern, responsive front-end interfaces.'],['Scratch & App Inventor','Learn programming concepts through visual coding, interactive stories, and simple apps.'],['Mobile App Development','Move from an idea to an app concept, learning how mobile experiences are designed and built.'],['Data Structures & Algorithms','Understand how programs organize information and solve problems efficiently.']], ask:'Ask about this path', note:'Learning by building is at the heart of MIND.', noteText:'Courses include practical exercises, creative challenges, and projects that help bring concepts to life.',
    projectsKicker:'MADE BY CURIOUS MINDS', projectsTitle:'Big ideas are<br>under construction.', projectsText:'Our student projects and success stories are coming soon. This is where learning turns into something real.', showcase:'STUDENT SHOWCASE — COMING SOON',
    contactKicker:'YOUR NEXT CHAPTER', contactTitle:'Ready to build<br><span class="gradient-text">something meaningful?</span>', contactText:'Tell us what you want to learn. Get in touch to ask about courses, learning paths, and registration.', emailLabel:'EMAIL', phoneLabel:'PHONE / WHATSAPP', formTitle:'Let’s start a conversation.', formLead:'Fill in the details and we’ll help you find your path.', name:'Your name', namePlaceholder:'What should we call you?', contact:'Email or phone number', contactPlaceholder:'How can we reach you?', interest:'What are you interested in?', choose:'Choose a learning path', message:'Anything you’d like us to know?', optional:'(optional)', messagePlaceholder:'Tell us about your goals...', submit:'Prepare registration message', formHint:'This demo prepares a message for you to copy. No information is sent or stored.',
    interests:['Programming Fundamentals / C++','Artificial Intelligence','Web Development','Scratch & App Inventor','Mobile App Development','Data Structures & Algorithms','I’m not sure yet'], tagline:'Build Skills. Shape the Future.', backTop:'Back to top ↑', copyright:'All rights reserved.', built:'Built for curious minds', feedback:'Your email app should open with the registration details. Review the message and press Send to submit your request.'
  },
  ar: {
    nav:['الرئيسية','من نحن','الكورسات','المشروعات','تواصل معنا'], join:'انضم إلينا', dark:'الوضع الداكن', light:'الوضع الفاتح',
    eyebrow:'المستقبل يبدأ معك', heroTitle:'فكّر بشكل أكبر.<br>وابنِ <span class="gradient-text">ما هو قادم.</span>', heroLead:'تعليم التكنولوجيا هو أساس ابتكارات الغد. حوّل فضولك إلى مهارات، وأفكارك إلى واقع.', explore:'استكشف الكورسات', discover:'اكتشف MIND', learnDoing:'التعلّم بالتطبيق.', proof:'مهارات حقيقية. تفكير إبداعي. مشروعات عملية.', chipAI:'الذكاء الاصطناعي', imagine:'تخيّل ما يمكنك تحقيقه', codeIdeas:'حوّل أفكارك إلى كود', learnBuild:'تعلّم. ابنِ. كرّر.',
    aboutKicker:'نبذة عنّا', aboutTitle:'لسنا هنا لتعلّم التكنولوجيا فقط.<br><span class="gradient-text">بل لتشكيل مستقبلها.</span>', aboutLead:'في MIND، نساعد المتعلمين على تجاوز استخدام التكنولوجيا إلى فهمها والبناء بها والمساهمة في تشكيل المستقبل.',
    aboutCards:[['قصتنا','نؤمن أن كل عقل فضولي يستحق فرصة لاستكشاف التكنولوجيا. نحول هذه الفكرة إلى تجربة تعليمية ممتعة وعملية.'],['رسالتنا','جعل تعليم التكنولوجيا متاحًا وممتعًا وهادفًا من خلال التطبيق والمشروعات التفاعلية والمسارات التعليمية الواضحة.'],['رؤيتنا','مساعدة الجيل القادم على أن يصبح قادرًا على حل المشكلات والإبداع وبناء حلول مفيدة انطلاقًا من أفكاره.']],
    courseKicker:'اختر مسارك', courseTitle:'مهارات لعالم <span class="gradient-text">رقمي.</span>', courseLead:'ابدأ بالأساسيات، واكتشف ما يثير شغفك، ثم ابنِ شيئًا من صنعك.',
    courses:[['أساسيات البرمجة','كوّن أساسًا قويًا في المنطق والتفكير الحاسوبي وكتابة برامجك الأولى.'],['الذكاء الاصطناعي','اكتشف مفاهيم الذكاء الاصطناعي وكيف تساعد الأنظمة الذكية في حل مشكلات واقعية.'],['تطوير الويب','صمّم وطوّر مواقع متجاوبة باستخدام تقنيات الواجهات الأمامية الحديثة.'],['Scratch وApp Inventor','تعلّم مفاهيم البرمجة من خلال البرمجة المرئية والقصص التفاعلية والتطبيقات البسيطة.'],['تطوير تطبيقات الموبايل','حوّل فكرتك إلى تصور لتطبيق، وتعرّف على كيفية تصميم تجارب الهاتف وبنائها.'],['هياكل البيانات والخوارزميات','افهم كيف تنظم البرامج البيانات وكيف تحل المشكلات بكفاءة.']], ask:'استفسر عن المسار', note:'التعلّم بالبناء في قلب تجربة MIND.', noteText:'تتضمن الكورسات تدريبات عملية وتحديات إبداعية ومشروعات لتحويل المفاهيم إلى تطبيقات واقعية.',
    projectsKicker:'إبداعات عقول فضولية', projectsTitle:'أفكار كبيرة<br>نعمل على تنفيذها.', projectsText:'ستُعرض قريبًا مشروعات الطلاب وقصص نجاحهم. هنا يتحول التعلّم إلى شيء حقيقي.', showcase:'معرض مشروعات الطلاب — قريبًا',
    contactKicker:'خطوتك القادمة', contactTitle:'هل أنت مستعد لبناء<br><span class="gradient-text">شيء له معنى؟</span>', contactText:'أخبرنا بما تريد تعلّمه. تواصل معنا للاستفسار عن الكورسات والمسارات التعليمية والتسجيل.', emailLabel:'البريد الإلكتروني', phoneLabel:'الهاتف / واتساب', formTitle:'لنبدأ الحديث.', formLead:'املأ البيانات وسنساعدك في اختيار المسار المناسب.', name:'الاسم', namePlaceholder:'ما اسمك؟', contact:'البريد الإلكتروني أو رقم الهاتف', contactPlaceholder:'كيف يمكننا التواصل معك؟', interest:'ما المجال الذي تهتم به؟', choose:'اختر مسارًا تعليميًا', message:'هل هناك شيء آخر تريد إخبارنا به؟', optional:'(اختياري)', messagePlaceholder:'أخبرنا عن أهدافك...', submit:'تجهيز رسالة التسجيل', formHint:'هذا النموذج يجهّز رسالة يمكنك مراجعتها وإرسالها بنفسك. لا يتم إرسال البيانات أو تخزينها تلقائيًا.',
    interests:['أساسيات البرمجة / C++','الذكاء الاصطناعي','تطوير الويب','Scratch وApp Inventor','تطوير تطبيقات الموبايل','هياكل البيانات والخوارزميات','لم أحدد بعد'], tagline:'ابنِ مهاراتك. شكّل المستقبل.', backTop:'العودة للأعلى ↑', copyright:'جميع الحقوق محفوظة.', built:'صُنع للعقول الفضولية', feedback:'من المفترض أن يفتح تطبيق البريد برسالة التسجيل جاهزة. راجع الرسالة واضغط إرسال لإتمام الطلب.'
  }
};
function setLanguage(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  languageToggle.textContent = lang === 'ar' ? 'English' : 'العربية';
  languageToggle.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  document.querySelectorAll('#navLinks > a[href^="#"]').forEach((a, i) => { if (i < t.nav.length) a.textContent = t.nav[i]; });
  document.querySelector('.nav-cta').innerHTML = `${t.join} <span>↗</span>`;
  document.querySelector('.eyebrow').innerHTML = `<span class="pulse"></span> ${t.eyebrow}`;
  document.querySelector('.hero-copy h1').innerHTML = t.heroTitle;
  document.querySelector('.hero-lead').textContent = t.heroLead;
  document.querySelector('.hero-actions .primary').innerHTML = `${t.explore} <span>→</span>`;
  document.querySelector('.hero-actions .secondary').innerHTML = `<span class="play">▶</span> ${t.discover}`;
  document.querySelector('.hero-proof p').innerHTML = `<strong>${t.learnDoing}</strong><br><small>${t.proof}</small>`;
  const chips = document.querySelectorAll('.float-chip'); chips[0].querySelector('strong').textContent=t.chipAI; chips[0].querySelector('small').textContent=t.imagine; chips[1].querySelector('strong').textContent=t.codeIdeas; chips[1].querySelector('small').textContent=t.learnBuild;
  document.querySelector('.section-heading .section-kicker').textContent=t.aboutKicker; document.querySelector('.section-heading h2').innerHTML=t.aboutTitle; document.querySelector('.section-heading>p').textContent=t.aboutLead;
  document.querySelectorAll('.about-card').forEach((card,i)=>{card.querySelector('h3').textContent=t.aboutCards[i][0];card.querySelector('p').textContent=t.aboutCards[i][1];});
  document.querySelector('.section-top .section-kicker').textContent=t.courseKicker; document.querySelector('.section-top h2').innerHTML=t.courseTitle; document.querySelector('.section-top>p').textContent=t.courseLead;
  document.querySelectorAll('.course-card').forEach((card,i)=>{card.querySelector('h3').textContent=t.courses[i][0];card.querySelector(':scope > p').textContent=t.courses[i][1];card.querySelector('.course-link').innerHTML=`${t.ask} <span>↗</span>`;});
  document.querySelector('.courses-note strong').textContent=t.note; document.querySelector('.courses-note p').lastChild.textContent=' '+t.noteText;
  document.querySelector('.projects-content .section-kicker').textContent=t.projectsKicker; document.querySelector('.projects-content h2').innerHTML=t.projectsTitle; document.querySelector('.projects-content p').textContent=t.projectsText; document.querySelector('.coming-soon').innerHTML=`<span></span> ${t.showcase}`;
  document.querySelector('.contact-copy .section-kicker').textContent=t.contactKicker; document.querySelector('.contact-copy h2').innerHTML=t.contactTitle; document.querySelector('.contact-copy>p').textContent=t.contactText;
  const details=document.querySelectorAll('.contact-detail small'); details[0].textContent=t.emailLabel; details[1].textContent=t.phoneLabel;
  const form=document.getElementById('contactForm'); form.querySelector('h3').textContent=t.formTitle; form.querySelector(':scope > p').textContent=t.formLead;
  const labels=form.querySelectorAll('label'); labels[0].textContent=t.name; labels[1].textContent=t.contact; labels[2].textContent=t.interest; labels[3].innerHTML=`${t.message} <span>${t.optional}</span>`;
  form.querySelector('#name').placeholder=t.namePlaceholder; form.querySelector('#email').placeholder=t.contactPlaceholder; form.querySelector('#interest option[value=""]').textContent=t.choose; form.querySelector('#message').placeholder=t.messagePlaceholder;
  [...form.querySelector('#interest').options].slice(1).forEach((option,i)=>option.textContent=t.interests[i]);
  form.querySelector('.submit-button').innerHTML=`${t.submit} <span>→</span>`; form.querySelector('.form-hint').textContent=t.formHint;
  document.querySelector('.footer-main>p').textContent=t.tagline; document.querySelector('.back-top').textContent=t.backTop; document.querySelector('.footer-bottom>span:first-child').innerHTML=`© <span id="year">${new Date().getFullYear()}</span> MIND Academy. ${t.copyright}`; document.querySelector('.footer-bottom>span:last-child').innerHTML=`${t.built} <b>✦</b>`;
  updateThemeButton();
  try { localStorage.setItem('mind-language', lang); } catch (_) {}
}
languageToggle.addEventListener('click', () => setLanguage(document.documentElement.lang === 'en' ? 'ar' : 'en'));
let savedLanguage = 'en'; try { savedLanguage = localStorage.getItem('mind-language') || 'en'; } catch (_) {}
setLanguage(savedLanguage);
