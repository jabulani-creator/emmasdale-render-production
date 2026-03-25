import React from 'react';
import TextBlock from './TextBlock';
import GalleryBlock from './GalleryBlock';
import LeaderProfileBlock from './LeaderProfileBlock';
import VideoGridBlock from './VideoGridBlock';
import BannerCTABlock from './BannerCTABlock';

const BLOCK_COMPONENTS: Record<string, React.FC<any>> = {
  text: TextBlock,
  gallery: GalleryBlock,
  leader: LeaderProfileBlock,
  videoGrid: VideoGridBlock,
  bannerCta: BannerCTABlock,
};

interface BlockRendererProps {
  blocks: {
    _id?: string;
    blockType: string;
    order: number;
    data: any;
  }[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        const Component = BLOCK_COMPONENTS[block.blockType];

        if (!Component) {
          console.warn(`[BlockRenderer] No component found for blockType: ${block.blockType}`);
          return null;
        }

        return <Component key={block._id || index} data={block.data} />;
      })}
    </div>
  );
}