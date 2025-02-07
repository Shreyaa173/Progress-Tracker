// Table.js
export const Table = ({ children }) => {
    return <table className="min-w-full divide-y divide-gray-200">{children}</table>;
  };
  
  // Card.js
  export const Card = ({ children, className }) => {
    return <div className={`shadow-lg rounded-lg ${className}`}>{children}</div>;
  };
  
  // CardHeader.js
  export const CardHeader = ({ children }) => {
    return <div className="px-4 py-5 border-b border-gray-200">{children}</div>;
  };
  
  // CardTitle.js
  export const CardTitle = ({ children }) => {
    return <h3 className="text-lg font-medium leading-6 text-gray-900">{children}</h3>;
  };
  
  // CardContent.js
  export const CardContent = ({ children, className }) => {
    return <div className={`px-4 py-5 ${className}`}>{children}</div>;
  };
  
  // Badge.js
  export const Badge = ({ children, className }) => {
    return (
      <span className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-medium ${className}`}>
        {children}
      </span>
    );
  };
  
  import React, { useState } from "react";


  export const Select = ({ children, value, onValueChange }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleSelect = (newValue) => {
      onValueChange(newValue);
      setIsOpen(false); // Close the dropdown after selection
    };
  
    return (
      <div className="relative inline-block text-left w-full">
        <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
          <SelectValue value={value} />
        </SelectTrigger>
        {isOpen && (
          <SelectContent>
            {React.Children.map(children, (child) =>
              React.cloneElement(child, { onClick: () => handleSelect(child.props.value) })
            )}
          </SelectContent>
        )}
      </div>
    );
  };
  
  export const SelectTrigger = ({ children, ...props }) => (
    <button
      {...props}
      className="inline-flex items-center justify-between w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white hover:bg-gray-100"
    >
      {children}
    </button>
  );
  
  export const SelectValue = ({ value, placeholder = "Select an option" }) => (
    <span className="text-sm text-gray-500">{value}</span>
  );
  
  export const SelectContent = ({ children }) => (
    <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg border border-gray-300">
      {children}
    </div>
  );
  
  export const SelectItem = ({ children, onClick, value }) => (
    <button
      onClick={onClick}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      value={value}
    >
      {children}
    </button>
  );
  

// Input.js
export const Input = ({ type = "text", placeholder = "", value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
};
