/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

import { RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props  ) {

	const {
		attributes: { title, mediaURL, ingredients, instructions },
	} = props;

	return (
		<div { ...useBlockProps.save() }>
			<RichText.Content tagName="h2" value={ title } />

			{ mediaURL && (
				<img
					className="recipe-image"
					src={ mediaURL }
					alt={ __( 'Recipe Image', 'gutenberg-examples' ) }
				/>
			) }

			<h3>{ __( 'Ingredients', 'gutenberg-examples' ) }</h3>
			<RichText.Content
				tagName="ul"
				className="ingredients"
				value={ ingredients }
			/>

			<h3>{ __( 'Instructions', 'gutenberg-examples' ) }</h3>
			<RichText.Content
				tagName="div"
				className="steps"
				value={ instructions }
			/>
		</div>
	);
}
