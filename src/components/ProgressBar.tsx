import React, { useEffect, useState } from 'react';

type PropsType = {
    startFlag?: boolean,
    time?: number,
}

const ProgressBar: React.FC<PropsType> = ({ startFlag = false, time = 5 }) => {
    const [progress, setProgress] = useState<number>(0);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    useEffect(() => {
        if (startFlag) {
            startProgressBar()
        } else {
            endProgressBar();
        }
    }, [startFlag])

    const startProgressBar = () => {
        setIsProcessing(true);
        setProgress(0);

        const intervalId = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 99) {
                    console.log(prevProgress)
                    return prevProgress + 0.5;
                } else {
                    clearInterval(intervalId);
                    // setIsProcessing(false);
                    // return 100;
                    return 99;
                }
            });
        }, 10);
    };

    const endProgressBar = () => {
        setIsProcessing(false);
        setProgress(100);
    };

    return (
        <div className="w-full flex flex-col items-center m-auto">
            <div className="w-full relative pt-1">
                <div className="flex mb-2 items-center justify-center">
                    <div className="flex flex-col w-full">
                        <div className="bg-gray-800 rounded-full relative">
                            <div
                                className="animate-pulse rounded-full bg-[#3417FF] progress-bar-striped text-center py-3 text-xs font-semibold text-white"
                                style={{ width: `${progress.toFixed(1)}%` }}
                            ></div>

                            <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>{progress.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <button
                onClick={isProcessing ? endProgressBar : startProgressBar}
                className={`bg-${isProcessing ? 'red' : 'teal'}-500 text-white py-2 px-4 rounded`}
            >
                {isProcessing ? 'Stop' : 'Start'}
            </button> */}
        </div>
    );
};

export default ProgressBar;
