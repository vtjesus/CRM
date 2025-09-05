import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-8">
            <div className="text-center space-y-6 max-w-md">
                
                <div className="relative">
                    <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                        404
                    </h1>
                    <div className="absolute inset-0 text-8xl font-black text-gray-200 -z-10 blur-sm">
                        404
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        The page you're looking for seems to have wandered off. 
                        Let's get you back on track!
                    </p>
                </div>

                
                <button
                    onClick={() => navigate("/")}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                    <span className="flex items-center gap-2">
                        <svg 
                            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </span>
                </button>

                
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>
        </div>
    );
};