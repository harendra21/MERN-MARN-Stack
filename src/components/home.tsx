import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, Query } from "../lib/appwrite";

interface Quiz {
    title: string;
    description: string;
    route: string;
}

interface Interview {
    title: string;
    description: string;
    route: string;
}

const Home = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [interviews, setInterviews] = useState<Interview[]>([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            db.listDocuments(
                "665dbea70000ce8c4636",
                "665dbebd0022a5a57f8f",
                [Query.select(["title", "description", "route"])]
            ).then((data: any) => {
                if (data.total > 0) {
                    setQuizzes(data.documents);
                }
            })
        }

        const fetchInterviews = async () => {
            db.listDocuments(
                "665dbea70000ce8c4636",
                "668d1a24000f83ef2699",
                [Query.select(["title", "description", "route"])]
            ).then((data: any) => {
                if (data.total > 0) {
                    setInterviews(data.documents);
                }
            })
        };

        fetchQuizzes();
        fetchInterviews();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-6xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Quizzes</h1>
                {quizzes.length === 0 ? <div className="text-center">Loading...</div> : ""}
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

                <h1 className="text-3xl font-bold mb-8 mt-8 text-center">Interview Questions</h1>
                {interviews.length === 0 ? <div className="text-center">Loading...</div> : ""}
                <div className="grid gap-6 md:gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
                    {interviews.map((interview, index) => (
                        <Link
                            key={index}
                            to={`/interview/${interview.route}`}
                            className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <h2 className="text-xl font-semibold mb-2">{interview.title}</h2>
                            <p className="text-gray-600">{interview.description}</p>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Home;
