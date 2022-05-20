import React from "react";


export const ToggleButton: React.FC<{label:string, callback:any, isDisabled:boolean}> = ({label, callback, isDisabled}) => {

    const handleClick = (e: any) => {
        callback((button: boolean) => !button);
    }

    return (
        <label className="flex relative items-center mb-5 cursor-pointer">
            {isDisabled &&
                <input type="checkbox" value="" id="disabled-toggle" className="sr-only peer" onChange={handleClick}/> }
            {!isDisabled &&
                <input type="checkbox" value="" id="checked-toggle" className="sr-only peer" onChange={handleClick}/> }
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-800"></div>
                <span className="ml-3 text-sm font-medium text-gray-400 dark:text-gray-500">{label}</span>
        </label>
    );
}