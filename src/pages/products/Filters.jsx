import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Filters = ({ collections, setFilteredData }) => {
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);

    const brands = ["Calvin Klein", "Everlane", "Adidas", "Levis", "Nike", "Buck Mason", "Allen Solly", "Lacoste"];
    const prices = ["$0 - $25", "$25 - $50", "$50 - $100", "$100 - $150"];
    const sizes = ["s", "m", "l", "xl", "xxl"];
    const ratings = ["1 - 2", "2 - 3", "3 - 4", "4 - 5"];

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handlePriceChange = (price) => {
        setSelectedPrices(prev =>
            prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
        );
    };

    const handleSizeChange = (size) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const handleRatingChange = (rating) => {
        setSelectedRatings(prev =>
            prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
        );
    };

    const filterCollections = () => {
        const filtered = collections.filter(item => {
            const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
            const matchPrice = selectedPrices.length === 0 || selectedPrices.some(priceRange => {
                const [min, max] = priceRange.replace(/\$/g, '').split(' - ').map(Number);
                return item.price >= min && item.price <= max;
            });
            const matchSize = selectedSizes.length === 0 || selectedSizes.some(size => item.size.includes(size));
            const matchRating = selectedRatings.length === 0 || selectedRatings.some(ratingRange => {
                const [min, max] = ratingRange.split(' - ').map(Number);
                return item.rating >= min && item.rating <= max;
            });
            return matchBrand && matchPrice && matchSize && matchRating;
        });
        setFilteredData(filtered);
    };

    useEffect(() => {
        filterCollections();
    }, [selectedBrands, selectedPrices, selectedSizes, selectedRatings, collections]);

    return (
        <div>
            <div className="collapse border-t border-gray-400 rounded-none">
                <input type="checkbox" className="peer" checked={isBrandOpen} onChange={() => setIsBrandOpen(!isBrandOpen)} />
                <div className="collapse-title flex items-center justify-between">
                    Brand {isBrandOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <div className="collapse-content ">
                    <ul className="pl-5">
                        {brands.map(brand => (
                            <li key={brand}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => handleBrandChange(brand)}
                                    />
                                    {brand}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="collapse border-t border-gray-400 rounded-none">
                <input type="checkbox" className="peer" checked={isPriceOpen} onChange={() => setIsPriceOpen(!isPriceOpen)} />
                <div className="collapse-title flex items-center justify-between">
                    Price {isPriceOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <div className="collapse-content ">
                    <ul className="flex flex-col list-disc pl-5">
                        {prices.map(price => (
                            <li key={price}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedPrices.includes(price)}
                                        onChange={() => handlePriceChange(price)}
                                    />
                                    {price}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="collapse border-t border-gray-400 rounded-none">
                <input type="checkbox" className="peer" checked={isSizeOpen} onChange={() => setIsSizeOpen(!isSizeOpen)} />
                <div className="collapse-title flex items-center justify-between">
                    Size {isSizeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <div className="collapse-content ">
                    <ul className="pl-5">
                        {sizes.map(size => (
                            <li key={size}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedSizes.includes(size)}
                                        onChange={() => handleSizeChange(size)}
                                    />
                                    {size.toUpperCase()}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="collapse border-y border-gray-400 rounded-none">
                <input type="checkbox" className="peer" checked={isRatingOpen} onChange={() => setIsRatingOpen(!isRatingOpen)} />
                <div className="collapse-title flex items-center justify-between">
                    Rating {isRatingOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <div className="collapse-content ">
                    <ul className="pl-5">
                        {ratings.map(rating => (
                            <li key={rating}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedRatings.includes(rating)}
                                        onChange={() => handleRatingChange(rating)}
                                    />
                                    {rating}
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
