import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element'; // Hook to handle the random number
import metadata from './block.json';

registerBlockType(metadata.name, {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({ className: 'dossier-folder' });

        // Generate a File Number once when the block is first added
        useEffect(() => {
            if (!attributes.fileNumber) {
                setAttributes({ fileNumber: Math.floor(Math.random() * 1000000) });
            }
        }, []);

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Dossier Settings">
                        <TextControl 
                            label="Stamp Text" 
                            value={attributes.stampText} 
                            onChange={(val) => setAttributes({ stampText: val })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="dossier-stamp">{attributes.stampText}</div>
                    <div className="dossier-header">
                        <strong>FILE NO:</strong> {attributes.fileNumber || 'GENERATING...'}<br/>
                        <strong>SUBJECT:</strong> 
                        <RichText
                            tagName="span"
                            value={attributes.subject}
                            onChange={(val) => setAttributes({ subject: val })}
                        />
                    </div>
                    <div className="dossier-content">
                        <RichText
                            tagName="p"
                            className="redacted-text"
                            value={attributes.content}
                            onChange={(val) => setAttributes({ content: val })}
                            placeholder="Type restricted data here..."
                        />
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        return (
            <div {...useBlockProps.save({ className: 'dossier-folder' })}>
                <div className="dossier-stamp">{attributes.stampText}</div>
                <div className="dossier-header">
                    <strong>FILE NO:</strong> {attributes.fileNumber}<br/>
                    <strong>SUBJECT:</strong> {attributes.subject}
                </div>
                <div className="dossier-content">
                    <RichText.Content 
                        tagName="p" 
                        className="redacted-text" 
                        value={attributes.content} 
                    />
                </div>
            </div>
        );
    }
});