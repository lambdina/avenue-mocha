import React from "react";

export const CounterButton: React.FC<{callback: any}> = ({callback}) => {

    //TODO: Replace counter button by select sur une ligne because j'en ai marre

    return (
        <div className="flex flex-row justify-between">
            <div className="flex">
                <span onClick={callback} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded-lg cursor-pointer border bg-gray-50 w-7 h-7 flex items-center justify-center pb-1">
                    -
                </span>
                <input id="counter" aria-label="input" className="h-full text-center w-12 h-7 pb-1 " type="text"
                       value={callback}
                       onChange={(e) => e.target.value} />
                <span onClick={callback} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded-lg cursor-pointer border bg-gray-50 w-7 h-7 flex items-center justify-center pb-1 ">
                    +
                </span>
            </div>
        </div>
    );
}