document.addEventListener('DOMContentLoaded', function() {
    // Consolidated function calls for fetching personalized summaries and actionable recommendations
    fetchPersonalizedSummaries(); 
    fetchActionableRecommendations();
    initializeChatbot();
    loadCustomerSurveyData(); 
});

function loadCustomerSurveyData() {
    fetch('customer_satisfaction_survey_results_extended.csv')
        .then(response => response.text())
        .then(csvText => {
            const data = csvText.split('\n').slice(1); // Split by newline and remove header
            let totalCustomers = 0;
            let recommendCount = 0;
            let satisfactionScores = [];
            let feedbacks = [];
            data.forEach(row => {
                const columns = row.split(',');
                // Adjusted for correct column indexing
                const satisfactionScore = parseFloat(columns[4]); 
                const wouldRecommend = columns[5]; 
                const feedback = columns[6]; 
                satisfactionScores.push(satisfactionScore);
                feedbacks.push(feedback);
                totalCustomers++;
                if (wouldRecommend.toLowerCase() === 'yes') {
                    recommendCount++;
                }
            });
            const recommendPercentage = (recommendCount / totalCustomers) * 100;
            console.log(`Percentage of customers who would recommend the company: ${recommendPercentage.toFixed(2)}%`);
            updatePersonalizedSummaries(satisfactionScores, feedbacks);
            updateActionableRecommendations(recommendPercentage);
        })
        .catch(error => console.error('Error loading the CSV file:', error));
}

function updatePersonalizedSummaries(satisfactionScores, feedbacks) {
    // Consolidated function definition with additional positive terms
    const averageScore = satisfactionScores.reduce((acc, score) => acc + score, 0) / satisfactionScores.length;
    const positiveFeedbacks = feedbacks.filter(feedback => feedback.includes('good') || feedback.includes('excellent') || feedback.includes('amazing') || feedback.includes('great'));
    
    const summariesSection = document.getElementById('personalized-summaries');
    summariesSection.innerHTML = `<p>Average Satisfaction Score: ${averageScore.toFixed(2)}</p>`;
    if (positiveFeedbacks.length > 0) {
        summariesSection.innerHTML += `<p>Positive Feedback Highlights: ${positiveFeedbacks.join(', ')}</p>`;
    }
}

function updateActionableRecommendations(recommendPercentage) {
    // Function definition with recommendations based on customer feedback percentage
    let recommendation;
    if (recommendPercentage > 90) {
        recommendation = "Keep up the good work! Most customers would recommend our company.";
    } else if (recommendPercentage > 70) {
        recommendation = "There's room for improvement. Let's identify areas where we can do better.";
    } else {
        recommendation = "We need to take immediate action to improve customer satisfaction.";
    }
    
    const recommendationsSection = document.getElementById('actionable-recommendations');
    recommendationsSection.innerHTML = `<p>${recommendation}</p>`;
}

function fetchActionableRecommendations() {
    // Updated function call for fetching actionable recommendations
    const recommendations = "Considering the current market trends, focusing on AI ethics could significantly improve stakeholder trust.";
    const recommendationsSection = document.getElementById('actionable-recommendations');
    recommendationsSection.innerHTML += `<p>${recommendations}</p>`;
}

function initializeChatbot() {
    // Function definition for initializing chatbot
    const chatbotSection = document.getElementById('chatbot-interface');
    const chatbotContent = `<div>Your AI assistant is ready to help. Ask me anything!</div>`;
    chatbotSection.innerHTML += chatbotContent;

    document.getElementById('chatbot').addEventListener('click', () => {
        alert("I'm your AI assistant. How can I assist you today?");
    });
}
