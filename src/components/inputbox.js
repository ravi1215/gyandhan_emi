const InputBox=({ value, onChange, placeholder }) => {
    return (
        <div className="relative rounded-md shadow-sm">
            <label
                htmlFor="number-input"
                className={`${value!==''? 'top-2/3':'invisible'
                    } transition-all left-2 px-1 z-10`}
            >
                {placeholder}
            </label>
            <input
                type="number"
                name="input"
                id="input"
                className="block w-full py-2 pl-3 pr-3 text-sm leading-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-indigo-500 transition duration-150 ease-in-out"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputBox;