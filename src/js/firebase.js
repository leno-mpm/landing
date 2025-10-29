import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBuAJ4Q2Cmd5X6WT0v0OHcWBy9zmi5dFoQ",
    authDomain: "landing-e0229.firebaseapp.com",
    projectId: "landing-e0229",
    storageBucket: "landing-e0229.firebasestorage.app",
    messagingSenderId: "137054712017",
    appId: "1:137054712017:web:8fef4eeabf2918d47915f0",
    measurementId: "G-59TD4P7HYJ"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let saveVotes= (productId) => {
    const votesRef= ref(database, 'votes');
    const newVoteRef= push(votesRef);

    return set (newVoteRef, {
        productId: productId, 
        timestamp: Date.now()
    })
    .them (()=> {
        return {
            status: true,
            message: "Vote saved successfully"
        }
    })
    .catch((error) => {
        console.error("Error saving vote: ", error);
        return{
            status: false,
            message: "Error saving vote"
        }
    });
}

export{ saveVotes};