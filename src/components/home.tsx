import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Quiz {
    title: string;
    description: string;
    route: string;
}

const Home = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('/quiz/allquizzes.json');
                if (!response.ok) throw new Error('Network response was not ok.');
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-6xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Available Quizzes</h1>
                <div className="grid gap-6 md:gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
                    {quizzes.map((quiz, index) => (
                        <Link
                            key={index}
                            to={`/quiz/${quiz.route}`}
                            className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
                            <p className="text-gray-600">{quiz.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
