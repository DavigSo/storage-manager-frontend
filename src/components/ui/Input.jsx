import React from 'react';

const Input = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`flex h-10 w-full rounded-md border-input 
      bg-white px-3 py-2 text-[#f68597] 
      file:border-0 file:bg-transparent file:text-sm file:font-medium 
      file:text-foreground placeholder:text-[#f68597]
      focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
      {...props} // <-- garante que value, onChange, type, id, etc. cheguem aqui
    />
  );
});

export default Input;
