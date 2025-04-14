import { Video } from "@shopify/hydrogen";

import { VideoObjectFragment } from "storefrontapi.generated";


const HomeVideos = ({ items }: { items: VideoObjectFragment[] }) => {
    return <div> Home
        {items.map(video => <Video key={video.id} data={video} autoPlay />)}
    </div>
}

export default HomeVideos