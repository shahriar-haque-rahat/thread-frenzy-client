import { useState, useEffect } from "react";

const Filters = ({ onFilterChange }) => {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const brands = ["Calvin Klein", "Everlane", "Adidas", "Levis", "Nike", "Buck Mason", "Allen Solly", "Lacoste"];
    const sizes = ["s", "m", "l", "xl", "xxl"];

    useEffect(() => {
        onFilterChange({ brand: selectedBrands.join(','), size: selectedSizes.join(','), minPrice, maxPrice });
    }, [selectedBrands, selectedSizes, minPrice, maxPrice]);

    const handleBrandChange = (brand) => {
        const newSelectedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];
        setSelectedBrands(newSelectedBrands);
    };

    const handleSizeChange = (size) => {
        const newSelectedSizes = selectedSizes.includes(size)
            ? selectedSizes.filter(s => s !== size)
            : [...selectedSizes, size];
        setSelectedSizes(newSelectedSizes);
    };

    return (
        <div className="md:flex lg:flex-col border-b border-gray-400 h-fit">
            <div className="collapse collapse-arrow border-t border-gray-400 rounded-none">
                <input type="checkbox" className="peer" />
                <div className="collapse-title flex items-center justify-between">Brand</div>
                <div className="collapse-content">
                    <ul>
                        {brands.map(brand => (
                            <li key={brand}>
                                <label className="flex gap-3">
                                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} />
                                    {brand}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="collapse collapse-arrow border-t border-gray-400 rounded-none">
                <input type="checkbox" className="peer" />
                <div className="collapse-title flex items-center justify-between">Price</div>
                <div className="collapse-content">
                    <div className="flex flex-col gap-3">
                        <span>Min Price:</span>
                        <label className="flex gap-3">
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="border p-1 w-32 focus:outline-gray-400"
                                placeholder="0"
                            />
                        </label>
                        <span>Max Price:</span>
                        <label className="flex gap-3">
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="border p-1 w-32 focus:outline-gray-400"
                                placeholder="Any"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="collapse collapse-arrow border-t border-gray-400 rounded-none">
                <input type="checkbox" className="peer" />
                <div className="collapse-title flex items-center justify-between">Size</div>
                <div className="collapse-content">
                    <ul>
                        {sizes.map(size => (
                            <li key={size}>
                                <label className="flex gap-3">
                                    <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)} />
                                    {size.toUpperCase()}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Filters;
