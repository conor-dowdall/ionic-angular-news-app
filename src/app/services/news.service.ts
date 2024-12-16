import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';

export interface NewsRootObject {
  status: string;
  totalResults: number;
  results: Result[];
  nextPage: string;
}

export interface Result {
  article_id: string;
  title: string;
  link: string;
  keywords: string[] | null;
  creator: string[] | null;
  video_url: null;
  description: null | string;
  content: string;
  pubDate: string;
  pubDateTZ: string;
  image_url: null | string;
  source_id: string;
  source_priority: number;
  source_name: string;
  source_url: string;
  source_icon: string | null;
  language: string;
  country: string[];
  category: string[];
  ai_tag: string;
  sentiment: string;
  sentiment_stats: string;
  ai_region: string;
  ai_org: string;
  duplicate: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor() {}

  async getNews(searchTerm: string): Promise<Result[]> {
    try {
      console.log('Fetching news from remote API.');
      const response = await CapacitorHttp.request({
        method: 'GET',
        url: environment.newsBaseUrl,
        params: {
          apiKey: environment.newsApiKey,
          country: searchTerm,
        },
      });

      // Check for valid response data
      if (
        typeof response === 'object' &&
        response !== null &&
        !Array.isArray(response)
      ) {
        if (response.data.status !== 'success')
          throw new Error('API request unsuccessful.');

        return response.data.results;
      }
      throw new Error('API response is invalid or malformed.');
    } catch (error) {
      console.error('Error fetching news', error);

      if (error instanceof Error)
        throw new Error(`Failed to fetch news: ${error.message}`);

      throw new Error('Failed to fetch news: An unknown error occurred.');
    }
  }

