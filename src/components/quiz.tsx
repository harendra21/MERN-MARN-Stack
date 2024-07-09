import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, Query } from "../lib/appwrite"

interface Option {
    title: string;
    description: string;
    options: string[];
    answer: number;
}

const Quiz = () => {
    const { quizType } = useParams<{ quizType: string }>();  // Get quizType from URL parameter
    const [quizData, setQuizData] = useState<Option[]>([]);
    const [quizDetails, setQuizDetails] = useState({ "title": "" });
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!quizType) return;

        const fetchQuizData = async () => {
            db.listDocuments(
                "665dbea70000ce8c4636",
                "665dbebd0022a5a57f8f",
                [
                    Query.equal("route", quizType)
                ]
            ).then((data: any) => {
                if (data.total > 0) {
                    let questions = JSON.parse(data.documents[0].questions)
                    setQuizData(questions);
                    setQuizDetails({ "title": data.documents[0].title })
                }
            })
        };

        fetchQuizData();
    }, [quizType]);  // Depend on quizType to fetch data when it changes

    const handleOptionClick = (index: number) => {
        setSelectedOption(index);
    };

    const handleNextQuestion = () => {
        if (selectedOption === quizData[currentQuestion]?.answer) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedOption(null);
        } else {
            setShowScore(true);
            navigate('/results', { state: { score, total: quizData.length, quizDetails } });
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedOption(null);
        }
    };

    if (quizData.length === 0) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
                {showScore ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">You scored {score} out of {quizData.length}</h2>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-4 text-center">{quizDetails?.title} Quiz</h1>

                        <h2 className="text-xl font-bold mb-4">{quizData[currentQuestion].title}</h2>
                        <p className="mb-4">{quizData[currentQuestion].description}</p>
                        <div className="space-y-2">
                            {quizData[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                    className={`block w-full text-left px-4 py-2 rounded-lg border ${selectedOption === index ? 'bg-blue-500 text-white' : 'bg-white text-black'} hover:bg-blue-500 hover:text-white `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handlePreviousQuestion}
                                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                                disabled={currentQuestion === 0}
                            >
                                Previous Question
                            </button>
                            <button
                                onClick={handleNextQuestion}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Next Question
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
