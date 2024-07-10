import { useLocation, Link } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const { score, total, quizDetails, userAnswers, quizData } = location.state as { score: number; total: number, quizDetails: any, userAnswers: any, quizData: any };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Result - {quizDetails.title} Quiz</h2>
                <p className="mb-4">You scored {score} out of {total}</p>
                <div className="text-left">
                    {userAnswers.map((answer: any, index: number) => (
                        <div key={index} className="mb-4 p-4 rounded-lg">
                            <h3 className="text-lg font-bold">{quizData[answer.questionIndex].title}</h3>
                            <p className="mb-2">{quizData[answer.questionIndex].description}</p>
                            <div className="space-y-2">
                                {quizData[answer.questionIndex].options.map((option: string, optIndex: number) => (
                                    <div
                                        key={optIndex}
                                        className={`px-4 py-2 rounded-lg border ${optIndex === answer.selectedOption ? (answer.isCorrect ? 'bg-green-200' : 'bg-red-200') : 'bg-white'}`}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-2">
                                {answer.isCorrect ? 'Correct' : 'Wrong'} - Your answer: {answer.selectedOption !== null ? quizData[answer.questionIndex].options[answer.selectedOption] : 'No answer selected'}
                            </p>
                        </div>
                    ))}
                </div>
                <Link to="/" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 inline-block">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default Results;
