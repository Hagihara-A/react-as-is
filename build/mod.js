import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export const App = () => {
    const [name, setName] = useState("");
    return (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Hello React" }), _jsx("input", { onChange: (e) => setName(e.target.value) }), _jsx("p", { children: "Your name is..." }), _jsx("h3", { children: name.toUpperCase() })] }));
};
