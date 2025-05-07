const eye1 = document.getElementById('eye1');
    const eye2 = document.getElementById('eye2');
    const sendButton = document.getElementById('sendButton');
    const userInput = document.getElementById('userInput');
    const responseDiv = document.getElementById('response');
    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const currentModelElement = document.getElementById('currentModel');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const stopButton = document.getElementById('stopButton');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const chatModeToggle = document.getElementById('chatModeToggle');
    const body = document.body;

    // Custom responses and actions
    const customResponses = {
      "menu": {
        action: "showHTML",
        content: `
          <div class="menu-content">
            <h3>Elixa AI Menu</h3>
            <p>Select an option below or type your question:</p>
            <button onclick="handleMenuOption('features')">Features</button>
            <button onclick="handleMenuOption('commands')">Available Commands</button>
            <button onclick="handleMenuOption('about')">About Elixa</button>
            <button onclick="handleMenuOption('help')">Help</button>
            <img src="https://placehold.co/400x200?text=Elixa+AI" alt="Elixa AI">
          </div>
        `
      },
      "features": {
        action: "showHTML",
        content: `
          <div class="menu-content">
            <h3>Elixa AI Features</h3>
            <ul>
              <li>Natural language processing</li>
              <li>Multiple AI models</li>
              <li>Interactive eyes</li>
              <li>Image generation</li>
              <li>Math problem solving</li>
              <li>Emotional expressions</li>
              <li>Dark/Chat mode</li>
            </ul>
            <p>Type <b>menu</b> to return to the main menu.</p>
          </div>
        `
      },
      "commands": {
        action: "showHTML",
        content: `
          <div class="menu-content">
            <h3>Available Commands</h3>
            <ul>
              <li><b>menu</b> - Show this menu</li>
              <li><b>help</b> - Get help</li>
              <li><b>about</b> - Learn about Elixa</li>
              <li><b>clear</b> - Clear the chat</li>
              <li><b>love</b> - Show love expression</li>
              <li><b>wave</b> - Make me wave</li>
              <li><b>color [color]</b> - Change eye color</li>
            </ul>
          </div>
        `
      },
      "about": {
        action: "showText",
        content: "Elixa is an advanced AI assistant designed by Nethindu Thaminda Kodithuwakku to help with various tasks. It combines multiple AI models to provide the best possible responses."
      },
      "help": {
        action: "showText",
        content: "You can ask me anything! Try questions about science, history, or request images. Type 'menu' to see options. Try commands like 'love', 'wave', or 'color red' to see special effects!"
      },
      "clear": {
        action: "clearChat",
        content: ""
      },
      "love": {
        action: "showLove",
        content: ""
      },
      "wave": {
        action: "showWave",
        content: ""
      }
    };

    // AI models configuration with response handling instructions
    const aiModels = {
      elixa: {
        name: "Elixa",
        endpoint: "https://bk9.fun/ai/gemini?q=",
        responseType: "text", // text, image, or direct
        responsePath: "BK9", // Path to the response data in JSON
        processResponse: function(data) {
          // Default text processing
          let response = Array.isArray(data[this.responsePath]) ? 
                         data[this.responsePath].join(" ") : 
                         data[this.responsePath];
          return replaceAINames(response);
        }
      },
      gemini: {
        name: "Gemini",
        endpoint: "https://bk9.fun/ai/gemini?q=",
        responseType: "text",
        responsePath: "BK9",
        processResponse: function(data) {
          let response = Array.isArray(data[this.responsePath]) ? 
                         data[this.responsePath].join(" ") : 
                         data[this.responsePath];
          return replaceAINames(response);
        }
      },
      
      deep: {
        name: "Deepseek",
        endpoint: "https://bk9.fun/ai/deepseek-r1?q=",
        responseType: "text",
        responsePath: "BK9.content",
        processResponse: function(data) {
          let response = Array.isArray(data[this.responsePath]) ? 
                         data[this.responsePath].join(" ") : 
                         data[this.responsePath];
          return response;
        }
      },
      
      
      llama: {
        name: "Llama",
        endpoint: "https://bk9.fun/ai/llama?q=",
        responseType: "text",
        responsePath: "BK9",
        processResponse: function(data) {
          let response = Array.isArray(data[this.responsePath]) ? 
                         data[this.responsePath].join(" ") : 
                         data[this.responsePath];
          return replaceAINames(response);
        }
      },
      "jeeves-chat": {
        name: "Jeeves",
        endpoint: "https://bk9.fun/ai/jeeves-chat?q=",
        responseType: "text",
        responsePath: "BK9",
        processResponse: function(data) {
          let response = Array.isArray(data[this.responsePath]) ? 
                         data[this.responsePath].join(" ") : 
                         data[this.responsePath];
          return replaceAINames(response);
        }
      },
      maths: {
        name: "Maths",
        endpoint: "https://bk9.fun/ai/mathssolve?q=",
        responseType: "text",
        responsePath: "BK9",
        processResponse: function(data) {
          let response = Array.isArray(data[this.responsePath]) ? 
                         data[this.responsePath].join(" ") : 
                         data[this.responsePath];
          return replaceAINames(response);
        }
      },
      
      aoyo: {
        name: "Aoyo",
        endpoint: "https://bk9.fun/ai/Aoyo?q=",
        responseType: "text",
        responsePath: "BK9",
        processResponse: function(data) {
          let response = Array.isArray(data[this.responsePath]) ? 
                         data[this.responsePath].join(" ") : 
                         data[this.responsePath];
          return replaceAINames(response);
        }
      },
      
      
      gemini2: {
        name: "Gemini+",
        endpoint: "https://bk9.fun/ai/google-thinking?q=",
        responseType: "text",
        responsePath: "BK9",
        processResponse: function(data) {
          let response = Array.isArray(data[this.responsePath]) ? 
                         data[this.responsePath].join(" ") : 
                         data[this.responsePath];
          return replaceAINames(response);
        }
      },
      
      flux: {
        name: "flux",
        endpoint: "https://bk9.fun/ai/fluximg?q=",
        responseType: "image",
        responsePath: "BK9[0]", // First image in array
        processResponse: function(data) {
          // For images, we return the URL directly
          const pathParts = this.responsePath.replace(/\]/g, '').split('[');
          let result = data;
          for (const part of pathParts) {
            if (part) result = result[part];
          }
          return result;
        }
      },
      magicstudio: {
        name: "magicstudio",
        endpoint: "https://bk9.fun/ai/magicstudio?prompt=",
        responseType: "direct", // Special handling - don't fetch, use URL directly
        processResponse: function(prompt) {
          // For direct image generation, we construct the image URL
          return `${this.endpoint}${encodeURIComponent(prompt)}`;
        }
      }
    };

    let currentModel = "elixa";
    let typingInterval = null;
    let isTyping = false;
    let currentRequest = null;
    let isDarkMode = false;
    let isChatMode = false;
    let loveInterval = null;
    let waveInterval = null;

    // Toggle dropdown menu
    dropdownToggle.addEventListener('click', () => {
      dropdownMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
      }
    });

    // Handle model selection
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        const model = item.dataset.model;
        currentModel = model;
        currentModelElement.textContent = aiModels[model].name;
        
        // Update active state
        dropdownItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        dropdownMenu.classList.remove('show');
      });
    });

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      body.classList.toggle('dark-mode', isDarkMode);
      darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      darkModeToggle.title = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });

    // Toggle chat mode
    chatModeToggle.addEventListener('click', () => {
      isChatMode = !isChatMode;
      chatModeToggle.innerHTML = isChatMode ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-comment"></i>';
      chatModeToggle.title = isChatMode ? 'Toggle Eye Mode' : 'Toggle Chat Mode';
      
      if (isChatMode) {
        document.querySelector('.eyes-container').style.display = 'none';
        document.querySelector('h1').textContent = 'Elixa Chat';
      } else {
        document.querySelector('.eyes-container').style.display = 'flex';
        document.querySelector('h1').textContent = 'Elixa AI';
      }
    });

    // Enhanced blinking animation
    function blinkEyes() {
      eye1.classList.add('closed');
      eye2.classList.add('closed');
      setTimeout(() => {
        eye1.classList.remove('closed');
        eye2.classList.remove('closed');
      }, 150);
    }

    // More natural blinking pattern
    function scheduleBlink() {
      const baseTime = 2000 + Math.random() * 3000;
      const variance = Math.random() > 0.7 ? 1000 : 0; // occasional double blinks
      setTimeout(() => {
        blinkEyes();
        scheduleBlink();
      }, baseTime + variance);
    }

    // Start blinking
    scheduleBlink();

    // Enhanced eye tracking (follows mouse)
    const eyeball1 = document.querySelector('.eye#eye1');
    const eyeball2 = document.querySelector('.eye#eye2');

    function moveEyeballs(x, y) {
      // Get centers of both eyes
      const rect1 = eyeball1.getBoundingClientRect();
      const rect2 = eyeball2.getBoundingClientRect();

      const centerX = (rect1.left + rect1.width / 2 + rect2.left + rect2.width / 2) / 2;
      const centerY = (rect1.top + rect1.height / 2 + rect2.top + rect2.height / 2) / 2;

      const dx = x - centerX;
      const dy = y - centerY;

      const maxDistance = 10;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(maxDistance, Math.hypot(dx, dy));

      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;

      // Apply same offset to both eyes
      [eyeball1, eyeball2].forEach(eye => {
        eye.style.setProperty('--eye-offset-x', `${offsetX}px`);
        eye.style.setProperty('--eye-offset-y', `${offsetY}px`);
      });
    }

    document.addEventListener('mousemove', e => moveEyeballs(e.pageX, e.pageY));
    document.addEventListener('touchmove', e => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        moveEyeballs(touch.pageX, touch.pageY);
      }
    }, { passive: true });

    // Emotion detection from message
    function detectEmotion(message) {
      const lowerMsg = message.toLowerCase();
      
      if (/(fun|happy|joy|smile)/.test(lowerMsg)) {
        return 'happy';
      } else if (/(sad|cry|depress|tear)/.test(lowerMsg)) {
        return 'sad';
      } else if (/(angry|mad|annoy)/.test(lowerMsg)) {
        return 'angry';
      } else if (/(love|heart|like)/.test(lowerMsg)) {
        return 'love';
      }
      return 'neutral';
    }

    // Color detection from message
    function detectColors(message) {
      const colorMap = {
        red: '#ff0000',
        blue: '#0000ff',
        green: '#00ff00',
        yellow: '#ffff00',
        purple: '#800080',
        pink: '#ffc0cb',
        orange: '#ffa500',
        white: '#ffffff',
        black: '#000000',
        gray: '#808080',
        // Add more colors as needed
      };
      
      // Check for color commands
      const colorMatch = message.match(/color\s+(\w+)/i);
      if (colorMatch) {
        const requestedColor = colorMatch[1].toLowerCase();
        if (colorMap[requestedColor]) {
          return colorMap[requestedColor];
        }
      }
      
      // Check for color names in message
      for (const [color, hex] of Object.entries(colorMap)) {
        if (message.toLowerCase().includes(color)) {
          return hex;
        }
      }
      return null;
    }

    // Show love expression (hearts in eyes)
    function showLove() {
      // Clear any existing love or wave effects
      clearLoveEffect();
      clearWaveEffect();
      
      [eye1, eye2].forEach(eye => {
        eye.classList.add('love');
      });
      
      // Set timeout to remove love effect
      loveInterval = setTimeout(() => {
        clearLoveEffect();
      }, 3000);
    }

    function clearLoveEffect() {
      if (loveInterval) {
        clearTimeout(loveInterval);
        loveInterval = null;
      }
      [eye1, eye2].forEach(eye => {
        eye.classList.remove('love');
      });
    }

    // Show waving animation
    function showWave() {
      // Clear any existing love or wave effects
      clearLoveEffect();
      clearWaveEffect();
      
      [eye1, eye2].forEach(eye => {
        eye.classList.add('waving');
      });
      
      // Set timeout to remove wave effect
      waveInterval = setTimeout(() => {
        clearWaveEffect();
      }, 3000);
    }

    function clearWaveEffect() {
      if (waveInterval) {
        clearTimeout(waveInterval);
        waveInterval = null;
      }
      [eye1, eye2].forEach(eye => {
        eye.classList.remove('waving');
      });
    }

    // Touch prevention
    function setupTouchPrevention() {
      [eye1, eye2].forEach(eye => {
        eye.addEventListener('touchstart', (e) => {
          e.preventDefault();
          eye.classList.add('touched');
          setTimeout(() => eye.classList.remove('touched'), 300);
          
          // Move eyes away from touch
          const touchX = e.touches[0].clientX;
          const touchY = e.touches[0].clientY;
          const eyeRect = eye.getBoundingClientRect();
          const eyeCenterX = eyeRect.left + eyeRect.width/2;
          const eyeCenterY = eyeRect.top + eyeRect.height/2;
          
          // Calculate opposite direction
          const dx = eyeCenterX - touchX;
          const dy = eyeCenterY - touchY;
          const distance = Math.min(20, Math.hypot(dx, dy));
          const angle = Math.atan2(dy, dx);
          
          eye.style.setProperty('--eye-offset-x', `${Math.cos(angle) * distance}px`);
          eye.style.setProperty('--eye-offset-y', `${Math.sin(angle) * distance}px`);
        }, { passive: false });
      });
    }

    // Initialize touch prevention
    setupTouchPrevention();

    function replaceAINames(text) {
      if (!text) return "";
      const aiNames = ["BK9", "Gemini", "AI", "Assistant", "Chatbot"];
      let result = text;
      aiNames.forEach(name => {
        const regex = new RegExp(name, 'gi');
        result = result.replace(regex, 'Elixa');
      });
      return result;
    }

    // Convert **text** to bold
    function formatTextWithBold(text) {
      if (!text) return "";
      // Replace **text** with <b>text</b>
      return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    }

    // Handle menu options
    window.handleMenuOption = function(option) {
      if (customResponses[option]) {
        processCustomResponse(option);
      }
    };

    // Process custom responses
    function processCustomResponse(key) {
      const response = customResponses[key];
      
      if (response.action === "showHTML") {
        responseDiv.innerHTML = response.content;
      } 
      else if (response.action === "showText") {
        responseDiv.innerHTML = formatTextWithBold(response.content);
      }
      else if (response.action === "clearChat") {
        responseDiv.innerHTML = '';
      }
      else if (response.action === "showLove") {
        showLove();
        responseDiv.innerHTML = "<b>❤️ Sending love! ❤️</b>";
      }
      else if (response.action === "showWave") {
        showWave();
        responseDiv.innerHTML = "<b>👋 Waving hello! 👋</b>";
      }
    }

    // Stop the current response
    function stopResponse() {
      if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
      }
      isTyping = false;
      stopButton.style.display = 'none';
      
      // Abort any ongoing fetch request
      if (currentRequest) {
        currentRequest.abort();
        currentRequest = null;
      }
      
      // Clear any effects
      clearLoveEffect();
      clearWaveEffect();
    }

    // Display an image response
    function displayImage(url) {
      responseDiv.innerHTML = '';
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Generated Image';
      img.className = 'generated-image';
      responseDiv.appendChild(img);
    }

    // Improved message handling
    async function sendMessage() {
      const message = userInput.value.trim().toLowerCase();
      if (!message) {
        userInput.focus();
        return;
      }

      // Check for custom responses first
      if (customResponses[message]) {
        processCustomResponse(message);
        userInput.value = "";
        userInput.focus();
        return;
      }

      // Check for color change command
      const color = detectColors(userInput.value);
      if (color) {
        [eye1, eye2].forEach(eye => {
          eye.style.backgroundColor = color;
        });
        responseDiv.innerHTML = `<b>Changed eye color to ${userInput.value.match(/color\s+(\w+)/i)[1]}!</b>`;
        userInput.value = "";
        userInput.focus();
        return;
      }

      // Visual feedback
      sendButton.disabled = true;
      responseDiv.innerHTML = '<span class="loading">Thinking</span>';
      stopButton.style.display = 'block';
      
      try {
        // Blink eyes when thinking
        blinkEyes();
        
        // Detect emotion from message
        const emotion = detectEmotion(userInput.value); // Use original case
        
        // Set eye emotion
        [eye1, eye2].forEach(eye => {
          eye.className = 'eye'; // Reset classes
          if (emotion !== 'neutral') {
            eye.classList.add(emotion);
          }
        });

        // Randomly show love (5% chance)
        if (Math.random() < 0.05) {
          showLove();
        }
        
        const modelConfig = aiModels[currentModel];
        
        // Special handling for direct image generation (like magicstudio)
        if (modelConfig.responseType === "direct") {
          const imageUrl = modelConfig.processResponse(message);
          displayImage(imageUrl);
          userInput.value = "";
          userInput.focus();
          return;
        }
        
        const endpoint = modelConfig.endpoint + encodeURIComponent(message);
        
        // Create an AbortController for the fetch request
        const controller = new AbortController();
        currentRequest = controller;
        
        const response = await fetch(endpoint, {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const result = await response.json();
        currentRequest = null;
        
        // Process the response according to model configuration
        if (modelConfig.responseType === "image") {
          const imageUrl = modelConfig.processResponse(result);
          displayImage(imageUrl);
        } 
        else if (modelConfig.responseType === "text") {
          let processedText = modelConfig.processResponse(result);
          processedText = formatTextWithBold(processedText);
          typeResponse(processedText);
        }
        
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error:', error);
          responseDiv.textContent = "Oops! Something went wrong. Please try again later.";
        }
      } finally {
        sendButton.disabled = false;
        userInput.value = "";
        userInput.focus();
        stopButton.style.display = 'none';
        currentRequest = null;
      }
    }

    // Typewriter effect for responses
    function typeResponse(text) {
      let i = 0;
      responseDiv.innerHTML = '';
      const speed = 25 + Math.random() * 30; // Variable typing speed
      isTyping = true;
      
      // We'll use a temporary div to properly handle HTML tags
      const tempDiv = document.createElement('div');
      
      typingInterval = setInterval(() => {
        if (i < text.length && isTyping) {
          // Add the next character to our temporary div
          tempDiv.innerHTML = text.substring(0, i+1);
          // Update the actual response div
          responseDiv.innerHTML = tempDiv.innerHTML;
          i++;
          
          // Occasionally blink while "typing"
          if (i % 15 === 0 && Math.random() > 0.7) {
            blinkEyes();
          }
          
          // Randomly wave sometimes while typing (3% chance)
          if (i % 20 === 0 && Math.random() < 0.03) {
            showWave();
          }
        } else {
          clearInterval(typingInterval);
          typingInterval = null;
          isTyping = false;
          stopButton.style.display = 'none';
        }
      }, speed);
    }

    // Event listeners
    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    stopButton.addEventListener('click', stopResponse);

    // Initial focus on input
    userInput.focus();
    
    // Set initial active model
    document.querySelector(`.dropdown-item[data-model="${currentModel}"]`).classList.add('active');
