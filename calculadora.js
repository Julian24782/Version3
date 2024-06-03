class Calculator extends HTMLElement {
    constructor() {
        super();
        this.display = this.querySelector('#display');
        this.button0 = this.querySelector('#button0');
        this.button1 = this.querySelector('#button1');
        this.button2 = this.querySelector('#button2');
        this.buttonPlus = this.querySelector('#buttonPlus');
        this.buttonCalculate = this.querySelector('#buttonCalculate');

        this.button0.addEventListener('click', this.onButton0Click.bind(this));
        this.button1.addEventListener('click', this.onButton1Click.bind(this));
        this.button2.addEventListener('click', this.onButton2Click.bind(this));
        this.buttonPlus.addEventListener('click', this.onButtonPlusClick.bind(this));
        this.buttonCalculate.addEventListener('click', this.onButtonCalculateClick.bind(this));
    }

    onButton0Click() {
        this.display.value += '0';
    }

    onButton1Click() {
        this.display.value += '1';
    }

    onButton2Click() {
        this.display.value += '2';
    }

    onButtonPlusClick() {
        this.display.value += '+';
    }

    onButtonCalculateClick() {
        this.display.value = eval(this.display.value);
    }
}

customElements.define('calculator', Calculator);