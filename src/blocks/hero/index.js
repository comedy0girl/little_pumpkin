import { registerBlockType } from '@wordpress/blocks';
import { 
    useBlockProps, 
    InnerBlocks 
} from '@wordpress/block-editor';
import metadata from './block.json';

registerBlockType(metadata.name, {
    edit: () => {
        const blockProps = useBlockProps({
            /* Removed bg-black to let --color-bleak be the sole background */
            className: 'hero-textured text-white py-20 w-screen relative left-1/2 -translate-x-1/2'
        });

        const HERO_TEMPLATE = [
            ['core/columns', { verticalAlignment: 'center', className: 'max-w-6xl mx-auto w-full px-6' }, [
                ['core/column', { width: '50%', className: 'space-y-6' }, [
                    ['core/heading', { 
                        level: 1, 
                        placeholder: 'Spooky Hero Title', 
                        className: 'text-5xl md:text-7xl font-black uppercase italic leading-none' 
                    }],
                    ['core/paragraph', { 
                        placeholder: 'Enter your haunting sub-headline here...', 
                        className: 'text-xl text-gray-300' 
                    }],
                    ['core/buttons', { className: 'pt-4' }, [
                        ['core/button', { 
                            placeholder: 'Button Text...', 
                            className: 'is-style-fill'
                        }]
                    ]],
                ]],
                ['core/column', { width: '50%' }, [
                    ['core/image', { 
                        className: 'rounded-2xl' 
                    }]
                ]],
            ]]
        ];

        return (
            <div {...blockProps}>
                <InnerBlocks 
                    template={HERO_TEMPLATE}
                    templateLock="all" 
                />
            </div>
        );
    },
    save: () => {
        const blockProps = useBlockProps.save({
            /* Consistent with edit: No bg-black here either */
            className: 'hero-textured text-white py-20 w-screen relative left-1/2 -translate-x-1/2'
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
});