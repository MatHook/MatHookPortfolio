import axios from "axios";

const instagramRegExp = new RegExp(
  /<script type="text\/javascript">window\._sharedData = (.*);<\/script>/
);

export async function fetchInstagramPosts(accountURL) {
  const response = await axios.get(accountURL);
  const json = JSON.parse(response.data.match(instagramRegExp)[1]);
  const edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(
    0,
    11
  );
  edges.splice(7,2)
  return edges.map(({ node }) => ({
    url: `https://www.instagram.com/p/${node.shortcode}`,
    thubnailUrl: node.thubnail_src,
    displayUrl: node.display_url,
    caption: node.edge_media_to_caption.edges[0].node.text || "",
  }));
}
