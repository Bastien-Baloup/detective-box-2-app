import { useState } from "react";
import Empty from "../assets/icons/Icon_Cercle-empty.svg";
import Full from "../assets/icons/Icon_Cercle-full.svg";
import ArrowLeft from "../assets/icons/Icon_Arrow-left.svg";
import ArrowRight from "../assets/icons/Icon_Arrow-right.svg";

const Slider = ({ data }) => {
	const [index, setIndex] = useState(0);
	const totalItems = data.length;
	const pagination = [];

	const renderPagination = () => {
		for (let i = 0; i < totalItems; i++) {
			pagination.push(
				<img
					src={i <= index ? Full : Empty}
					alt="pagination icon marker"
					className="slider__pagination__tracker__icon"
					key={i}
				/>
			);
		}
		return pagination;
	};

	const nextItem = () => {
		setIndex(index === totalItems - 1 ? 0 : index + 1);
	};

	const previousItem = () => {
		setIndex(index === 0 ? totalItems - 1 : index - 1);
	};

	const renderArrows = () => {
		if (totalItems > 1) {
			return (
				<div className="slider__arrow">
					<img className="slider__arrow-left" src={ArrowLeft} alt="arrow previous" onClick={previousItem} />
					<img className="slider__arrow-right" src={ArrowRight} alt="arrow next" onClick={nextItem} />
				</div>
			);
		}
	};

	return (
		<section className="slider">
			{data[index].title}
			{data[index].detail}
			<div className="slider__pagination">
				<div className="slider__pagination__tracker">{renderPagination()}</div>
				<span className="slider__pagination__summary">
					{index + 1}/{totalItems}
				</span>
			</div>
			{renderArrows()}
		</section>
	);
};

export default Slider;
