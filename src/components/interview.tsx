import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, Query } from '../lib/appwrite';

interface Interview {
    title: string;
    answer: string;  // Assuming 'answer' is a string based on your initial description
}

const Interview = () => {
    const { interviewType } = useParams<{ interviewType: string }>();
    const [interviewData, setInterviewData] = useState<Interview[]>([]);
    const [interviewDetails, setInterviewDetails] = useState({ title: "" });
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!interviewType) return;

        const fetchInterviewData = async () => {

            db.listDocuments(
                "665dbea70000ce8c4636",
                "668d1a24000f83ef2699",
                [
                    Query.equal("route", interviewType)
                ]
            ).then((data: any) => {
                if (data.total > 0) {
                    let questions = JSON.parse(data.documents[0].questions)
                    setInterviewData(questions);
                    setInterviewDetails({ "title": data.documents[0].title });
                }
            })
        };



        fetchInterviewData();
    }, [interviewType]);

    const toggleAccordion = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    if (interviewData.length === 0) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-2xl font-bold mb-4 text-center">{interviewDetails?.title} Interview Questions & Answers</h1>
                {interviewData.map((data, index) => (
                    <div key={index} className="mb-4">
                        <div
                            className="flex justify-between items-center cursor-pointer text-xl font-bold mb-2"
                            onClick={() => toggleAccordion(index)}
                        >
                            {index + 1}. {data.title}
                            <span className="ml-2 transform transition-transform duration-300 ease-in-out">
                                {expandedIndex === index ? '▼' : '►'}
                            </span>
                        </div>
                        {expandedIndex === index && (
                            <div className="mb-2">
                                <p>{data.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Interview;
