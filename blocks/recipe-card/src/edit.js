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

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { TabPanel } from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

const onSelect = ( tabName ) => {
    console.log( 'Selecting tab', tabName );
};

const MyTabPanel = () => (
    <TabPanel
        className="my-tab-panel"
        activeClass="active-tab"
        onSelect={ onSelect }
        tabs={ [
            {
                name: 'tab1',
                title: 'Tab 1',
                className: 'tab-one',
            },
            {
                name: 'tab2',
                title: 'Tab 2',
                className: 'tab-two',
            },
        ] }
    >
        { ( tab ) => <p>{ tab.title }</p> }
    </TabPanel>
);

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props  ) {
	const {
		attributes: { title, mediaID, mediaURL, ingredients, instructions },
		setAttributes,
	} = props;

	const blockProps = useBlockProps();

	const onChangeTitle = ( value ) => {
		setAttributes( { title: value } );
	};

	const onSelectImage = ( media ) => {
		setAttributes( {
			mediaURL: media.url,
			mediaID: media.id,
		} );
	};
	const onChangeIngredients = ( value ) => {
		setAttributes( { ingredients: value } );
	};

	const onChangeInstructions = ( value ) => {
		setAttributes( { instructions: value } );
	};


	return (
		<div { ...blockProps }>
			<RichText
				tagName="h2"
				placeholder={ __(
					'Write Recipe title ABCD…',
					'maulik-block-plugin'
				) }
				value={ title }
				onChange={ onChangeTitle }
			/>
			<div className="recipe-image">
				<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes="image"
					value={ mediaID }
					render={ ( { open } ) => (
						<Button
							className={
								mediaID ? 'image-button' : 'button button-large'
							}
							onClick={ open }
						>
							{ ! mediaID ? (
								__( 'Upload Image', 'maulik-block-plugin' )
							) : (
								<img
									src={ mediaURL }
									alt={ __(
										'Upload Recipe Image',
										'maulik-block-plugin'
									) }
								/>
							) }
						</Button>
					) }
				/>
			</div>
			<h3>{ __( 'Ingredients', 'maulik-block-plugin' ) }</h3>
			<RichText
				tagName="ul"
				multiline="li"
				placeholder={ __(
					'Write a list of ingredients…',
					'maulik-block-plugin'
				) }
				value={ ingredients }
				onChange={ onChangeIngredients }
				className="ingredients"
			/>
			<h3>{ __( 'Instructions', 'maulik-block-plugin' ) }</h3>
			<RichText
				tagName="div"
				multiline="p"
				className="steps"
				placeholder={ __(
					'Write the instructions…',
					'maulik-block-plugin'
				) }
				value={ instructions }
				onChange={ onChangeInstructions }
			/>
			<InspectorControls key="setting">
				<MyTabPanel></MyTabPanel>
			</InspectorControls>			
		</div>
	);
}
