import { permanentRedirect } from 'next/navigation';

const page = () => {
    // `/blog` 本身不承載列表內容，實際列表頁固定落在 `/blog/all/1`。
    // 使用永久導向可讓搜尋引擎與瀏覽器都把第一頁視為正式網址，避免重複內容。
    permanentRedirect('/blog/all/1');
};

export default page;