  async getFakeNews(searchTerm: string): Promise<Result[]> {
    return [
      {
        article_id: '04b8eab2a72253adab320f14f66f8209',
        title:
          'Scrapping jury trials for some offences may be only way to clear court backlog, says CPS watchdog chief',
        link: 'https://news.sky.com/story/scrapping-jury-trials-for-some-offences-may-be-only-way-to-clear-court-backlog-says-cps-watchdog-chief-13274679',
        keywords: null,
        creator: null,
        video_url: null,
        description:
          '"Removing the right to trial by jury" and "intermediate courts" may be the only way to clear the crown court backlog in England and Wales, the chief inspector of the Crown Prosecution Service Inspectorate has said.',
        content: 'ONLY AVAILABLE IN PAID PLANS',
        pubDate: '2024-12-16 02:54:00',
        pubDateTZ: 'UTC',
        image_url:
          'https://e3.365dm.com/24/12/1920x1080/skynews-signs-showing-way-to_6777277.jpg',
        source_id: 'skynews',
        source_priority: 2173,
        source_name: 'Skynew',
        source_url: 'http://news.sky.com',
        source_icon: 'https://i.bytvi.com/domain_icons/skynews.png',
        language: 'english',
        country: ['united kingdom'],
        category: ['top'],
        ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
        ai_org: 'ONLY AVAILABLE IN CORPORATE PLANS',
        duplicate: true,
      },
      {
        article_id: 'a63bfea5354002b0bd0c12fa5f7ffa96',
        title:
          'HMD Global Introduces HMD Arc: A No-Frills Smartphone for Everyday Needs',
        link: 'https://www.gizmochina.com/2024/12/16/hmd-arc-budget-phone-with-essentials/',
        keywords: ['hmd', 'hmd arc', 'news'],
        creator: ['Sudhanshu'],
        video_url: null,
        description:
          'HMD Global has quietly rolled out the HMD Arc, a device designed for those seeking an affordable smartphone with essential features. While pricing and availability are yet to be disclosed, the phone’s specs indicate a no-nonsense entry-level option. HMD Arc specs The Nokia HMD Arc sticks to the essentials. It features a 6.52-inch HD+ LCD [...]The post HMD Global Introduces HMD Arc: A No-Frills Smartphone for Everyday Needs appeared first on Gizmochina.',
        content: 'ONLY AVAILABLE IN PAID PLANS',
        pubDate: '2024-12-16 02:53:27',
        pubDateTZ: 'UTC',
        image_url: null,
        source_id: 'gizmochina',
        source_priority: 22871,
        source_name: 'Gizmochina',
        source_url: 'https://www.gizmochina.com',
        source_icon: 'https://i.bytvi.com/domain_icons/gizmochina.png',
        language: 'english',
        country: [
          'india',
          'united states of america',
          'united kingdom',
          'australia',
          'singapore',
          'canada',
          'china',
        ],
        category: ['technology'],
        ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
        ai_org: 'ONLY AVAILABLE IN CORPORATE PLANS',
        duplicate: false,
      },
      {
        article_id: '59a0a62cf12a4de6b6d40e9202c2e9a3',
        title:
          '‘One Nation, One Election Bill’ not to be introduced in Lok Sabha today | What next',
        link: 'https://www.news9live.com/india/one-nation-one-election-bill-not-to-be-introduced-in-lok-sabha-today-what-next-2774483',
        keywords: ['india'],
        creator: ['Subhajit Sankar Dasgupta'],
        video_url: null,
        description:
          'The cabinet is unlikely to introduce ‘One Nation, One Election’ Bill in Lok Sabha on Monday, as it is not included in the revised list. The winter session of Parliament is scheduled to end on December 20.',
        content: 'ONLY AVAILABLE IN PAID PLANS',
        pubDate: '2024-12-16 02:53:00',
        pubDateTZ: 'UTC',
        image_url:
          'https://images.news9live.com/wp-content/uploads/2024/12/lok-sabha1.jpg',
        source_id: 'news9live',
        source_priority: 193096,
        source_name: 'News9live',
        source_url: 'https://www.news9live.com',
        source_icon: 'https://i.bytvi.com/domain_icons/news9live.png',
        language: 'english',
        country: ['united kingdom'],
        category: ['top'],
        ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
        ai_org: 'ONLY AVAILABLE IN CORPORATE PLANS',
        duplicate: false,
      },
      {
        article_id: '2b05fd590bc780f2357910d4334e86b7',
        title:
          'POCO M7 Pro 5G with Dimensity 7025 Ultra Spotted on Google Play Supported Devices Database',
        link: 'https://www.gizmochina.com/2024/12/16/poco-m7-pro-5g-google-play-supported-devices-listing/',
        keywords: ['poco', 'news', 'poco m7 pro 5g'],
        creator: ['Sudhanshu'],
        video_url: null,
        description:
          'POCO is gearing up to launch its latest budget smartphone, the POCO M7 Pro 5G, in India next week. Ahead of the official launch, the device has been spotted on the Google Play Supported Devices list, confirming its Indian variant. As per the Google Play Supported Devices listing, spotted by MySmartPrice, the POCO M7 Pro [...]The post POCO M7 Pro 5G with Dimensity 7025 Ultra Spotted on Google Play Supported Devices Database appeared first on Gizmochina.',
        content: 'ONLY AVAILABLE IN PAID PLANS',
        pubDate: '2024-12-16 02:52:17',
        pubDateTZ: 'UTC',
        image_url: null,
        source_id: 'gizmochina',
        source_priority: 22871,
        source_name: 'Gizmochina',
        source_url: 'https://www.gizmochina.com',
        source_icon: 'https://i.bytvi.com/domain_icons/gizmochina.png',
        language: 'english',
        country: [
          'india',
          'united states of america',
          'united kingdom',
          'australia',
          'singapore',
          'canada',
          'china',
        ],
        category: ['technology'],
        ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
        ai_org: 'ONLY AVAILABLE IN CORPORATE PLANS',
        duplicate: false,
      },
      {
        article_id: '648cc1f78d9e64f94b86ee7911c83e3a',
        title: 'Five charts that explain why water bills are about to go up',
        link: 'https://news.sky.com/story/five-charts-that-explain-why-water-bills-are-about-to-go-up-13274678',
        keywords: null,
        creator: null,
        video_url: null,
        description: 'This is a crucial week for the water industry.',
        content: 'ONLY AVAILABLE IN PAID PLANS',
        pubDate: '2024-12-16 02:52:00',
        pubDateTZ: 'UTC',
        image_url:
          'https://e3.365dm.com/24/10/1920x1080/skynews-water-tap_6723987.jpg',
        source_id: 'skynews',
        source_priority: 2173,
        source_name: 'Skynew',
        source_url: 'http://news.sky.com',
        source_icon: 'https://i.bytvi.com/domain_icons/skynews.png',
        language: 'english',
        country: ['united kingdom'],
        category: ['top'],
        ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
        ai_org: 'ONLY AVAILABLE IN CORPORATE PLANS',
        duplicate: true,
      },
      {
        article_id: 'a33e8b3ce242783444a817427f499c9c',
        title:
          '‘I understand how that business side goes’ – Dallas Cowboys star speaks on trade speculation amidst uncertain future',
        link: 'https://talksport.com/nfl/2383716/dallas-cowboys-star-speaks-on-trade-speculation/',
        keywords: ['dallas cowboys', 'nfl'],
        creator: ['Jack Savage'],
        video_url: null,
        description: null,
        content: 'ONLY AVAILABLE IN PAID PLANS',
        pubDate: '2024-12-16 02:51:50',
        pubDateTZ: 'UTC',
        image_url:
          'https://talksport.com/wp-content/uploads/sites/5/2024/12/11-dallas-cowboys-celebrates-sack-952970964.jpg?quality=40&strip=all&w=960',
        source_id: 'talksport',
        source_priority: 4624,
        source_name: 'Talksport',
        source_url: 'https://talksport.com',
        source_icon: 'https://i.bytvi.com/domain_icons/talksport.jpg',
        language: 'english',
        country: ['united kingdom'],
        category: ['sports'],
        ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
        ai_org: 'ONLY AVAILABLE IN CORPORATE PLANS',
        duplicate: false,
      },
      {
        article_id: '6eeabbddaa228db1caa38b91678b67b6',
        title: 'Is there going to be a Yellowstone season 6?',
        link: 'https://www.whattowatch.com/features/is-there-going-to-be-a-yellowstone-season-6',
        keywords: ['drama', 'tv shows'],
        creator: ['michael.balderston@futurenet.com (Michael Balderston)'],
        video_url: null,
        description:
          'What’s next for Yellowstone following the season 5 ending? We break down what we know about the future of Taylor Sheridan’s western franchise right here.',
        content: 'ONLY AVAILABLE IN PAID PLANS',
        pubDate: '2024-12-16 02:51:00',
        pubDateTZ: 'UTC',
        image_url:
          'https://cdn.mos.cms.futurecdn.net/ptEU2MKeuBaqCEhZYf8gqc.jpg',
        source_id: 'tvtimes',
        source_priority: 2563,
        source_name: 'Tv Times - News',
        source_url: 'https://www.whattowatch.com',
        source_icon: 'https://i.bytvi.com/domain_icons/tvtimes.png',
        language: 'english',
        country: ['united kingdom'],
        category: ['top'],
        ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
        ai_org: 'ONLY AVAILABLE IN CORPORATE PLANS',
        duplicate: false,
      },
      {
        article_id: 'cb59035346d058283ad1db12b5243a99',
        title:
          'Sophia Bush was at home sleeping when burglar broke into her LA home ... and made off with $36 book',
        link: 'https://www.dailymail.co.uk/tvshowbiz/article-14195819/sophia-bush-burglar-la-home-book.html?ito=1490&ns_campaign=1490&ns_mchannel=rss',
        keywords: null,
        creator: null,
        video_url: null,
        description:
          'The 42-year-old actress was sleeping in the home at the time the crime was committed last week, according to police sources.',
        content: 'ONLY AVAILABLE IN PAID PLANS',
        pubDate: '2024-12-16 02:50:59',
        pubDateTZ: 'UTC',
        image_url:
          'https://i.dailymail.co.uk/1s/2024/12/15/23/93177835-0-image-a-4_1734304633763.jpg',
        source_id: 'dailymailuk',
        source_priority: 135,
        source_name: 'Mail Online',
        source_url: 'https://www.dailymail.co.uk/home/index.html',
        source_icon: 'https://i.bytvi.com/domain_icons/dailymailuk.png',
        language: 'english',
        country: ['united kingdom'],
        category: ['entertainment'],
        ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
        ai_org: 'ONLY AVAILABLE IN CORPORATE PLANS',
        duplicate: false,
      },
      {
        article_id: '4e329b6991899109a946ce04c0d06850',
        title:
          'LONGi shares its sustainable practices in combating desertification at COP16 in Riyadh, Saudi Arabia',
        link: 'https://uk.investing.com/news/press-releases/longi-shares-its-sustainable-practices-in-combating-desertification-at-cop16-in-riyadh-saudi-arabia-93CH-3838222',
        keywords: null,
        creator: ['Investing.com'],
        video_url: null,
        description: null,
        content: 'ONLY AVAILABLE IN PAID PLANS',
        pubDate: '2024-12-16 02:50:04',
        pubDateTZ: 'UTC',
        image_url:
          'https://i-invdn-com.investing.com/news/World_News_8_M_1440052125.jpg',
        source_id: 'investing_uk',
        source_priority: 1205,
        source_name: 'Investing Uk',
        source_url: 'https://uk.investing.com',
        source_icon: null,
        language: 'english',
        country: ['united kingdom'],
        category: ['top'],
        ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
        ai_org: 'ONLY AVAILABLE IN CORPORATE PLANS',
        duplicate: true,
      },
      {
        article_id: '989fa915567cd015bc0760cc1cfa7703',
        title:
          'النفط يتراجع من أعلى مستوى له في أسابيع وسط ترقب لاجتماع مجلس الاحتياطي الاتحادي',
        link: 'https://www.alquds.co.uk/%D8%A7%D9%84%D9%86%D9%81%D8%B7-%D9%8A%D8%AA%D8%B1%D8%A7%D8%AC%D8%B9-%D9%85%D9%86-%D8%A3%D8%B9%D9%84%D9%89-%D9%85%D8%B3%D8%AA%D9%88%D9%89-%D9%84%D9%87-%D9%81%D9%8A-%D8%A3%D8%B3%D8%A7%D8%A8%D9%8A%D8%B9/',
        keywords: ['طاقة', 'أسعار النفط الخام'],
        creator: ['Raed'],
        video_url: null,
        description:
          'سنغافورة: تراجعت العقود الآجلة للنفط من أعلى مستوياتها في أسابيع مع ترقب المستثمرين لانعقاد اجتماع مجلس الاحتياطي الاتحادي (البنك المركزي الأمريكي) في وقت لاحق هذا الأسبوع للحصول على دلالات حول الاتجاه المستقبلي لأسعار الفائدة. لكن التراجع كان محدودا بسبب مخاوف من تعطل الإمدادات في حالة فرض الولايات المتحدة المزيد من العقوبات على الموردين الرئيسيين روسيا [...]',
        content: 'ONLY AVAILABLE IN PAID PLANS',
        pubDate: '2024-12-16 02:49:29',
        pubDateTZ: 'UTC',
        image_url:
          'https://www.alquds.co.uk/wp-content/uploads/2024/12/1ipj-22-730x438-1.jpg',
        source_id: 'alquds',
        source_priority: 69344,
        source_name: 'Alquds Alarabi Newspaper',
        source_url: 'https://www.alquds.co.uk',
        source_icon: 'https://i.bytvi.com/domain_icons/alquds.jpg',
        language: 'arabic',
        country: ['united kingdom'],
        category: ['top'],
        ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
        ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
        ai_org: 'ONLY AVAILABLE IN CORPORATE PLANS',
        duplicate: false,
      },
    ];
  }
}
