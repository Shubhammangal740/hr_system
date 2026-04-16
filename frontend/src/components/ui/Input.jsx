const Input = ({ label, type = "text", value, onChange, placeholder, name, error, required = false, className = "" }) => {
    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`
                    px-3 py-2 rounded-lg border bg-white text-gray-900 text-sm
                    focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                    transition-all duration-200 outline-none
                    ${error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}
                `}
            />
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
    );
};

export default Input;
