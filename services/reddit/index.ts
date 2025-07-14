import axios from "axios";
const fs = require('fs');
type Post={
    subreddit:string,
    title:string,
    selftext:string,
    score:number,
    num_comments:number,
    thumbnail:string[],
    link_flair_text:string,
    selftext_html:string,
    created_utc:string
}
const fetchThreads=async(subreddit:string):Promise<Post[]>=>{
    const res = await axios.get(`https://www.reddit.com/r/${subreddit}/hot.json`, {
        headers: {
        'User-Agent': 'sparkietects/1.0',
        },
        params: { limit: 30 },
    });
    // console.log(res.data.data.children);
    const post:Post[]=[];
    res.data.data.children.forEach((element:any) => {
        const temp:Post={
            subreddit:element.data.subreddit || "",
            title:element.data.title,
            created_utc:element.data.created_utc,
            link_flair_text:element.data.link_flair_text,
            num_comments:element.data.num_comments,
            score:element.data.score || element.data.ups,
            selftext:element.data.selftext,
            selftext_html:element.data.selftext_html,
            thumbnail:[element.data.thumbnail , element.data.url] 
        }
        post.push(temp);
    });
    // console.log(post);
    return post;
}

const subReddits=["fashion","streetwear","malefashionadvice","femalefashionadvice"];

(async()=>{
    for(let i=0;i<4;i++){
        const data=await fetchThreads(subReddits[i]);
        const filepath="./reddit.json"
        const jsonData=JSON.stringify(data,null,2);
        try{
            fs.appendFileSync(filepath,jsonData);
        }catch(e){
            console.log(e);
        }
    }
})()
// {
//     kind: 't3',
//     data: {
//       approved_at_utc: null,
//       subreddit: 'fashion',
//       selftext: 'Going to eat at a casual restaurant with my spouse and a few friends. Just want to ensure my muffin top is not too accentuated ',
//       author_fullname: 't2_8v6qfxup',
//       saved: false,
//       mod_reason_title: null,
//       gilded: 0,
//       clicked: false,
//       is_gallery: true,
//       title: 'Is this okay? It’s hot where I live',
//       link_flair_richtext: [Array],
//       subreddit_name_prefixed: 'r/fashion',
//       hidden: false,
//       pwls: 6,
//       link_flair_css_class: '',
//       downs: 0,
//       thumbnail_height: 140,
//       top_awarded_type: null,
//       hide_score: false,
//       media_metadata: [Object],
//       name: 't3_1lvv1jt',
//       quarantine: false,
//       link_flair_text_color: 'light',
//       upvote_ratio: 0.69,
//       author_flair_background_color: null,
//       ups: 239,
//       domain: 'reddit.com',
//       media_embed: {},
//       thumbnail_width: 140,
//       author_flair_template_id: null,
//       is_original_content: false,
//       user_reports: [],
//       secure_media: null,
//       is_reddit_media_domain: false,
//       is_meta: false,
//       category: null,
//       secure_media_embed: {},
//       gallery_data: [Object],
//       link_flair_text: 'Feedback Wanted! ',
//       can_mod_post: false,
//       score: 239,
//       approved_by: null,
//       is_created_from_ads_ui: false,
//       author_premium: false,
//       thumbnail: 'https://a.thumbs.redditmedia.com/uwSGSu66Eib8fRwpjEOK-n8IixT1sLBDGr9Vv371HJ8.jpg',
//       edited: false,
//       author_flair_css_class: null,
//       author_flair_richtext: [],
//       gildings: {},
//       content_categories: null,
//       is_self: false,
//       subreddit_type: 'public',
//       created: 1752096845,
//       link_flair_type: 'richtext',
//       wls: 6,
//       removed_by_category: null,
//       banned_by: null,
//       author_flair_type: 'text',
//       total_awards_received: 0,
//       allow_live_comments: false,
//       selftext_html: '&lt;!-- SC_OFF --&gt;&lt;div class="md"&gt;&lt;p&gt;Going to eat at a casual restaurant with my spouse and a few friends. Just want to ensure my muffin top is not too accentuated &lt;/p&gt;\n' +
//         '&lt;/div&gt;&lt;!-- SC_ON --&gt;',
//       likes: null,
//       suggested_sort: null,
//       banned_at_utc: null,
//       url_overridden_by_dest: 'https://www.reddit.com/gallery/1lvv1jt',
//       view_count: null,
//       archived: false,
//       no_follow: false,
//       is_crosspostable: false,
//       pinned: false,
//       over_18: false,
//       all_awardings: [],
//       awarders: [],
//       media_only: false,
//       link_flair_template_id: 'b1a3df32-b873-11ed-9847-fa55a7714299',
//       can_gild: false,
//       spoiler: false,
//       locked: false,
//       author_flair_text: null,
//       treatment_tags: [],
//       visited: false,
//       removed_by: null,
//       mod_note: null,
//       distinguished: null,
//       subreddit_id: 't5_2qhoq',
//       author_is_blocked: false,
//       mod_reason_by: null,
//       num_reports: null,
//       removal_reason: null,
//       link_flair_background_color: '#007373',
//       id: '1lvv1jt',
//       is_robot_indexable: true,
//       report_reasons: null,
//       author: 'theprettyseawitch',
//       discussion_type: null,
//       num_comments: 203,
//       send_replies: true,
//       contest_mode: false,
//       mod_reports: [],
//       author_patreon_flair: false,
//       author_flair_text_color: null,
//       permalink: '/r/fashion/comments/1lvv1jt/is_this_okay_its_hot_where_i_live/',
//       stickied: false,
//       url: 'https://www.reddit.com/gallery/1lvv1jt',
//       subreddit_subscribers: 747253,
//       created_utc: 1752096845,
//       num_crossposts: 0,
//       media: null,
//       is_video: false
//     }
//   },