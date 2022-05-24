export const Input: React.FC<{isRequired: boolean, label: string, onChange:any, type:string, placeholder:string}> =(props) => {
    return (
        <div className="mb-8">
            <label className="block mb-2 text-sm font-medium text-gray-800">
                {props.label}</label>

            {props.isRequired &&
                <input
                    className="border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-green-700 focus:border-green-800 block w-full p-2.5"
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    type={props.type}
                    required/>
            }
            {!props.isRequired &&
                <input
                    className="border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-green-700 focus:border-green-800 block w-full p-2.5"
                    placeholder={props.placeholder}
                    type={props.type}
                    onChange={props.onChange}/>
            }
        </div>
    );

}
