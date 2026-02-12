/**
       * Proposal Application
       * A romantic Valentine's Day proposal experience
       */
      class ProposalApp {
        constructor() {
          this.currentStep = 0;
          this.yesButtonScale = 1;
          this.noBtnDodgeCount = 0;
          this.maxDodges = 5;
          this.currentImageIndex = 0;

          this.messages = [
            "Hey Beautiful...",
            "Memories that stamped the tag 'My All'🥹...",
            "Today is my birthday, but With you everyday is Val day...",
            "I know you're smiling already and i love that...",
            "So I have a very important question...",
          ];

          this.images = [
            "alexander-grey-J3m69BAg30s-unsplash.jpg",
            "eduardo-taulois-wwjkAZgiwl8-unsplash.jpg",
            "elias-maurer-VWP5h4fKfsM-unsplash.jpg",
            "everton-vila-AsahNlC0VhQ-unsplash.jpg",
            "fadi-xd-I4dR572y7l0-unsplash.jpg",
            "izumi-jS4UNRCMqUk-unsplash.jpg",
            "jacqueline-brandwayn-z-Ktuu8g6oc-unsplash.jpg",
            "jamie-street-hBzrr6m6-pc-unsplash.jpg",
            "jan-kopriva-W6WYTVatuPU-unsplash.jpg",
            "joanna-kosinska-P9oOLKNhIYU-unsplash.jpg",
            "kevin-wolf-TKVd2DPMm3Q-unsplash.jpg",
            "laura-ockel-zAOBpEE_vV4-unsplash.jpg",
            "marek-studzinski-iHRQbtK_6BA-unsplash.jpg",
            "matt-nelson-2Rb2I8TZ6O8-unsplash.jpg",
            "monisha-selvakumar-HbXya2dIbJ8-unsplash.jpg",
            "priscilla-du-preez-xSAiIM6Wa2c-unsplash.jpg",
            "vows-on-the-move-p0vZplFhKYI-unsplash.jpg",
            "wyron-a-n2PMAQxi-GM-unsplash.jpg",
          ];

          // Cache DOM elements
          this.elements = {
            imageCarousel: document.getElementById("image-carousel"),
            loginPane: document.getElementById("login-pane"),
            usernameInput: document.getElementById("username-input"),
            loginBtn: document.getElementById("login-btn"),
            loginError: document.getElementById("login-error"),
            countdownMessage: document.getElementById("countdown-message"),
            introCard: document.getElementById("intro-card"),
            introText: document.getElementById("intro-text"),
            introSubtitle: document.getElementById("intro-subtitle"),
            questionCard: document.getElementById("question-card"),
            successCard: document.getElementById("success-card"),
            yesBtn: document.getElementById("yes-btn"),
            noBtn: document.getElementById("no-btn"),
            heartsContainer: document.getElementById("hearts-container"),
          };

          // Start with intro hidden until login
          if (this.elements.introCard) this.elements.introCard.classList.add("hidden");

          this.setupEventListeners();
          this.startBackgroundHearts();
          this.initCountdown();
        }

        setupEventListeners() {
          this.elements.noBtn.addEventListener("mouseover", () =>
            this.dodgeButton()
          );
          this.elements.noBtn.addEventListener("click", () => this.dodgeButton());
          this.elements.noBtn.addEventListener("touchstart", () =>
            this.dodgeButton()
          );
          // Prevent accidental clicks on mobile
          this.elements.noBtn.addEventListener("focus", () => this.dodgeButton());

          // Login button & input
          if (this.elements.loginBtn && this.elements.usernameInput) {
            this.elements.loginBtn.addEventListener("click", () => this.attemptLogin());
            this.elements.usernameInput.addEventListener("keydown", (e) => {
              if (e.key === "Enter") this.attemptLogin();
            });
            // focus input for convenience
            this.elements.usernameInput.focus();
          }
        }

        attemptLogin() {
          const raw = this.elements.usernameInput.value || "";
          const username = raw.trim();
          
          // Check if before Feb 15
          const now = new Date();
          const year = now.getFullYear();
          const valDay = new Date(year, 1, 15, 0, 0, 0);
          
          let isValidUser = false;
          
          if (now < valDay) {
            // Before Feb 15: only allow specific usernames
            const lowerUsername = username.toLowerCase();
            isValidUser = lowerUsername === "plum" || lowerUsername === "pearls" || lowerUsername === "aquafina";
            if (!isValidUser) {
              alert(`Sorry you're not my Val🧐🥲, try again after valentine day🫣`);
              return;
            }
          } else {
            // Feb 15 or later: allow any non-empty username
            isValidUser = username.length > 0;
            if (!isValidUser) {
              alert("Please enter a username!");
              return;
            }
          }
          
          if (isValidUser) {
            // success
            this.elements.loginPane.classList.add("hidden");
            this.elements.introCard.classList.remove("hidden");
            this.elements.introCard.classList.add("card-enter");
            this.elements.loginError.classList.remove("show");
            this.elements.usernameInput.value = "";
          }
        }

        initCountdown() {
          const now = new Date();
          const year = now.getFullYear();
          const valDay = new Date(year, 1, 15, 0, 0, 0);
          
          if (now < valDay) {
            // Show countdown - inputs remain enabled for current users
            this.elements.countdownMessage.style.display = "block";
            
            const updateCountdown = () => {
              const now2 = new Date();
              const diff = valDay - now2;
              
              if (diff <= 0) {
                // Countdown finished
                this.elements.countdownMessage.style.display = "none";
                return;
              }
              
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
              const mins = Math.floor((diff / (1000 * 60)) % 60);
              const secs = Math.floor((diff / 1000) % 60);
              
              this.elements.countdownMessage.textContent = `💕 Countdown to Valentine Access: ${days}d ${hours}h ${mins}m ${secs}s`;
              setTimeout(updateCountdown, 1000);
            };
            
            updateCountdown();
          }
        }

        nextStep() {
          this.currentStep++;
          
          // Rotate image
          this.rotateImage();

          if (this.currentStep < this.messages.length) {
            this.updateIntroText();
          } else {
            this.transitionToQuestion();
          }
        }

        rotateImage() {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
          const imageUrl = `images/${this.images[this.currentImageIndex]}`;
          this.elements.imageCarousel.style.backgroundImage = `url('${imageUrl}')`;
        }

        updateIntroText() {
          const textEl = this.elements.introText;
          textEl.classList.remove("text-fade-in");
          textEl.classList.add("text-fade-out");

          setTimeout(() => {
            textEl.textContent = this.messages[this.currentStep];
            textEl.classList.remove("text-fade-out");
            textEl.classList.add("text-fade-in");

            // Show subtitle on last step
            if (this.currentStep === this.messages.length - 1) {
              this.elements.introSubtitle.classList.add("opacity-100");
            }
          }, 350);
        }

        transitionToQuestion() {
          this.elements.introCard.classList.remove("card-enter");
          this.elements.introCard.classList.add("card-exit");
          
          // Hide image carousel
          this.elements.imageCarousel.style.opacity = "0";
          this.elements.imageCarousel.style.pointerEvents = "none";

          setTimeout(() => {
            this.elements.introCard.classList.add("hidden");
            this.elements.questionCard.classList.remove("hidden");
            this.elements.questionCard.classList.add("card-enter");
          }, 600);
        }

        dodgeButton() {
          this.noBtnDodgeCount++;

          // Grow yes button
          this.yesButtonScale += 0.15;
          this.elements.yesBtn.style.transform = `scale(${this.yesButtonScale})`;

          // More aggressive dodging after several attempts
          if (this.noBtnDodgeCount > this.maxDodges) {
            this.dodgeButtonAggressive();
          } else {
            this.dodgeButtonNormal();
          }

          // Add encouragement text
          if (this.noBtnDodgeCount === 3) {
            this.showEncouragementMessage("Come on... 😊");
          } else if (this.noBtnDodgeCount === 5) {
            this.showEncouragementMessage("You know you want to! 💕");
          }
        }

        dodgeButtonNormal() {
          const noBtnRect = this.elements.noBtn.getBoundingClientRect();
          const maxX =
            window.innerWidth - noBtnRect.width - 20;
          const maxY =
            window.innerHeight - noBtnRect.height - 20;

          const randomX = Math.max(20, Math.random() * maxX);
          const randomY = Math.max(20, Math.random() * maxY);

          this.elements.noBtn.style.position = "fixed";
          this.elements.noBtn.style.left = randomX + "px";
          this.elements.noBtn.style.top = randomY + "px";
          this.elements.noBtn.style.transition = "all 0.3s ease-out";
        }

        dodgeButtonAggressive() {
          // Faster, more erratic dodging
          const noBtnRect = this.elements.noBtn.getBoundingClientRect();
          const maxX =
            window.innerWidth - noBtnRect.width - 20;
          const maxY =
            window.innerHeight - noBtnRect.height - 20;

          const randomX = Math.max(20, Math.random() * maxX);
          const randomY = Math.max(20, Math.random() * maxY);

          this.elements.noBtn.style.position = "fixed";
          this.elements.noBtn.style.left = randomX + "px";
          this.elements.noBtn.style.top = randomY + "px";
          this.elements.noBtn.style.transition = "all 0.15s ease-out";

          // Add a little rotation for fun
          this.elements.noBtn.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
        }

        showEncouragementMessage(message) {
          const messageEl = document.createElement("div");
          messageEl.textContent = message;
          messageEl.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.5rem;
            animation: ${message.includes("want") ? "bounce" : "pulse"} 1s ease-in-out;
            pointer-events: none;
            z-index: 999;
          `;

          document.body.appendChild(messageEl);
          setTimeout(() => messageEl.remove(), 2000);
        }

        acceptProposal() {
          this.elements.questionCard.classList.remove("card-enter");
          this.elements.questionCard.classList.add("card-exit");

          setTimeout(() => {
            this.elements.questionCard.classList.add("hidden");
            this.elements.successCard.classList.remove("hidden");
            this.elements.successCard.classList.add("card-enter");

            this.celebrateWithConfetti();
          }, 600);
        }

        celebrateWithConfetti() {
          const duration = 6000;
          const animationEnd = Date.now() + duration;

          const launchConfetti = () => {
            confetti({
              particleCount: Math.random() * 50 + 50,
              spread: 70 + Math.random() * 30,
              origin: { x: Math.random(), y: Math.random() * 0.5 },
              colors: ["#ff69b4", "#ff1493", "#ff0000", "#ffb6c1"],
            });
          };

          // Initial burst
          launchConfetti();
          launchConfetti();

          // Continued celebration
          const interval = setInterval(() => {
            if (Date.now() < animationEnd) {
              launchConfetti();
            } else {
              clearInterval(interval);
            }
          }, 300);
        }

        createFloatingHeart() {
          const heart = document.createElement("div");
          heart.classList.add("floating-heart");
          heart.innerHTML = Math.random() > 0.5 ? "❤️" : "💕";

          const startX = Math.random() * 100;
          const size = Math.random() * 20 + 15;

          heart.style.left = startX + "vw";
          heart.style.fontSize = size + "px";
          heart.style.animationDuration = Math.random() * 15 + 15 + "s";

          this.elements.heartsContainer.appendChild(heart);

          setTimeout(() => heart.remove(), 30000);
        }

        startBackgroundHearts() {
          // Create initial hearts
          for (let i = 0; i < 3; i++) {
            this.createFloatingHeart();
          }

          // Continue creating hearts at intervals
          setInterval(() => this.createFloatingHeart(), 800);
        }

        reset() {
          this.currentStep = 0;
          this.yesButtonScale = 1;
          this.noBtnDodgeCount = 0;
          this.currentImageIndex = 0;

          // Reset carousel
          this.elements.imageCarousel.style.opacity = "1";
          this.elements.imageCarousel.style.pointerEvents = "auto";
          this.elements.imageCarousel.style.backgroundImage = `url('images/${this.images[0]}')`;

          // Reset all cards
          this.elements.successCard.classList.add("hidden");
          this.elements.questionCard.classList.add("hidden");
          this.elements.introCard.classList.remove("hidden");

          // Reset text
          this.elements.introText.textContent = this.messages[0];
          this.elements.introSubtitle.classList.remove("opacity-100");

          // Reset button positions
          this.elements.noBtn.style.position = "relative";
          this.elements.noBtn.style.left = "auto";
          this.elements.noBtn.style.top = "auto";
          this.elements.noBtn.style.transform = "none";
          this.elements.yesBtn.style.transform = "scale(1)";

          // Re-add animations
          this.elements.introCard.classList.add("card-enter");
        }
      }

      // Initialize the app when DOM is ready
      const proposalApp = new ProposalApp();
