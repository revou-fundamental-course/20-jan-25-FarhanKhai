// Javascript for BMI Calculator 
// Muhammad Farhan Khairullah - 2025


const BMI_CATEGORIES = {
    UNDERWEIGHT: 'underweight',
    NORMAL: 'normal (ideal)',
    OVERWEIGHT: 'overweight',
    OBESITY: 'obese',
};

// Fungsi untuk menghitung BMI berdasarkan tinggi dan berat badan.
const calculateBMI =  (weight, height) => {
    let bmi = weight / ((height / 100) ** 2);

    return bmi.toFixed(1);
}

// Fungsi untuk memvalidasi input berat badan, tinggi badan, usia dan jenis kelamin
const validateInput = (weight, height, age, gender) => {
    console.log("DEBUG: Validating inputs", { weight, height, age, gender}); // For debugging

    // Mengambil elemen error message untuk masing-masing input
    const genderErrorMessage = document.getElementById('gender-error-message');
    const ageErrorMessage = document.getElementById('age-error-message');
    const weightErrorMessage = document.getElementById('weight-error-message');
    const heightErrorMessage = document.getElementById('height-error-message');

    // Reset pesan error sebelumnya
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((element) => (element.innerText = ''));

    let isValid = true;

    // Validate age
    if (isNaN(age) || age <= 0) {
        ageErrorMessage.innerText = 'Age must be filled and must be more than 0';
        isValid = false;
    }

    // Validate height
    if (isNaN(height) || height <= 0) {
        heightErrorMessage.innerText = 'Height must be filled and must be more than 0';
        isValid = false;
    }

    // Validate body weight
    if (isNaN(weight) || weight <= 0) {
        weightErrorMessage.innerText = 'Body weight must be filled and must be more than 0';
        isValid = false;
    }

    console.log("DEBUG: Validation result", { isValid });
    return isValid;
};

// Fungsi untuk cek status BMI berdasarkan BMI dan Gender
const checkStatus = (bmi, gender) => {
    let status = "";
    gender = gender.toLowerCase(); //memastikan akan selalu lowercase

    if (gender === "male") {
        if (bmi < 18.5) status = BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi < 25) status = BMI_CATEGORIES.NORMAL;
        else if (bmi < 30) status = BMI_CATEGORIES.OVERWEIGHT;
        else status = BMI_CATEGORIES.OBESITY;
    } else if (gender === "female") {
        if (bmi < 17) status = BMI_CATEGORIES.UNDERWEIGHT;
        else if (bmi <= 23.9) status = BMI_CATEGORIES.NORMAL;
        else if (bmi <= 27.0) status = BMI_CATEGORIES.OVERWEIGHT;
        else status = BMI_CATEGORIES.OBESITY;
    }

    console.log("Gender:", gender, "| BMI Status:", status); // Debugging
    return status;
};

// Fungsi untuk mendapatkan teks penjelasan berdasarkan status BMI yang didapat
const getDescText = (status) => {
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
        return "You are in the underweight range.";
    } else if (status === BMI_CATEGORIES.NORMAL) {
        return "You are in the normal weight range.";
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return "You are in the overweight range.";
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return "You are in the obese range.";
    }
};

// Fungsi untuk mendapatkan teks saran berdasarkan status BMI yang didapat
const getSuggestionText = (status) => {
    if (status ===  BMI_CATEGORIES.UNDERWEIGHT) {
        return "This BMI range suggests you increase your body weight to reach the normal weight range.";
    } else if (status === BMI_CATEGORIES.NORMAL) {
        return "This BMI range means you currently have normal and ideal body weight.";
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return "This BMI range suggests you take cautions in your diet until you reach the normal range.";
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return "This BMI range suggests you to consult with a healthcare professional.";
    }
};

// Fungsi untuk mendapatkan teks saran gizi berdasarkan status BMI
const getAdviceText = (status) => {
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
        return 'Improve your nutritional intake with nutritious food and consult a doctor to achieve ideal body weight.';
    } else if ( status === BMI_CATEGORIES.NORMAL) {
        return 'Maintain a healthy lifestyle by maintaining a balanced diet and exercising regularly.';
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return 'Reduce calorie intake and increase physical activity to help lose weight.';
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return 'Talk to a dietician or your healthcare provider for a solution or safe and effective weight loss program.';
    }
};
    
// Fungsi untuk mendapatkan daftar penyakit berdasarkan status BMI
const getDiseases = (status) => {
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
        return ['Malnutrition', 'Stunting, Wasting or Growth Impairment', 'Weak Immune System', 'Infertility'];
    } else if (status === BMI_CATEGORIES.NORMAL) {
        return ['None'];
    } else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        return ['Type 2 Diabetes', 'Heart Attack', 'Hypertension', 'Gastroesophageal Reflux Disease', 'Osteoarthritis', 'Cancer', 'High Cholesterol'];
    } else if (status === BMI_CATEGORIES.OBESITY) {
        return ['Heart Diseases', 'Stroke', 'Cancer', 'Digestive Problems', 'Sleep Apnea', 'Osteoartritis']
    }
};

// Fungsi untuk menampilkan hasil BMI, status, saran, dan risiko penyakit
const generateDisplay = (bmi, status) => {
    const resultTitle = document.getElementById('result-category');
    resultTitle.innerText = status;
    const resultBmi = document.getElementById('bmi-result');
    resultBmi.innerText = bmi;
    const resultDesc = document.getElementById('result-desc');
    resultDesc.innerText = getDescText(status);

    const resultText = document.getElementById('result-text');
    resultText.innerText = `BMI Result: ${bmi}`;

    const suggestionText = document.getElementById('suggestion-text');
    suggestionText.innerText = getSuggestionText(status);

    const adviceText = document.getElementById('advice-text');
    adviceText.innerText = getAdviceText(status);

    const riskTitle = document.getElementById('risk-title')
    riskTitle.innerText = `Several disease risks that originate from the ${status} body range`;

    const riskList = document.getElementById('list-risk');
    riskList.innerHTML = '';

    const diseases = getDiseases(status);
    diseases.forEach((disease) => {
        const listItem = document.createElement('li');
        listItem.innerText = disease;
        riskList.appendChild(listItem);
    });
};

// Fungsi untuk mengecek BMI dan menampilkan hasil
const checkBMI = () => {
    // Mengambil nilai input dengan benar
    const weight = +document.getElementById('weight-input').value;
    const height = +document.getElementById('height-input').value;
    const age = +document.getElementById('age-input').value;

    // Mengambil nilai gender dengan aman
    const genderInput = document.querySelector('input[name="gender-input"]:checked');
    const gender = genderInput ? genderInput.value.toLowerCase() : "";

    console.log("Weight:", weight, "Height:", height, "Age:", age, "Gender:", gender); // Debugging

    // Jika gender kosong, tampilkan pesan error
    if (!gender) {
        document.getElementById('gender-error-message').innerText = "Please choose your respective gender!";
        return;
    }

    if (!validateInput(weight, height, age, gender)) {
        console.warn("Validasi gagal.");
        return;
    }

    const bmi = calculateBMI(weight, height);
    console.log("BMI:", bmi);

    const status = checkStatus(bmi, gender);
    console.log("Status BMI:", status);

    generateDisplay(bmi, status);
};