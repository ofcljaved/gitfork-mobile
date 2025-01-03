'use client'

import { useFormStatus } from "react-dom";
import Loader from "./ui/loader";

const FormLoader = () => {
    const { pending } = useFormStatus()
    if (!pending) return null;
    return (
        <div className="absolute z-50 inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[2px] animate-in animate-out">
            <Loader className="h-80 w-80" />
        </div>
    );
};

export default FormLoader;
