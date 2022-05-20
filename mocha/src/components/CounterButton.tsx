import React from "react";

export const CounterButton: React.FC <{callback: any, initial: number}> = ({callback, initial}) => {

    const addCount = () => {
        callback((prev: number) => prev + 1);
    };

    const minusCount = () => {
        callback((prev: number) => (prev > 0 ? prev - 1 : prev));
    };

    return (
        <div className="flex flex-row justify-between">
            <div className="flex">
                <span onClick={minusCount} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded-full cursor-pointer border border-2 border-green-800 w-7 h-7 flex items-center justify-center pb-1 text-green-800">
                    -
                </span>
                <input id="counter" aria-label="input" className="h-full text-center w-7 h-7 pb-1 text-gray-600" type="text"
                       value={initial.toString()}
                       onChange={(e) => e.target.value} />
                <span onClick={addCount} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded-full cursor-pointer border border-2 border-green-800 w-7 h-7 flex items-center justify-center pb-1 text-green-800">
                    +
                </span>
            </div>
        </div>
    );
}