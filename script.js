const sprite = document.getElementById("sprite");
const textElement = document.getElementById("text");
const textbox = document.getElementById("textbox");

const startButton = document.getElementById("startButton");
const titleScreen = document.getElementById("titleScreen");
const creditsScreen = document.getElementById("creditsScreen");
const fadeOverlay = document.getElementById("fadeOverlay");

startButton.addEventListener("click", () => {
  titleScreen.style.display = "none";
});

// === YOUR 6 FRAME SYSTEM ===
const frames = {
  open: {
    closed: "assets/open_closed.png",
    talk1: "assets/open_talk1.png",
    talk2: "assets/open_talk2.png"
  },
  blink: {
    closed: "assets/blink_closed.png",
    talk1: "assets/blink_talk1.png",
    talk2: "assets/blink_talk2.png"
  }
};

// === DIALOGUE FOR YOUR APPLICATION ===
const dialogue = [
    "Hi! I'm Nailat Taiyabah.",

    "I'm a Computer Science major at Johns Hopkins University, minoring in Computational Medicine.",

    "I see OpenSesame fitting into my long-term goals by giving me the opportunity to apply my technical skills in a real-world setting while contributing to projects that focus on the thoughtful use of AI.",

    "I have always been interested in exploring the intersection of technology and learning, especially how AI can be used to help others develop skills in a meaningful and supportive way.",

    "While also making sure that AI is used in ways that enhance human learning and growth rather than replacing critical thinking and reasoning.",

    "OpenSesame stands out to me because of its mission to make learning more accessible and impactful, and I am drawn to the idea of working on tools that support growth and education.",

    "I especially love OpenSesame's focus on using AI, but not at the expense of trust and human judgement, which is something that resonates with my own values and interests in responsible AI development.",

    "My strengths include being a quick learner who is always eager to take on new challenges and continuously improve my skills.",

    "This is demonstrated by my various projects and programming languages and frameworks I have experience with, as well as my ability to adapt to new technologies and concepts.",

    "I often learn new languages to better create projects that I am passionate about, and I am always looking for ways to expand my knowledge and expertise.",

    "I am also a strong communicator and collaborator, and I value working in team environments where ideas can be shared and refined to create better outcomes.",

    "Often I find when working in programming projects and spaces with others, the best way to achieve success is by relying on everyones skillset rather than just one person, and I am always happy to contribute my own skills while also learning from others.",

    "My interest in working with AI comes from my fascination with its potential to positively transform different industries, such as education and skill development, but also healthcare and medicine.",

    "I am particularly interested in understanding how AI can be used in ways that support learning without replacing critical thinking and reasoning, especially since AI as an upcoming technology might have significant negative impacts in terms of learning outcomes.",

    "But just as there could be negatives, there is as likely a chance that correct use of AI could have a significant positive impact on learning outcomes, and I want to be part of that positive change.",

    "Overall, I believe OpenSesame aligns closely with my goals of using technology and AI to create tools that help others learn, grow, and adapt in an evolving world.",
];

let dialogueIndex = 0;
let typing = false;
let isBlinking = false;
let mouthState = "closed";
let talkToggle = false;

// TYPEWRITER EFFECT
function typeText(text, i = 0) {
  typing = true;
  textElement.textContent = text.substring(0, i);

  if (i < text.length) {
    setTimeout(() => typeText(text, i + 1), 28);
  } else {
    typing = false;
    mouthState = "closed";
    updateSprite();
  }
}

// CLICK TO ADVANCE
textbox.addEventListener("click", () => {
  if (typing) return;

  dialogueIndex++;
  if (dialogueIndex < dialogue.length) {
    typeText(dialogue[dialogueIndex]);
  }
  if (dialogueIndex >= dialogue.length) {
    showCredits();
    return;
  }
});

// Start first line
typeText(dialogue[0]);

// CORE SPRITE UPDATE FUNCTION
function updateSprite() {
  const eyeState = isBlinking ? "blink" : "open";
  sprite.src = frames[eyeState][mouthState];
}

// TALKING MOUTH ANIMATION (Only while typing)
setInterval(() => {
  if (typing) {
    mouthState = talkToggle ? "talk1" : "talk2";
    talkToggle = !talkToggle;
  } else {
    mouthState = "closed";
  }
  updateSprite();
}, 110);

// NATURAL RANDOM BLINKING
function blink() {
  if (typing) return; // optional: prevents blinking mid-speech

  isBlinking = true;
  updateSprite();

  setTimeout(() => {
    isBlinking = false;
    updateSprite();
  }, 140); // realistic blink speed
}

// Random blink every 2–5 seconds (feels alive)
setInterval(() => {
  if (!typing && !isBlinking) {
    blink();
  }
}, 2000 + Math.random() * 3000);

// END CREDITS
function showCredits() {
    // Fade to black first
    fadeOverlay.style.opacity = "1";
  
    setTimeout(() => {
      sprite.style.display = "none";
      textbox.style.display = "none";
      creditsScreen.style.display = "flex";
    }, 2000); // matches fade duration
}
