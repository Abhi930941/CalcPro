// CalcPro - Advanced Multi Calculator
class CalcPro {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.initializeTheme();
        this.initializeNavigation();
        this.initializeCalculators();
        this.initializeEventListeners();
        this.initializeAnimations();
        this.initializeFAQ();
        this.initializeFilterButtons();
        console.log('CalcPro initialized successfully! 🧮');
    }

    // Theme Management
    initializeTheme() {
        const savedTheme = localStorage.getItem('calcpro-theme') || 'light';
        this.setTheme(savedTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
        localStorage.setItem('calcpro-theme', theme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
        }
    }

    toggleTheme() {
        this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
    }

    // Navigation
    initializeNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active nav link based on current page
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Animations
    initializeAnimations() {
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .calculator-card,
            .feature-card,
            .tip-card,
            .step-card,
            .faq-item {
                opacity: 1;
                transform: translateY(0);
            }
            
            .calculator-card.animate-in,
            .feature-card.animate-in,
            .tip-card.animate-in,
            .step-card.animate-in,
            .faq-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .calc-btn.active {
                transform: scale(0.95) !important;
                opacity: 0.8;
            }
            
            .error-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ef4444;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Initialize Intersection Observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements to animate
        const elementsToAnimate = document.querySelectorAll(
            '.calculator-card, .feature-card, .tip-card, .step-card, .faq-item'
        );
        
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }

    // FAQ Functionality
    initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) return;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    // Close other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
    }

    // Filter Buttons for Features Page
    initializeFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const featureCards = document.querySelectorAll('.feature-card');
        
        if (filterButtons.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter cards
                const category = button.getAttribute('data-category');
                
                featureCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Calculator Initialization
    initializeCalculators() {
        this.initializeBasicCalculator();
        this.initializeScientificCalculator();
        this.initializeAgeCalculator();
        this.initializeBMICalculator();
        this.initializeInterestCalculator();
    }

    // Basic Calculator
    initializeBasicCalculator() {
        const display = document.getElementById('basic-display');
        const expressionDisplay = document.getElementById('basic-expression');
        if (!display || !expressionDisplay) return;

        let currentValue = '0';
        let previousValue = '';
        let operation = null;
        let shouldResetDisplay = false;
        let expression = '';

        const updateDisplay = () => {
            display.value = currentValue;
            expressionDisplay.textContent = expression || ' ';
        };

        const inputNumber = (num) => {
            if (shouldResetDisplay) {
                currentValue = num;
                shouldResetDisplay = false;
            } else {
                if (currentValue === '0' && num !== '.') {
                    currentValue = num;
                } else {
                    currentValue += num;
                }
            }
            updateDisplay();
        };

        const inputDecimal = () => {
            if (shouldResetDisplay) {
                currentValue = '0.';
                shouldResetDisplay = false;
            } else if (!currentValue.includes('.')) {
                currentValue += '.';
            }
            updateDisplay();
        };

        const inputOperation = (op) => {
            if (operation !== null && !shouldResetDisplay) {
                calculate();
            }
            
            previousValue = currentValue;
            operation = op;
            
            const opSymbols = {
                'add': '+',
                'subtract': '−',
                'multiply': '×',
                'divide': '÷'
            };
            
            expression = `${previousValue} ${opSymbols[op]}`;
            shouldResetDisplay = true;
            updateDisplay();
        };

        const calculate = () => {
            if (operation === null || previousValue === '') {
                return;
            }

            const prev = parseFloat(previousValue);
            const current = parseFloat(currentValue);
            let result;

            switch (operation) {
                case 'add':
                    result = prev + current;
                    break;
                case 'subtract':
                    result = prev - current;
                    break;
                case 'multiply':
                    result = prev * current;
                    break;
                case 'divide':
                    if (current === 0) {
                        this.showError('Cannot divide by zero');
                        clearAll();
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }

            const opSymbols = {
                'add': '+',
                'subtract': '−',
                'multiply': '×',
                'divide': '÷'
            };

            // Round to avoid floating point issues
            result = Math.round(result * 100000000) / 100000000;
            
            expression = `${previousValue} ${opSymbols[operation]} ${currentValue} =`;
            currentValue = result.toString();
            operation = null;
            previousValue = '';
            shouldResetDisplay = true;
            updateDisplay();
        };

        const clearAll = () => {
            currentValue = '0';
            previousValue = '';
            operation = null;
            expression = '';
            shouldResetDisplay = false;
            updateDisplay();
        };

        const clearEntry = () => {
            currentValue = '0';
            updateDisplay();
        };

        const backspace = () => {
            if (shouldResetDisplay) {
                return;
            }
            
            if (currentValue.length > 1) {
                currentValue = currentValue.slice(0, -1);
            } else {
                currentValue = '0';
            }
            updateDisplay();
        };

        const toggleSign = () => {
            if (currentValue === '0') {
                return;
            }
            
            if (currentValue.startsWith('-')) {
                currentValue = currentValue.slice(1);
            } else {
                currentValue = '-' + currentValue;
            }
            updateDisplay();
        };

        // Event listeners for buttons
        document.querySelectorAll('.calc-btn[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                inputNumber(button.getAttribute('data-number'));
                this.animateButton(button);
            });
        });

        document.querySelectorAll('.calc-btn[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                
                switch (action) {
                    case 'clear':
                        clearAll();
                        break;
                    case 'clear-entry':
                        clearEntry();
                        break;
                    case 'backspace':
                        backspace();
                        break;
                    case 'decimal':
                        inputDecimal();
                        break;
                    case 'calculate':
                        calculate();
                        break;
                    case 'plus-minus':
                        toggleSign();
                        break;
                    case 'add':
                    case 'subtract':
                    case 'multiply':
                    case 'divide':
                        inputOperation(action);
                        break;
                }
                this.animateButton(button);
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('basic-display')) {
                if (e.key >= '0' && e.key <= '9') {
                    inputNumber(e.key);
                } else if (e.key === '.') {
                    inputDecimal();
                } else if (e.key === '+') {
                    inputOperation('add');
                } else if (e.key === '-') {
                    inputOperation('subtract');
                } else if (e.key === '*') {
                    inputOperation('multiply');
                } else if (e.key === '/') {
                    e.preventDefault();
                    inputOperation('divide');
                } else if (e.key === 'Enter' || e.key === '=') {
                    e.preventDefault();
                    calculate();
                } else if (e.key === 'Escape') {
                    clearAll();
                } else if (e.key === 'Backspace') {
                    e.preventDefault();
                    backspace();
                }
            }
        });

        // Initialize display
        updateDisplay();
    }

    animateButton(button) {
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 150);
    }

    // Scientific Calculator
    initializeScientificCalculator() {
        const display = document.getElementById('sci-display');
        const expressionDisplay = document.getElementById('sci-expression');
        if (!display || !expressionDisplay) return;

        let currentInput = '0';
        let expression = '';
        let isSecondFunction = false;
        let isDegreeMode = true;

        const updateDisplay = () => {
            display.value = currentInput;
            expressionDisplay.textContent = expression;
        };

        const inputNumber = (number) => {
            if (currentInput === '0' || currentInput === 'Error') {
                currentInput = number;
            } else {
                currentInput += number;
            }
            expression += number;
            updateDisplay();
        };

        const inputOperator = (operator) => {
            if (currentInput === 'Error') return;
            
            const operators = {
                'add': '+',
                'subtract': '-',
                'multiply': '*',
                'divide': '/'
            };
            
            currentInput += operators[operator];
            expression += operators[operator];
            updateDisplay();
        };

        const inputFunction = (func) => {
            if (currentInput === 'Error') return;
            
            let funcExpression = '';
            let displayExpression = '';

            switch (func) {
                case 'pi':
                    currentInput = currentInput === '0' ? Math.PI.toString() : currentInput + Math.PI.toString();
                    expression += Math.PI;
                    break;
                case 'e':
                    currentInput = currentInput === '0' ? Math.E.toString() : currentInput + Math.E.toString();
                    expression += Math.E;
                    break;
                case 'square':
                    funcExpression = `(${currentInput})**2`;
                    displayExpression = `(${currentInput})²`;
                    break;
                case 'cube':
                    funcExpression = `(${currentInput})**3`;
                    displayExpression = `(${currentInput})³`;
                    break;
                case 'sqrt':
                    funcExpression = `Math.sqrt(${currentInput})`;
                    displayExpression = `√(${currentInput})`;
                    break;
                case 'cbrt':
                    funcExpression = `Math.cbrt(${currentInput})`;
                    displayExpression = `∛(${currentInput})`;
                    break;
                case 'factorial':
                    funcExpression = `this.factorial(${currentInput})`;
                    displayExpression = `factorial(${currentInput})`;
                    break;
                case 'log':
                    funcExpression = `Math.log10(${currentInput})`;
                    displayExpression = `log(${currentInput})`;
                    break;
                case 'ln':
                    funcExpression = `Math.log(${currentInput})`;
                    displayExpression = `ln(${currentInput})`;
                    break;
                case 'exp':
                    funcExpression = `Math.exp(${currentInput})`;
                    displayExpression = `exp(${currentInput})`;
                    break;
                case 'power':
                    funcExpression = `**`;
                    displayExpression = `^`;
                    break;
                case 'power-ten':
                    funcExpression = `10**(${currentInput})`;
                    displayExpression = `10^(${currentInput})`;
                    break;
                case 'sin':
                    const angle = isDegreeMode ? `(${currentInput} * Math.PI / 180)` : currentInput;
                    funcExpression = `Math.sin(${angle})`;
                    displayExpression = `sin(${currentInput})`;
                    break;
                case 'cos':
                    const angleCos = isDegreeMode ? `(${currentInput} * Math.PI / 180)` : currentInput;
                    funcExpression = `Math.cos(${angleCos})`;
                    displayExpression = `cos(${currentInput})`;
                    break;
                case 'tan':
                    const angleTan = isDegreeMode ? `(${currentInput} * Math.PI / 180)` : currentInput;
                    funcExpression = `Math.tan(${angleTan})`;
                    displayExpression = `tan(${currentInput})`;
                    break;
                case 'sinh':
                    funcExpression = `Math.sinh(${currentInput})`;
                    displayExpression = `sinh(${currentInput})`;
                    break;
                case 'cosh':
                    funcExpression = `Math.cosh(${currentInput})`;
                    displayExpression = `cosh(${currentInput})`;
                    break;
                case 'tanh':
                    funcExpression = `Math.tanh(${currentInput})`;
                    displayExpression = `tanh(${currentInput})`;
                    break;
                case 'mod':
                    funcExpression = `%`;
                    displayExpression = `mod`;
                    break;
                case 'percent':
                    funcExpression = `/100`;
                    displayExpression = `%`;
                    break;
                case 'parenthesis':
                    currentInput += '(';
                    expression += '(';
                    break;
                case 'parenthesis-close':
                    currentInput += ')';
                    expression += ')';
                    break;
                case 'deg-rad':
                    isDegreeMode = !isDegreeMode;
                    const degRadBtn = document.querySelector('[data-action="deg-rad"]');
                    if (degRadBtn) degRadBtn.textContent = isDegreeMode ? 'DEG' : 'RAD';
                    return;
                case 'second':
                    isSecondFunction = !isSecondFunction;
                    this.toggleSecondFunctions(isSecondFunction);
                    return;
            }

            if (funcExpression.includes('**') || funcExpression.includes('%') || funcExpression.includes('/100')) {
                currentInput += displayExpression;
                expression += funcExpression;
            } else if (funcExpression) {
                try {
                    const result = eval(funcExpression);
                    currentInput = String(result);
                    expression = displayExpression + ' = ' + result;
                } catch (error) {
                    currentInput = 'Error';
                    expression = 'Error';
                }
            }
            
            updateDisplay();
        };

        const calculateExpression = () => {
            try {
                const factorial = (n) => {
                    if (n < 0) return NaN;
                    if (n === 0 || n === 1) return 1;
                    let result = 1;
                    for (let i = 2; i <= n; i++) {
                        result *= i;
                    }
                    return result;
                };

                let evalExpression = expression
                    .replace(/sin\(/g, 'Math.sin(')
                    .replace(/cos\(/g, 'Math.cos(')
                    .replace(/tan\(/g, 'Math.tan(')
                    .replace(/sinh\(/g, 'Math.sinh(')
                    .replace(/cosh\(/g, 'Math.cosh(')
                    .replace(/tanh\(/g, 'Math.tanh(')
                    .replace(/log\(/g, 'Math.log10(')
                    .replace(/ln\(/g, 'Math.log(')
                    .replace(/sqrt\(/g, 'Math.sqrt(')
                    .replace(/cbrt\(/g, 'Math.cbrt(')
                    .replace(/exp\(/g, 'Math.exp(')
                    .replace(/factorial\(/g, 'factorial(')
                    .replace(/\^/g, '**')
                    .replace(/mod/g, '%');

                if (isDegreeMode) {
                    evalExpression = evalExpression.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, func, angle) => {
                        return `Math.${func}(${angle} * Math.PI / 180)`;
                    });
                }

                const result = eval(evalExpression);
                currentInput = String(result);
                expression = expression + ' = ' + result;
                updateDisplay();
            } catch (error) {
                currentInput = 'Error';
                expression = 'Error';
                updateDisplay();
                setTimeout(() => {
                    currentInput = '0';
                    expression = '';
                    updateDisplay();
                }, 1500);
            }
        };

        const clearCalculator = (clearType = 'all') => {
            if (clearType === 'all') {
                currentInput = '0';
                expression = '';
            } else if (clearType === 'entry') {
                currentInput = '0';
            }
            updateDisplay();
        };

        const backspace = () => {
            if (currentInput.length > 1 && currentInput !== 'Error') {
                currentInput = currentInput.slice(0, -1);
                expression = expression.slice(0, -1);
            } else {
                currentInput = '0';
                expression = '';
            }
            updateDisplay();
        };

        const togglePlusMinus = () => {
            if (currentInput !== '0' && currentInput !== 'Error') {
                currentInput = String(-parseFloat(currentInput));
                expression = expression.replace(/(-?\d*\.?\d+)$/, currentInput);
                updateDisplay();
            }
        };

        this.toggleSecondFunctions = (showSecond) => {
            const secondFunctions = {
                'sin': 'sin⁻¹',
                'cos': 'cos⁻¹',
                'tan': 'tan⁻¹',
                'sinh': 'sinh⁻¹',
                'cosh': 'cosh⁻¹',
                'tanh': 'tanh⁻¹',
                'log': 'log₂',
                'ln': 'logy',
                'sqrt': 'x√y',
                'square': 'x²',
                'cube': 'x³'
            };

            document.querySelectorAll('.sci-btn').forEach(btn => {
                const action = btn.getAttribute('data-action');
                if (secondFunctions[action]) {
                    btn.textContent = showSecond ? secondFunctions[action] : action;
                }
            });
        };

        // Event listeners
        document.querySelectorAll('.sci-keys .calc-btn[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                inputNumber(button.getAttribute('data-number'));
                this.animateButton(button);
            });
        });

        document.querySelectorAll('.sci-keys .calc-btn[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                
                if (action === 'clear') {
                    clearCalculator('all');
                } else if (action === 'clear-entry') {
                    clearCalculator('entry');
                } else if (action === 'backspace') {
                    backspace();
                } else if (action === 'decimal') {
                    inputDecimal();
                } else if (action === 'calculate') {
                    calculateExpression();
                } else if (action === 'plus-minus') {
                    togglePlusMinus();
                } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
                    inputOperator(action);
                } else {
                    inputFunction(action);
                }
                this.animateButton(button);
            });
        });

        // Keyboard support for scientific calculator
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('sci-display')) {
                if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
                    inputNumber(e.key);
                } else if (e.key === '+') {
                    inputOperator('add');
                } else if (e.key === '-') {
                    inputOperator('subtract');
                } else if (e.key === '*') {
                    inputOperator('multiply');
                } else if (e.key === '/') {
                    inputOperator('divide');
                } else if (e.key === 'Enter' || e.key === '=') {
                    e.preventDefault();
                    calculateExpression();
                } else if (e.key === 'Escape') {
                    clearCalculator('all');
                } else if (e.key === 'Backspace') {
                    backspace();
                } else if (e.key === 'p' && e.ctrlKey) {
                    e.preventDefault();
                    inputFunction('pi');
                }
            }
        });

        updateDisplay();
    }

    factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Age Calculator
    initializeAgeCalculator() {
        const calculateBtn = document.getElementById('calculate-age');
        if (!calculateBtn) return;

        calculateBtn.addEventListener('click', () => {
            this.animateButton(calculateBtn);
            
            const birthDate = new Date(document.getElementById('birth-date').value);
            const ageAtDate = document.getElementById('age-at-date').value ? 
                new Date(document.getElementById('age-at-date').value) : new Date();

            if (!birthDate.getTime()) {
                this.showError('Please enter a valid birth date');
                return;
            }

            if (birthDate > ageAtDate) {
                this.showError('Birth date cannot be in the future');
                return;
            }

            const age = this.calculateAge(birthDate, ageAtDate);
            this.displayAgeResult(age);
        });
    }

    calculateAge(birthDate, ageAtDate) {
        let years = ageAtDate.getFullYear() - birthDate.getFullYear();
        let months = ageAtDate.getMonth() - birthDate.getMonth();
        let days = ageAtDate.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(ageAtDate.getFullYear(), ageAtDate.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }

    displayAgeResult(age) {
        document.getElementById('years').textContent = age.years;
        document.getElementById('months').textContent = age.months;
        document.getElementById('days').textContent = age.days;
        
        const resultBox = document.getElementById('age-result');
        resultBox.style.display = 'block';

        const info = document.getElementById('age-info');
        if (age.years < 1) {
            info.innerHTML = `<p>You are ${age.months} months and ${age.days} days old</p>`;
        } else {
            info.innerHTML = `<p>Your exact age is ${age.years} years, ${age.months} months, and ${age.days} days</p>`;
        }
    }

    // BMI Calculator
    initializeBMICalculator() {
        const calculateBtn = document.getElementById('calculate-bmi');
        if (!calculateBtn) return;

        // Unit toggle
        const unitBtns = document.querySelectorAll('.unit-btn');
        unitBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                unitBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const unit = btn.getAttribute('data-unit');
                document.getElementById('metric-section').style.display = unit === 'metric' ? 'block' : 'none';
                document.getElementById('imperial-section').style.display = unit === 'imperial' ? 'block' : 'none';
            });
        });

        calculateBtn.addEventListener('click', () => {
            this.animateButton(calculateBtn);
            
            const unit = document.querySelector('.unit-btn.active').getAttribute('data-unit');
            let bmi;

            if (unit === 'metric') {
                const weight = parseFloat(document.getElementById('weight-kg').value);
                const height = parseFloat(document.getElementById('height-cm').value) / 100;
                
                if (!weight || !height || height === 0) {
                    this.showError('Please enter valid weight and height');
                    return;
                }

                bmi = weight / (height * height);
            } else {
                const weight = parseFloat(document.getElementById('weight-lbs').value);
                const feet = parseFloat(document.getElementById('height-ft').value);
                const inches = parseFloat(document.getElementById('height-in').value);
                
                if (!weight || (!feet && !inches)) {
                    this.showError('Please enter valid weight and height');
                    return;
                }

                const totalInches = (feet * 12) + (inches || 0);
                const heightMeters = totalInches * 0.0254;
                bmi = weight / (heightMeters * heightMeters);
            }

            this.displayBMIResult(bmi);
        });
    }

    displayBMIResult(bmi) {
        const bmiValue = document.getElementById('bmi-value');
        const bmiCategory = document.getElementById('bmi-category');
        const scaleFill = document.getElementById('scale-fill');
        const bmiInfo = document.getElementById('bmi-info');

        bmiValue.textContent = bmi.toFixed(1);
        
        let category, color, advice;

        if (bmi < 18.5) {
            category = 'Underweight';
            color = '#f97316';
            advice = 'Consider consulting a healthcare provider for weight gain advice';
        } else if (bmi < 25) {
            category = 'Normal weight';
            color = '#10b981';
            advice = 'Maintain your current weight with healthy habits';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = '#f59e0b';
            advice = 'Consider healthy eating and regular exercise';
        } else {
            category = 'Obese';
            color = '#ef4444';
            advice = 'Consult a healthcare provider for weight management advice';
        }

        bmiCategory.textContent = category;
        bmiCategory.style.color = color;
        
        let fillPercentage = 0;
        if (bmi > 40) fillPercentage = 100;
        else if (bmi < 15) fillPercentage = 0;
        else fillPercentage = ((bmi - 15) / 25) * 100;
        
        scaleFill.style.width = `${fillPercentage}%`;
        scaleFill.style.background = color;

        bmiInfo.innerHTML = `
            <p><strong>BMI Category:</strong> ${category}</p>
            <p><strong>Health Advice:</strong> ${advice}</p>
        `;

        document.getElementById('bmi-result').style.display = 'block';
    }

    // Interest Calculator
    initializeInterestCalculator() {
        const calculateBtn = document.getElementById('calculate-interest');
        if (!calculateBtn) return;

        // Interest type toggle
        const interestBtns = document.querySelectorAll('.interest-btn');
        interestBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                interestBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const type = btn.getAttribute('data-type');
                document.querySelector('.compound-options').style.display = 
                    type === 'compound' ? 'block' : 'none';
            });
        });

        calculateBtn.addEventListener('click', () => {
            this.animateButton(calculateBtn);
            
            const principal = parseFloat(document.getElementById('principal').value);
            const rate = parseFloat(document.getElementById('rate').value);
            const years = parseFloat(document.getElementById('years').value) || 0;
            const months = parseFloat(document.getElementById('months').value) || 0;
            const interestType = document.querySelector('.interest-btn.active').getAttribute('data-type');
            
            if (!principal || !rate || (years === 0 && months === 0)) {
                this.showError('Please enter valid values for all fields');
                return;
            }

            const time = years + (months / 12);
            let totalAmount, interest;

            if (interestType === 'simple') {
                interest = (principal * rate * time) / 100;
                totalAmount = principal + interest;
            } else {
                const compounding = parseInt(document.getElementById('compounding').value);
                const n = compounding;
                const r = rate / 100;
                totalAmount = principal * Math.pow(1 + r/n, n * time);
                interest = totalAmount - principal;
            }

            this.displayInterestResult(principal, interest, totalAmount, time, interestType);
        });
    }

    displayInterestResult(principal, interest, totalAmount, time, type) {
        document.getElementById('result-principal').textContent = `₹${principal.toFixed(2)}`;
        document.getElementById('result-interest').textContent = `₹${interest.toFixed(2)}`;
        document.getElementById('result-total').textContent = `₹${totalAmount.toFixed(2)}`;
        document.getElementById('result-time').textContent = `${time.toFixed(1)} years`;

        const resultBox = document.getElementById('interest-result');
        resultBox.style.display = 'block';

        // Update chart if available
        this.updateInterestChart(principal, interest, type);
    }

    updateInterestChart(principal, interest, type) {
        const canvas = document.getElementById('interestChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Clear previous chart
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get device width for responsive sizing
        const isMobile = window.innerWidth <= 768;
        const chartWidth = isMobile ? Math.min(300, canvas.parentElement.clientWidth - 40) : 400;
        const chartHeight = isMobile ? 180 : 200;
        
        // Set canvas dimensions
        canvas.width = chartWidth;
        canvas.height = chartHeight;
        
        const total = principal + interest;
        const principalWidth = (principal / total) * chartWidth;
        const interestWidth = (interest / total) * chartWidth;

        // Draw principal
        ctx.fillStyle = '#f97316';
        ctx.fillRect(0, 40, principalWidth, 50);
        
        // Draw interest
        ctx.fillStyle = type === 'simple' ? '#10b981' : '#f59e0b';
        ctx.fillRect(principalWidth, 40, interestWidth, 50);
        
        // Labels - adjust font size for mobile
        const fontSize = isMobile ? 12 : 14;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#1f2937';
        ctx.font = `${fontSize}px Inter, sans-serif`;
        
        // Center labels
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Principal label
        if (principalWidth > 40) {
            ctx.fillText('Principal', principalWidth / 2, 20);
        }
        
        // Interest label
        if (interestWidth > 40) {
            ctx.fillText('Interest', principalWidth + (interestWidth / 2), 20);
        }
        
        // Values at bottom
        ctx.font = isMobile ? '11px Inter' : '13px Inter';
        
        if (principalWidth > 60) {
            ctx.fillText(`₹${principal.toFixed(2)}`, principalWidth / 2, chartHeight - 20);
        }
        
        if (interestWidth > 60) {
            ctx.fillText(`₹${interest.toFixed(2)}`, principalWidth + (interestWidth / 2), chartHeight - 20);
        }
        
        // Add a legend for better understanding
        const legendY = chartHeight + 25;
        
        // Principal legend
        ctx.fillStyle = '#f97316';
        ctx.fillRect(10, legendY, 12, 12);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#1f2937';
        ctx.font = isMobile ? '11px Inter' : '12px Inter';
        ctx.textAlign = 'left';
        ctx.fillText('Principal Amount', 28, legendY + 6);
        
        // Interest legend
        const legendX = isMobile ? (chartWidth / 2) : (chartWidth / 2) + 20;
        ctx.fillStyle = type === 'simple' ? '#10b981' : '#f59e0b';
        ctx.fillRect(legendX, legendY, 12, 12);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#1f2937';
        ctx.fillText(
            `${type === 'simple' ? 'Simple' : 'Compound'} Interest`, 
            legendX + 18, 
            legendY + 6
        );
    }

    // Utility Functions
    showError(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    initializeEventListeners() {
        // Chart responsive resizing
        const makeChartResponsive = () => {
            const chartCanvas = document.getElementById('interestChart');
            if (!chartCanvas) return;
            
            const container = chartCanvas.parentElement;
            const containerWidth = container.clientWidth;
            
            // Set canvas width based on container
            chartCanvas.width = Math.min(400, containerWidth - 40);
            
            // Adjust height for mobile
            if (window.innerWidth <= 768) {
                chartCanvas.height = 180;
            } else {
                chartCanvas.height = 200;
            }
            
            // Redraw chart if data exists
            if (window.lastInterestData) {
                const { principal, interest, type } = window.lastInterestData;
                this.updateInterestChart(principal, interest, type);
            }
        };

        // Store last interest data for redrawing
        window.lastInterestData = null;
        
        // Override displayInterestResult to store data
        const originalDisplayInterestResult = this.displayInterestResult;
        this.displayInterestResult = (principal, interest, totalAmount, time, type) => {
            window.lastInterestData = { principal, interest, type };
            originalDisplayInterestResult.call(this, principal, interest, totalAmount, time, type);
            setTimeout(makeChartResponsive, 100);
        };

        // Call on load and resize
        window.addEventListener('load', makeChartResponsive);
        window.addEventListener('resize', makeChartResponsive);

        // Also trigger on calculation
        const calculateBtn = document.getElementById('calculate-interest');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                setTimeout(makeChartResponsive, 200);
            });
        }
    }
}

// Initialize CalcPro when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.calcPro = new CalcPro();
});