"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var fs = require('fs');
var fetchThreads = function (subreddit) { return __awaiter(void 0, void 0, void 0, function () {
    var res, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get("https://www.reddit.com/r/".concat(subreddit, "/hot.json"), {
                    headers: {
                        'User-Agent': 'sparkietects/1.0',
                    },
                    params: { limit: 30 },
                })];
            case 1:
                res = _a.sent();
                post = [];
                res.data.data.children.forEach(function (element) {
                    var temp = {
                        subreddit: element.data.subreddit || "",
                        title: element.data.title,
                        created_utc: element.data.created_utc,
                        link_flair_text: element.data.link_flair_text,
                        num_comments: element.data.num_comments,
                        score: element.data.score || element.data.ups,
                        selftext: element.data.selftext,
                        selftext_html: element.data.selftext_html,
                        thumbnail: [element.data.thumbnail, element.data.url]
                    };
                    post.push(temp);
                });
                // console.log(post);
                return [2 /*return*/, post];
        }
    });
}); };
var subReddits = ["fashion", "streetwear", "malefashionadvice", "femalefashionadvice"];
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, data, filepath, jsonData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 4)) return [3 /*break*/, 4];
                return [4 /*yield*/, fetchThreads(subReddits[i])];
            case 2:
                data = _a.sent();
                filepath = "./reddit.json";
                jsonData = JSON.stringify(data, null, 2);
                try {
                    fs.appendFileSync(filepath, jsonData);
                }
                catch (e) {
                    console.log(e);
                }
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); })();
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
