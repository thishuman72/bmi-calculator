/*

To make this code more robust:

1. Move natural language to a separate file


*/

(function () {
    this.renderDelayTimeout = null 

    // UI Elements
    this.UI = {
        unitsSelect:          document.querySelector('#hero-bmi-calculator-units-select'),
        heightInput:          document.querySelector('#hero-bmi-calculator-height-input'),
        weightInput:          document.querySelector('#hero-bmi-calculator-weight-input'),
        welcomeMessage:       document.querySelector('#hero-bmi-calculator-welcome-message'),
        outputContainer:      document.querySelector('#hero-bmi-calculator-results-container'),
        bmiOutput:            document.querySelector('#hero-bmi-calculator-results-number'),
        classificationOutput: document.querySelector('#hero-bmi-calculator-results-classification'),
        idealWeightOutput:    document.querySelector('#hero-bmi-calculator-results-ideal-weight')
    }

    // State
    this.user = {
        units:  'metric',
        height: 0,
        weight: 0
    }

    // Event handlers
    this.setup = function() {
        this.UI.unitsSelect.addEventListener('change', this.changeUnits.bind(this))
        this.UI.heightInput.addEventListener('input', this.updateHeight.bind(this))
        this.UI.weightInput.addEventListener('input', this.updateWeight.bind(this))
    }

    this.changeUnits = function() {
        user.units = UI.unitsSelect.value
        this.UI.heightInput.placeholder = user.units === 'metric' ? 'cm' : 'in'
        this.UI.weightInput.placeholder = user.units === 'metric' ? 'kg' : 'lbs'

        this.UI.heightInput.classList.toggle('metric', user.units === 'metric')
        this.UI.weightInput.classList.toggle('metric', user.units === 'metric')
        
        this.UI.heightInput.classList.toggle('imperial', user.units === 'imperial')
        this.UI.heightInput.classList.toggle('imperial', user.units === 'imperial')

        this.render()
    }
    this.updateHeight = function() {
        user.height = UI.heightInput.value
        this.render()
    }
    this.updateWeight = function() {
        user.weight = UI.weightInput.value
        this.render()
    }

    // Methods
    this.getBMI = function() {
        if (user.height === 0 || user.weight === 0) {
            return 0
        }
        if (user.units === 'metric') {
            return user.weight / (user.height/100 * user.height/100)
        }
        else {
            return (user.weight * 703) / (user.height * user.height)
        }
    }

    this.getHealthyWeightRange = function() {
        if (user.units === 'metric') {
            return {
                min: 18.5 * (user.height/100 * user.height/100).toFixed(1) + 'kgs',
                max: 25 *   (user.height/100 * user.height/100).toFixed(1) + 'kgs',
            }
        }
        else {
            return {
                min: 18.5 * ((user.height * user.height) / 703).toFixed(1) + 'lbs',
                max: 25 *   ((user.height * user.height) / 703).toFixed(1) + 'lbs',
            }
        }
    }

    this.getWeightClassification = function() {
        let bmi = this.getBMI()
        if (bmi < 18.5) {
            return 'Underweight'
        }
        else if (bmi >= 18.5 && bmi < 25) {
            return 'Normal'
        }
        else if (bmi >= 25 && bmi < 30) {
            return 'Overweight'
        }
        else {
            return 'Obese'
        }
    }

    // Render
    this.render = function() {
        this.clearTimeout(this.renderDelayTimeout)
        this.renderDelayTimeout = setTimeout(function() {
            const bmi = this.getBMI()
            console.log(bmi)
            if (bmi === 0) {
                this.UI.outputContainer.classList.add('hidden')
                this.UI.welcomeMessage.classList.remove('hidden')

                this.UI.bmiOutput.innerHTML = 'N/A'
                this.UI.classificationOutput.innerHTML = 'N/A'
                this.UI.idealWeightOutput.innerHTML = 'N/A'
                return
            }

            this.UI.outputContainer.classList.remove('hidden')
            this.UI.welcomeMessage.classList.add('hidden')

            const weightClassification = this.getWeightClassification()
            const healthyWeightRange = this.getHealthyWeightRange()
            this.UI.bmiOutput.innerHTML = bmi.toFixed(1)
            this.UI.classificationOutput.innerHTML = weightClassification
            this.UI.idealWeightOutput.innerHTML = `${healthyWeightRange.min} - ${healthyWeightRange.max}`
        }, 500)
    }

    // Initialize
    this.setup()
})()