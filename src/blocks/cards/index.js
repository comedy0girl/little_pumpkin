import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

registerBlockType(metadata.name, {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'reveal-on-scroll opacity-0 transition-all duration-1000 ease-out flex flex-col basis-full md:basis-[calc(33.33%-1rem)] flex-grow-0 flex-shrink-0 bg-pumpkin p-6',
            style: { opacity: 1, visibility: 'visible' }
        });

        return (
            <div {...blockProps}>
                <RichText
                    tagName="h2"
                    className="font-display text-2xl font-bold text-ghost mb-4"
                    value={attributes.title}
                    onChange={(val) => setAttributes({ title: val })}
                    placeholder="Spooky Title..."
                />
                <div className="flex-1">
                    <InnerBlocks 
                        allowedBlocks={[ 'core/image', 'core/buttons', 'core/paragraph' ]} 
                    />
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: 'reveal-on-scroll opacity-0 transition-all duration-1000 ease-out flex flex-col basis-full md:basis-[calc(33.33%-1rem)] flex-grow-0 flex-shrink-0 bg-pumpkin p-6',
            style: { opacity: 1, visibility: 'visible' }
        });

        return (
            <div {...blockProps}>
                <RichText.Content
                    tagName="h2"
                    className="font-display text-2xl font-bold text-ghost mb-4"
                    value={attributes.title}
                />
                <div className="flex-1">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});