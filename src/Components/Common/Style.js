import { getColorsCSS, getTypoCSS } from '../../../../Components/utils/getCSS';

const Style = ({ attributes, id }) => {
	const { colors, paver } = attributes;
	const { titleTypo, desTypo, titleColor, desColor } = paver;

	console.log(paver);

	const mainSl = `#${id}`;
	const blockSl = `${mainSl} .bBlocksTestPurpose`;
	const panoramaSl = `${blockSl} .hero-section-container .panorama`;
	const titleSl = `${panoramaSl} .hero-overlay .hero-content .title`;
	const descriptionSl = `${panoramaSl} .hero-overlay .hero-content .description`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		
		${blockSl} p{
			${getColorsCSS(colors)}
		}
		${panoramaSl}{
			height: ${paver.height.desktop};
		}
		${getTypoCSS(`${titleSl}`, titleTypo)?.styles}
		${getTypoCSS(`${descriptionSl}`, desTypo)?.styles}

		${titleSl}{
			color: ${titleColor}
		}
		${descriptionSl}{
			color: ${desColor}
		}
	`}} />;
}
export default Style;