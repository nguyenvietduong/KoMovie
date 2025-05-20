import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
    return (
        <nav className="text-sm text-white mb-2" aria-label="Breadcrumb">
            <ol className="list-reset flex flex-wrap items-center">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="flex items-center">
                            {!isLast ? (
                                <Link to={item.to} className="text-white hover:underline">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-300 italic">{item.label}</span>
                            )}
                            {!isLast && <span className="mx-2 text-white">{'>'}</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}