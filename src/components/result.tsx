import { useLocation, Link } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const { score, total, quizDetails } = location.state as { score: number; total: number, quizDetails: any };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Result - {quizDetails.title} Quiz</h2>
                <p className="mb-4">You scored {score} out of {total}</p>
                <Link to="/" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 inline-block">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default Results;
