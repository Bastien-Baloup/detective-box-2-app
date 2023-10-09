import { useState } from "react";
import Empty from "../assets/icons/Icon_Cercle-empty.svg";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import Full from "../assets/icons/Icon_Cercle-full.svg";
import ArrowLeft from "../assets/icons/Icon_Arrow-left.svg";
import ArrowRight from "../assets/icons/Icon_Arrow-right.svg";

const Slider = ({ data, handleModal }) => {
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
		setIndex(index === totalItems - 1 ? index : index + 1);
	};

	const previousItem = () => {
		setIndex(index === 0 ? index : index - 1);
	};

	const renderArrowLeft = () => {
		return (
			<div className="slider__arrow">
				{index === 0 ? (
					""
				) : (
					<img className="slider__arrow-left" src={ArrowLeft} alt="arrow previous" onClick={previousItem} />
				)}
			</div>
		);
	};

	const renderArrowRight = () => {
		return (
			<div className="slider__arrow">
				{index === totalItems - 1 ? (
					""
				) : (
					<img className="slider__arrow-right" src={ArrowRight} alt="arrow next" onClick={nextItem} />
				)}
			</div>
		);
	};

	return (
		<section className="slider">
			<div className="slider__header">
				<div className="slider__header__title">
					Objectif: <br></br>
					{data[index].title}
				</div>
				<img className="slider__header__icon" src={Cross} onClick={handleModal} />
			</div>

			<div className="slider__main">
				{renderArrowLeft()}
				<div className="slider__content">
					<div className="slider__content__text">{data[index].detail}</div>
					<div className="slider__content__img--container">
						{data[index].image != null ? (
							<img className="slider__content__img" src={data[index].image} />
						) : (
							"Pas d'image à afficher"
						)}
					</div>
					<div className="slider__pagination">
						<div className="slider__pagination__tracker">{renderPagination()}</div>
						<div className="slider__pagination__summary">
							{index + 1}/{totalItems}
						</div>
					</div>
				</div>
				{renderArrowRight()}
			</div>
		</section>
	);
};

export default Slider;
